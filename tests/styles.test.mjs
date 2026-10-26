import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import ts from "typescript";

/** Extrai nomes locais ignorando comentários e strings de seletores e caminhos. */
function cssClasses(source) {
  const selectors = source
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/"[^"\n]*"|'[^'\n]*'/g, "");
  return new Set([...selectors.matchAll(/\.([a-zA-Z_][\w-]*)/g)].map((match) => match[1]));
}

function sourceFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(directory, entry.name);
    return entry.isDirectory() ? sourceFiles(file) : [file];
  });
}

/** O Turbopack pode preservar o BOM dentro do CSS concatenado e invalidar o primeiro seletor. */
test("CSS sources have no leading BOM before selectors", () => {
  const failures = sourceFiles("src")
    .filter((file) => file.endsWith(".css"))
    .filter((file) => readFileSync(file, "utf8").startsWith("\uFEFF"));
  assert.deepEqual(failures, [], `Salve estes arquivos como UTF-8 sem BOM:\n${failures.join("\n")}`);
});

/** TypeScript aceita qualquer chave de CSS Module; esta verificação encontra erros que tsc não detecta. */
test("component CSS imports and static class references exist after migration", () => {
  const files = sourceFiles("src");
  const failures = [];

  for (const file of files.filter((name) => name.endsWith(".tsx"))) {
    const tree = ts.createSourceFile(file, readFileSync(file, "utf8"), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
    const imports = new Map();

    for (const statement of tree.statements) {
      if (!ts.isImportDeclaration(statement) || !statement.moduleSpecifier.text.endsWith(".module.css")) continue;
      const cssFile = path.resolve(path.dirname(file), statement.moduleSpecifier.text);
      const classes = cssClasses(readFileSync(cssFile, "utf8"));
      if (statement.importClause?.name) imports.set(statement.importClause.name.text, classes);
    }

    function visit(node) {
      if (ts.isPropertyAccessExpression(node) && ts.isIdentifier(node.expression)) {
        const classes = imports.get(node.expression.text);
        if (classes && !classes.has(node.name.text)) failures.push(`${file}: ${node.expression.text}.${node.name.text}`);
      }
      ts.forEachChild(node, visit);
    }
    visit(tree);
  }

  assert.deepEqual(failures, [], `Classes CSS inexistentes:\n${failures.join("\n")}`);
});

/** A migração de pastas e classes deve conservar as bases visuais compostas. */
test("CSS compositions reference existing files and local classes", () => {
  const failures = [];
  for (const file of sourceFiles("src").filter((name) => name.endsWith(".module.css"))) {
    const source = readFileSync(file, "utf8").replace(/\/\*[\s\S]*?\*\//g, "");
    for (const composition of source.matchAll(/composes:\s*([^;]+);/g)) {
      const [, names, importedFile] = composition[1].match(/^(.*?)(?:\s+from\s+"([^"]+)")?$/);
      const cssFile = importedFile ? path.resolve(path.dirname(file), importedFile) : file;
      const classes = cssClasses(readFileSync(cssFile, "utf8"));
      for (const name of names.trim().split(/\s+/)) {
        if (!classes.has(name)) failures.push(`${file}: ${name} from ${cssFile}`);
      }
    }
  }
  assert.deepEqual(failures, [], `Composições CSS inexistentes:\n${failures.join("\n")}`);
});
