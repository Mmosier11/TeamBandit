// -------------------------------------------------------------------------- //
//-                               SERVER UTILS                               -//
// -------------------------------------------------------------------------- //

import { RequestHeaders } from '@/types/typeUtils';

export function createHeaders(obj: RequestHeaders) {
  return new Headers(obj);
}
