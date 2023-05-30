// -------------------------------------------------------------------------- //
//-                          AWARE LINK (COMPONENT)                          -//
// -------------------------------------------------------------------------- //
'use client';
import { WithChildren } from '@/types';
import { c } from '@/utils/componentUtils';
import Link, { LinkProps } from 'next/link';
import { useSearchParams } from 'next/navigation';
/* -------------------------------------------------------------------------- */

type AwareLinkProps = WithChildren<
  Omit<LinkProps, 'href'> & {
    className?: string;
    href: string;
  }
>;

export function AwareLink({ className, children, href, ...linkProps }: AwareLinkProps) {
  const sP = useSearchParams();

  const searchParams = Object.fromEntries(sP.entries());

  return (
    <Link
      className={c('flex flex-center text-gray-100 hocus:text-primary-main', className)}
      href={{
        pathname: href,
        query: searchParams,
      }}
      {...linkProps}
    >
      {children}
    </Link>
  );
}
