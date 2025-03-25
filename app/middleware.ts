import { NextResponse } from "next/server";

export function middleware(req: { cookies: { get: (arg0: string) => any }; url: string | URL | undefined }) {
  console.log("🔍 Middleware rulează!");

  const token = req.cookies.get("accessToken");

  if (!token) {
    console.log("❌ Niciun token, redirecționare la homepage cu modal login...");
    return NextResponse.redirect(new URL("/?auth=true", req.url)); // Trimite userul pe home cu auth=true
  }

  console.log("✅ Utilizator autentificat, acces permis.");
  return NextResponse.next();
}

export const config = {
  matcher: ["/pages/muscles", "/pages/about", "/pages/pricing"], // Pagini protejate
};