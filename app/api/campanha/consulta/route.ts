import { NextResponse } from "next/server";
import { digits, parseResponse, validCPF } from "@/lib/consult";
export const dynamic = "force-dynamic";
const headers={"Cache-Control":"no-store, private"};
function fail(status:number,code:string){return NextResponse.json({ok:false,code},{status,headers});}
export async function POST(request:Request){
  let body:unknown; try { body=await request.json(); } catch {return fail(400,"invalid_request");}
  const cpf=body&&typeof body==="object"&&(body as Record<string,unknown>).cpf;
  if(typeof cpf!=="string"||!validCPF(cpf)) return fail(400,"invalid_cpf");
  const endpoint=process.env.CAMPANHA_API_URL;
  if(!endpoint) return fail(503,"not_configured");
  try {
    const url=new URL(endpoint); url.searchParams.set("cpf",digits(cpf));
    const response=await fetch(url,{method:"GET",cache:"no-store",signal:AbortSignal.timeout(8000),headers:{Accept:"application/json"}});
    if(!response.ok) return fail(502,"upstream_error");
    let raw:unknown; try {raw=await response.json();} catch{return fail(502,"invalid_response");}
    if(raw&&typeof raw==="object"&&(raw as Record<string,unknown>).ok===false) return fail(422,"not_confirmed");
    const parsed=parseResponse(raw); if(!parsed)return fail(502,"invalid_response");
    return NextResponse.json({...parsed,consultedAt:new Date().toISOString(),inconsistent:parsed.total!==parsed.numeros.length},{headers});
  } catch(error) {return fail(error instanceof Error&&error.name==="TimeoutError"?504:502,error instanceof Error&&error.name==="TimeoutError"?"timeout":"connection_error");}
}
