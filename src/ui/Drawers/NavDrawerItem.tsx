'use client';
import { WithChildren } from '@/types/typeUtils';
import { useRef } from 'react';

export function NavItem({ children }: WithChildren) {
  const parentRef = useRef<HTMLDivElement>(null);
  
  const hanleClick = () => {
    const { current: parent } = parentRef;
    if (!parent) return;
    const child = parent.children[0] as any;
    if (!child) return;
    child?.click();
  };
  
  return (
    <div
      ref={parentRef}
      onClick={hanleClick}
      className='flex h-[50px] w-full items-center !p-0 justify-start'
    >
      {children}
    </div>
  );
}
