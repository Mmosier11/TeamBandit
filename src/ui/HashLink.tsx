// -------------------------------------------------------------------------- //
//-                            HASHLINK COMPONENT                            -//
// -------------------------------------------------------------------------- //
'use client';

import { useRouter } from 'next/router';

export default function HashLink({ children, hash }: { children: React.ReactNode; hash: string }) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    router.push(hash);
  };

  return (
    <a href={hash} onClick={handleClick}>
      {children}
    </a>
  );
}
