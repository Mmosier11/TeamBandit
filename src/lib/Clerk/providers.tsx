import type { PropsOf } from '@/types';
import { ClerkProvider as CP } from '@clerk/nextjs';
import { clerkAppearance } from './appearence';

export const ClerkProvider = ({ children, ...props }: PropsOf<typeof CP>) => (
  <CP appearance={clerkAppearance} {...props}>
    {children}
  </CP>
);
