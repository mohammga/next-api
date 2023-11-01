import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  // Create URL objects for the login page and the protected page
  const loginPage = req.nextUrl.clone();
  loginPage.pathname = "/"; // Login page path
  const protectedPage = req.nextUrl.clone();
  protectedPage.pathname = "/poll"; // Protected page path

  // Attempt to obtain a user session token
  const session = await getToken({
    req,
    secret: process.env.JWT_SECRET,
  });

  // Check if the user is authenticated
  if (session) {
    // If the user is authenticated and tries to access the login page, redirect them to the protected page
    if (req.nextUrl.pathname === "/" || req.nextUrl.pathname === "/signup") {
      return NextResponse.redirect(protectedPage);
    }


  } else {
    // If the user is not authenticated and tries to access the protected page, redirect them to the login page
    if (req.nextUrl.pathname === "/poll") {
      return NextResponse.redirect(loginPage);
    }
  }
}
