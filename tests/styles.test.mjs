import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import ts from "typescript";

function sourceFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(directory, entry.name);
    return entry.isDirectory() ? sourceFiles(file) : [file];
  });
}

/** TypeScript aceita qualquer chave de CSS Module; esta verificação encontra erros que tsc não detecta. */
test("component CSS imports and static class references exist after migration", () => {
  const files = [...sourceFiles("features"), ...sourceFiles("components")];
  const failures = [];

  for (const file of files.filter((name) => name.endsWith(".tsx"))) {
    const tree = ts.createSourceFile(file, readFileSync(file, "utf8"), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
    const imports = new Map();

    for (const statement of tree.statements) {
      if (!ts.isImportDeclaration(statement) || !statement.moduleSpecifier.text.endsWith(".module.css")) continue;
      const cssFile = path.resolve(path.dirname(file), statement.moduleSpecifier.text);
      const source = readFileSync(cssFile, "utf8")
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/"[^"\n]*"|'[^'\n]*'/g, "");
      const classes = new Set([...source.matchAll(/\.([a-zA-Z_][\w-]*)/g)].map((match) => match[1]));
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
