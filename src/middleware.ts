// -------------------------------------------------------------------------- //
//-                                MIDDLEWARE                                -//
// -------------------------------------------------------------------------- //
import { authMiddleware } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
/* -------------------------------------------------------------------------- */

export default authMiddleware({
  afterAuth(auth, req, evt) {
    // Handle users who aren't authenticated
    if (!auth.userId && !auth.isPublicRoute) {
      const signInUrl = new URL('/auth/sign-in', req.url);
      signInUrl.searchParams.set('redirect_url', req.url);
      return NextResponse.redirect(signInUrl);
    }
    // Todo: handle paid vs free users
  },
  publicRoutes: ['/', '/support(.*)'],
});

// -------------------------------------------------------------------------- //

// Stop Middleware running on static files and public folder
export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
