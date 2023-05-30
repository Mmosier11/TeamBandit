import { WithChildren } from '@/types/typeUtils';
import { ActiveLink } from '@/ui/ActiveLink';
import { Menu } from 'lucide-react';
import { ModalButton } from '../Modal/ModalButton';
import { NavItem } from './NavDrawerItem';
import { UserButton } from '@clerk/nextjs/app-beta';

export function NavDrawer({ children }: WithChildren) {
  return (
    <div className='drawer drawer-end !h-full'>
      <input id='mobile-drawer' type='checkbox' className='drawer-toggle' />
      <div className='drawer-content'>{children}</div>
      <div className='drawer-side'>
        <label htmlFor='mobile-drawer' className='drawer-overlay'></label>
        <ul className='menu w-80 bg-base-100 p-4 text-base-content'>
          <li>
            <NavItem>
              <ActiveLink
                href={'/chat'}
                defaultClass='text-sm font-semibold leading-6 pl-4'
                inActive='text-white'
                active='text-pink-400'
              >
                {'Chat Bot'}
              </ActiveLink>
            </NavItem>
          </li>
          <li>
            <NavItem>
              <ModalButton
                id='q&a'
                className='btn-sm btn !border-none !pl-4 !bg-transparent !p-0 hover:text-white'
              >
                {'Q&A'}
              </ModalButton>
            </NavItem>
          </li>
          <hr className='h-[1px] w-full bg-slate-400/30 my-6 border-none'/>
          <li>
            <NavItem>
              <UserButton showName appearance={{elements: {
                rootBox: `wh-full`,
                userButtonBox: `wh-full flex justify-start items-center relative`,
                userButtonTrigger: `wh-full flex pl-4 justify-start items-center`,
                userButtonOuterIdentifier: `absolute whitespace-nowrap top-[50%] left-0 translate-x-[60px] translate-y-[-50%]`,
              }}}/>
            </NavItem>
          </li>
        </ul>
      </div>
    </div>
  );
}

export function NavDrawerButton() {
  return (
    <label
      htmlFor='mobile-drawer'
      className='m-0 flex h-fit w-fit cursor-pointer items-center justify-center rounded-full p-2 transition-colors hover:text-pink-300 active:text-pink-500'
    >
      <Menu size={20} />
    </label>
  );
}
