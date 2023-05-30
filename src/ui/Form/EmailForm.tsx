// -------------------------------------------------------------------------- //
//-                           EMAIL FORM COMPONENT                           -//
// -------------------------------------------------------------------------- //
'use client';
/* -------------------------------------------------------------------------- */
import { sendEmail } from '@/app/api/email/sendEmail';
import { FormInput, FormTextArea } from '@/ui/Form';
import { useCallback, useRef, useState } from 'react';
import { Modal } from '../Modal/Modal';
import { toast } from 'react-toastify';
/* -------------------------------------------------------------------------- */
export function EmailForm() {
  const form = useRef<HTMLFormElement | null>(null);
  const [isOpen, setIsOpen] = useState(true);
  /* ---------------------------------- */
  const handleSend = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      setIsOpen(false);
      if (!form.current) return;

      await sendEmail(form.current)
        .then((res) => {
          toast.success('Message Sent!');
        })
        .catch((err) => {
          toast.error('Sorry there was an error sending your message.');
          console.error(err);
        });
    },
    [setIsOpen]
  );
  /* ---------------------------------- */
  return (
    <Modal
      id='q&a'
      header={'Questions'}
      isOpen={isOpen}
      body={
        <form className='contents' ref={form}>
          <FormInput
            name='user_name'
            displayName='Name'
            label={'Your Name'}
            placeholder='John Smith'
          />
          <FormInput
            name='user_email'
            displayName='Email'
            label={'Your Email'}
            placeholder='info@site.com'
          />
          <FormTextArea name='message' label={'Your Message'} placeholder='Hi, Cool Website! 😃' />
        </form>
      }
      actions={
        <>
          <button className='btn-primary btn px-4 py-3' onClick={handleSend}>
            Send
          </button>
          <button className='btn' data-close={true}>
            Cancel
          </button>
        </>
      }
    />
  );
}
