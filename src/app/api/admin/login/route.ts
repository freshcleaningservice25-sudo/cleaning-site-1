import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();
    
    // Trim whitespace from password
    const trimmedPassword = typeof password === 'string' ? password.trim() : '';
    
    // Debug logging (remove in production)
    console.log("Login attempt - Received password:", trimmedPassword);
    console.log("Expected password:", ADMIN_PASSWORD);
    console.log("Environment ADMIN_PASSWORD:", process.env.ADMIN_PASSWORD);
    console.log("Passwords match:", trimmedPassword === ADMIN_PASSWORD);
    
    if (trimmedPassword === ADMIN_PASSWORD) {
      const cookieStore = await cookies();
      cookieStore.set("admin-auth", "true", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24, // 24 hours
      });
      
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
