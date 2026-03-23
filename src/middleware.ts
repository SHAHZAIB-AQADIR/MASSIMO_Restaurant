import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// In routes ko "Public" rakhein taake koi bhi dekh sake
const isPublicRoute = createRouteMatcher([
  '/', 
  '/sign-in(.*)', 
  '/sign-up(.*)', 
  '/menu(.*)', 
  '/contact(.*)',
  '/product(.*)'
]);

export default clerkMiddleware(async (auth, request) => {
  // Agar route public NAHI hai, toh protection lagao
  if (!isPublicRoute(request)) {
    await auth.protect(); // Latest version mein await zaroori hai
  }
});

export const config = {
  matcher: [
    // Next.js ki internal files aur static files ko skip karein
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // API aur TRPC routes ke liye hamesha run karein
    '/(api|trpc)(.*)',
  ],
}; 