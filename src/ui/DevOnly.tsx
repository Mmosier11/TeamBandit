// -------------------------------------------------------------------------- //
//-                         DEVONLY COMPONENT WRAPPER                        -//
// -------------------------------------------------------------------------- //
import { WithChildren } from '@/types';
/* -------------------------------------------------------------------------- */
export function DevOnly({ children }: WithChildren) {
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return <>{children}</>;
}
