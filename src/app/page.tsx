// -------------------------------------------------------------------------- //
//-                                ROOT (PAGE)                               -//
// -------------------------------------------------------------------------- //

import Link from "next/link";

/* -------------------------------------------------------------------------- */

export default function HomePage() {
  return (
    <main className='flex min-h-screen w-full flex-col items-center justify-between p-24'>
      <header className='flex w-full items-center min-h-14'>
        <div className="flex items-center"></div>
        <div className="flex-1 flex justify-center items-center"></div>
        <div className="flex items-center gap-8">
          <Link 
            className="flex justify-center items-center p-3"
            href={'/auth/sign-in'}
          >
            Login
          </Link>
          <Link 
            className="flex justify-center items-center px-3 py-2 hover:scale-[1.1] bg-primary-main text-background-main rounded-md transition-transform"
            href={'/auth/sign-up'}
          >
            Sign Up
          </Link>
        </div>
      </header>
      <div className='Hero'>
        <h1 className='text-7xl font-bold text-gray-100'>
          Frame
          <span className='text-primary-main [font-size:inherit] [font-weight:inherit]'>
            Finder
          </span>
        </h1>
      </div>
      <footer className="flex w-full items-center min-h-12"></footer>
    </main>
  );
}
