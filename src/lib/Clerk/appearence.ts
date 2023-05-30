import { PropsOf } from '@/types';
import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
/* -------------------------------------------------------------------------- */
type ClerkProviderProps = PropsOf<typeof ClerkProvider>;
export const clerkAppearance: ClerkProviderProps['appearance'] = {
  baseTheme: dark,
  elements: {
    formButtonPrimary: `
      bg-[--color-primary-main]
      text-white
      hover:bg-[--color-primary-light]
    `,
    formFieldInput: `
      outline-none
      border-none
      accent-[--color-primary-main]
      focus:outline-none
      focus:box-shadow-none
      focus-visible:outline-none
      focus-visible:box-shadow-none
      shadow-none
      border-[transparent]
    `,
    formFieldInputGroup: `relative`,
    socialButtonsBlockButton: `bg-[--color-paper-light] hover:bg-[--color-paper-focus]`,
    formFieldInputShowPasswordButton: {
      boxShadow: 'none !important',
      '&:hover': {
        color: 'var(--color-primary-light)',
      },
      '&:focus': {
        color: 'var(--color-primary-light)',
      },
    },
  },
  signIn: {
    elements: {
      rootBox: 'w-full h-full rounded-0 overflow-hidden',
      card: `
        overflow-hidden 
        w-full 
        h-full 
        max-w-[unset] 
        !m-0 
        rounded-none 
        justify-center 
        p-0 
        gap-8 
        hMd:gap-[2.8rem] 
        hLg:gap-[3.5rem]
        bg-[--color-background-main]
        md:bg-[--color-paper-main]
        shadow-none
      `,
      footerActionLink: `
        text-[--color-primary-light]
        hover:text-white
      `,
      formFieldInput: `
        md:bg-[--color-paper-light]
        rounded-md
      `,
      formFieldLabel: `
        mb-2
      `,
      socialButtonsBlockButtonText: `
        leading-6
      `,
    },
  },
  signUp: {
    elements: {
      rootBox: 'w-full h-fit rounded-0 overflow-hidden',
      card: `
        overflow-hidden 
        w-full 
        h-fit 
        max-w-[unset] 
        !m-0 
        rounded-none 
        justify-center 
        p-0 
        gap-8 
        hMd:gap-[2.8rem] 
        hLg:gap-[3.5rem]
        bg-[--color-background-main]
        md:bg-[--color-paper-main]
        shadow-none
      `,
      footerActionLink: `
        text-[--color-primary-light]
        hover:text-white
      `,
      formFieldInput: `
        md:bg-[--color-paper-light]
        rounded-md
      `,
      formFieldLabel: `
        mb-2
      `,
      socialButtonsBlockButtonText: `
        leading-6
      `,
    },
  },
  userButton: {
    elements: {
      userButtonTrigger: {
        '&:focus': {
          boxShadow: 'none !important',
        },
      },
    },
  },
  userProfile: {
    elements: {
      button: 'text-primary-light hover:text-primary-main',
      formButtonReset: 'text-warning-main hover:text-warning-focus hocus:bg-[hsl(215_28%_19%)]',
      pageScrollBox: 'scrollbars',
      profileSectionPrimaryButton: {
        color: 'var(--color-secondary-light)',
        '&:hover': {
          color: 'var(--color-secondary-light)',
          backgroundColor: 'hsl(215, 28%, 20%)',
        },
      },
      badge: {
        color: 'white',
        backgroundColor: 'var(--color-primary-main)',
      },
    },
  },
  variables: {
    colorBackground: 'hsl(215, 28%, 17%)',
  },
};
