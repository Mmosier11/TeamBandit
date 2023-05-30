// -------------------------------------------------------------------------- //
//-                            PROVIDERS (LAYOUT)                            -//
// -------------------------------------------------------------------------- //
'use client';
/* -------------------------------------------------------------------------- */
import { WithChildren } from '@/types/typeUtils';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
/* -------------------------------------------------------------------------- */

type ProvidersProps = WithChildren;
const queryClient = new QueryClient();

export function ClientProviders({ children }: ProvidersProps) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
