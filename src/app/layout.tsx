// -------------------------------------------------------------------------- //
//-                               ROOT (LAYOUT)                              -//
// -------------------------------------------------------------------------- //
import '@/styles/global.scss';

import { ClerkProvider } from '@/lib/Clerk/providers';
import { getBaseURL } from '@/lib/getBaseUrl';

import { Aside } from '@/layouts/Aside';
import { ClientProviders } from '@/layouts/ClientProviders';

import type { WithChildren } from '@/types/typeUtils';
import type { Metadata } from 'next';
/* -------------------------------------------------------------------------- */

export async function generateMetadata(): Promise<Metadata> {
  const base = getBaseURL();
  const metabase = new URL(base);
  return {
    title: {
      default: 'FrameFinder',
      template: '%s | FrameFinder',
    },
    description:
      'FrameFinder is a tool for finding the perfect framework for your next project.',
    metadataBase: metabase,
    manifest: '/favicon/site.webmanifest',
    icons: {
      apple: {
        url: '/favicon/apple-touch-icon.png',
        rel: 'apple-touch-icon',
        sizes: '180x180',
      },
      icon: [
        {
          url: '/favicon/favicon-32x32.png',
          rel: 'icon',
          sizes: '32x32',
          type: 'image/png',
        },
        {
          url: '/favicon/favicon-16x16.png',
          rel: 'icon',
          sizes: '16x16',
          type: 'image/png',
        },
      ],
      shortcut: {
        url: '/favicon/favicon.ico',
        rel: 'shortcut icon',
      },
      other: {
        url: '/favicon/safari-pinned-tab.svg',
        rel: 'mask-icon',
      },
    },
    viewport: 'width=device-width, initial-scale=1',
  };
}

export default function RootLayout({ children }: WithChildren) {
  return (
    <ClerkProvider>
      <ClientProviders>
        <html lang='en' className='[color-scheme:dark]'>
          <body>
            {children}
            <Aside />
          </body>
        </html>
      </ClientProviders>
    </ClerkProvider>
  );
}
