// -------------------------------------------------------------------------- //
//-                            AUTH SIGNUP (PAGE)                            -//
// -------------------------------------------------------------------------- //
import { SignUp } from '@clerk/nextjs/app-beta';

/* -------------------------------------------------------------------------- */

export default function SignUpPage() {
  console.log('Hello from SignUpPage')
  return <SignUp signInUrl='/auth/sign-in' />;
}
