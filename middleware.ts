import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware({
//   publicRoutes: ["/", "/api/generate-emoji", "/api/like-emoji"],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};