import test from "node:test";
import assert from "node:assert/strict";
import { validCPF, maskCPF, parseResponse } from "../lib/consult.ts";

const fixture={ok:true,cpf:"529.***.***-25",nome:"PESSOA T.",total:1,numeros:["0084"],por_origem:{ativacao:{acoes:1,numeros:1}},campanha:{inicio:"2026-10-01",fim:"2026-12-31"}};
test("validates CPF check digits and rejects repeated digits",()=>{assert.equal(validCPF("529.982.247-25"),true);assert.equal(validCPF("529.982.247-26"),false);assert.equal(validCPF("11111111111"),false)});
test("masks CPF input",()=>assert.equal(maskCPF("52998224725"),"529.982.247-25"));
test("preserves leading zeroes and source aggregates",()=>{const parsed=parseResponse(fixture);assert.equal(parsed?.numeros[0],"0084");assert.deepEqual(parsed?.por_origem.ativacao,{acoes:1,numeros:1})});
test("accepts zero numbers and rejects an unmasked CPF",()=>{assert.equal(parseResponse({...fixture,total:0,numeros:[]})?.total,0);assert.equal(parseResponse({...fixture,cpf:"52998224725"}),null)});
test("rejects malformed period and number list",()=>{assert.equal(parseResponse({...fixture,campanha:{inicio:"01/10/2026",fim:"31/12/2026"}}),null);assert.equal(parseResponse({...fixture,numeros:[84]}),null)});
