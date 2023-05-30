// -------------------------------------------------------------------------- //
//-                             HEADER COMPONENT                             -//
// -------------------------------------------------------------------------- //
import { UserButton } from '@/lib/Clerk/components';
import { ActiveLink } from '@/ui/ActiveLink';
import { NavDrawerButton } from '@/ui/Drawers/NavDrawer';
import { EmailForm } from '@/ui/Form/EmailForm';
import { Logo } from '@/ui/Logo';
import { ModalButton } from '@/ui/Modal/ModalButton';
import Link from 'next/link';
/* -------------------------------------------------------------------------- */

export function Header() {
  return (
    <>
      <header className='Header t0 sticky z-10 h-[64px] bg-gray-900 md:h-[72px]'>
        <nav
          className='mx-auto flex h-full max-w-[110rem] items-center justify-between p-4 lg:px-8'
          aria-label='Global'
        >
          <div className='flex lg:flex-1'>
            <Link href='/chat' className='-m-1.5 flex items-center justify-center gap-2 p-1.5'>
              <span className='sr-only'>Law School Ai</span>
              <Logo size={32} />
              <div className='badge rounded-md bg-[rgb(251,182,206,0.16)] px-1 py-[8px] text-[12px] font-bold text-[#fbb6ce]'>
                BETA
              </div>
            </Link>
            <div className='hidden lg:flex lg:items-center lg:gap-x-4 lg:px-4'>
              <ActiveLink
                href={'/chat'}
                defaultClass='text-sm font-semibold leading-6'
                inActive='text-white'
                active='text-pink-400'
              >
                {'Chat Bot'}
              </ActiveLink>
              <ModalButton
                id='q&a'
                className='btn-sm btn !border-none !bg-transparent p-[4px] hover:text-white'
              >
                {'Q&A'}
              </ModalButton>
            </div>
          </div>
          <div className='hidden lg:flex lg:flex-1 lg:justify-end'>
            <UserButton />
          </div>
          <div className='flex flex-1 justify-end lg:hidden'>
            <NavDrawerButton />
          </div>
        </nav>
      </header>
      <EmailForm />
    </>
  );
}
