// Ref: https://next-auth.js.org/configuration/nextjs#advanced-usage
import { withAuth } from "next-auth/middleware";

export default withAuth(
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

// Applies next-auth only to matching routes - can be regex
// Ref: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = { matcher: ["/poll/:path*"] };
