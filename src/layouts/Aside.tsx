// -------------------------------------------------------------------------- //
//-                              ASIDE COMPONENT                             -//
// -------------------------------------------------------------------------- //
'use client';
/* -------------------------------------------------------------------------- */
import { DevOnly } from '@/ui/DevOnly';
import { AwareLink } from '@/ui/Links/AwareLink';
import { ModalContainer } from '@/ui/Modal/ModalContainer';
import { TestTube2 } from 'lucide-react';
import { ToastContainer } from 'react-toastify';
/* -------------------------------------------------------------------------- */

export function Aside() {
  return (
    <>
      <ModalContainer />
      <ToastContainer
        position='top-center'
        hideProgressBar={true}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover={false}
        theme='dark'
        className={'MainToaster'}
        bodyClassName={'MainToaster__Body'}
        toastClassName={'MainToaster__Toast'}
        progressClassName={'MainToaster__Progress'}
        containerId={'MainToaster'}
        autoClose={3000}
      />
      <DevOnly>
        <AwareLink
          href={'/test/openai'}
          className='flex-center fixed bottom-4 left-4 z-50 flex cursor-pointer rounded-full bg-secondary-main p-3 text-white hover:bg-white'
        >
          <TestTube2 size={16} className='stroke-current' />
        </AwareLink>
      </DevOnly>
    </>
  );
}
