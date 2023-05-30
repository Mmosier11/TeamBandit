// -------------------------------------------------------------------------- //
//-                              MODAL COMPONENT                             -//
// -------------------------------------------------------------------------- //
'use client';

import { clsxm } from '@/utils/componentUtils';
import { Children, cloneElement, isValidElement, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
/* -------------------------------------------------------------------------- */
// ---------------------------------- Types --------------------------------- //
type ModalProps = {
  id?: string;
  header?: React.ReactNode;
  body: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
  isOpen?: boolean;
};
/* -------------------------------------------------------------------------- */

export function Modal({ id, body, className, actions, header, isOpen }: ModalProps) {
  const modalID = id ? `Modal-${id}` : 'Modal';
  const [modalContainer, setModalContainer] = useState<HTMLDivElement | null>(null);
  const closeRef = useRef<HTMLLabelElement>(null);

  useEffect(() => {
    const mc = document.getElementById('Modal-Container');
    if (mc) {
      setModalContainer(mc as HTMLDivElement);
    }
  }, []);
  
  useEffect(
    () => {
      if (!isOpen) {
        closeModal();
      }
    },
    [isOpen]
  );

  const getActions = (actions: React.ReactNode) => {
    if (!actions || !isValidElement(actions)) {
      return null;
    }
    
    const children = Children.toArray(actions.props.children);
    
    
    return Children.toArray(children).map((c) => {
      if (isValidElement<JSX.IntrinsicElements['button']>(c)) {
        if ('data-close' in c.props) {
          return cloneElement(c, { onClick: closeModal });
        }
      }
      return c;
    });
  };

  const closeModal = () => {
    closeRef.current?.click();
  };

  return (
    <>
      {modalContainer &&
        createPortal(
          <>
            <input type='checkbox' id={modalID} className='modal-toggle' />
            <label htmlFor={modalID} className='modal cursor-pointer'>
              <label className='modal-box relative' htmlFor=''>
                {header && <div className='text-lg font-bold'>{header}</div>}
                <div className={clsxm('pt-4', className)}>{body}</div>
                {actions && (
                  <div className='modal-action'>
                    <label htmlFor={modalID} ref={closeRef} hidden></label>
                    {getActions(actions)}
                  </div>
                )}
              </label>
            </label>
          </>,
          modalContainer
        )}
    </>
  );
}
