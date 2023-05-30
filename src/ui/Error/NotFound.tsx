// -------------------------------------------------------------------------- //
//-                            NOT FOUND COMPONENT                           -//
// -------------------------------------------------------------------------- //
import { ExtLink } from '../external-link';
import { ModalButton } from '../Modal/ModalButton';

/* -------------------------------------------------------------------------- */

export function NotFoundCanvas() {
  return (
    <div className='grid min-h-full place-items-center bg-[--color-background-light] px-6 py-24 sm:py-32 lg:px-8'>
      <div className='text-center'>
        <p className='text-base font-semibold text-pink-500'>404</p>
        <h1 className='mt-4 text-3xl font-bold tracking-tight text-slate-200 sm:text-5xl'>
          Page not found
        </h1>
        <p className='mt-6 text-base leading-7 text-slate-300'>
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className='mt-10 flex items-center justify-center gap-x-6'>
          <ExtLink
            href='/'
            newTab={false}
            className='rounded-md bg-pink-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-pink-400  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
          >
            Go back home
          </ExtLink>
          <ModalButton id='q&a' className='text-sm font-semibold text-slate-200'>
            {'Support'}
          </ModalButton>
        </div>
      </div>
    </div>
  );
}
