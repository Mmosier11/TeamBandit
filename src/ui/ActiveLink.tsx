// -------------------------------------------------------------------------- //
//-                           ACTIVE LINK COMPONENT                          -//
// -------------------------------------------------------------------------- //
'use client';

import { WithChildren } from '@/types/typeUtils';
import { clsx } from 'clsx';
import Link, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';

/* -------------------------------------------------------------------------- */
// ---------------------------------- Types --------------------------------- //
type ActiveLinkProps = LinkProps & {
  defaultClass?: string;
  active: string;
  inActive: string;
};
/* -------------------------------------------------------------------------- */

export function ActiveLink({
  children,
  active,
  defaultClass,
  inActive,
  ...props
}: WithChildren<ActiveLinkProps>) {
  const pathname = usePathname();

  const isActive = pathname === props.href;

  const dDefaultClass = isClassName(defaultClass) ? defaultClass : '';

  return (
    <Link
      {...{
        ...props,
        className: clsx({
          [dDefaultClass]: true, // default class
          [inActive]: !isActive,
          [active]: isActive,
        }),
      }}
    >
      {children}
    </Link>
  );
}


function isClassName(className?: string | undefined): className is NonNullable<string> {
  return Boolean(className);
}

function ImportanizeTWClasses(className: string) {
  return className
    .split(' ')
    .map((c) => {
      if (c.startsWith('!')) {
        return c;
      }
      return `!${c}`;
    })
    .join(' ');
}
