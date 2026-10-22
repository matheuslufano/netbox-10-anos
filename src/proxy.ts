import { NextResponse } from "next/server";

export function proxy() {
  return new NextResponse("Acesso administrativo indisponível sem autenticação oficial.", {
    status: 403,
    headers: { "Cache-Control": "no-store", "Content-Type": "text/plain; charset=utf-8" },
  });
}

export const config = { matcher: "/admin/10-anos/:path*" };
