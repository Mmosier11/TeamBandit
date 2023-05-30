// -------------------------------------------------------------------------- //
//-                                    ENV                                   -//
// -------------------------------------------------------------------------- //
// - This is a type-safe environment variable loader using `zod` and `@t3-oss/env-nextjs`.
// - All env variables will be loaded into here and can be used in the app, but must be imported from here.
/* -------------------------------------------------------------------------- */
import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';
/* -------------------------------------------------------------------------- */

export const env = createEnv({
  server: {
    OPEN_AI_API_KEY: z.string().min(1),
    OPEN_AI_API_ORG: z.string().optional(),
    CLERK_SECRET_KEY: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1),
    NEXT_PUBLIC_CLERK_SIGN_IN_URL: z.string().min(1),
    NEXT_PUBLIC_CLERK_SIGN_UP_URL: z.string().min(1),
    NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL: z.string().min(1),
    NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL: z.string().min(1),
  },
  runtimeEnv: {
    // ------------------------------- Open Ai ------------------------------ //
    OPEN_AI_API_KEY: process.env.OPEN_AI_API_KEY,
    OPEN_AI_API_ORG: process.env.OPEN_AI_API_ORG,
    // -------------------------------- Clerk ------------------------------- //
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    NEXT_PUBLIC_CLERK_SIGN_IN_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL,
    NEXT_PUBLIC_CLERK_SIGN_UP_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL,
    NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL: process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL,
    NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL: process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL,
  },
});