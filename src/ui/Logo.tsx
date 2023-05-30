// -------------------------------------------------------------------------- //
//-                                   LOGO                                   -//
// -------------------------------------------------------------------------- //
import LogoImg from '#/public/Logo.png';
import { c } from '@/utils/componentUtils';
import Image from 'next/image';
import Link from 'next/link';
/* -------------------------------------------------------------------------- */

type LogoProps = {
  size?: number;
  linkHome?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export function Logo({ size = 32, linkHome, ...props }: LogoProps) {
  const { className } = props;
  /* ---------------------------------- */
  return (
    <>
      {linkHome ? (
        <Link href='/'>
          <div className={c('flex items-center justify-center overflow-hidden', className)}>
            <Image
              src={LogoImg}
              alt='Law School AI'
              width={size}
              height={size}
              blurDataURL={LogoImg.src}
              style={{
                width: `${size}px`,
                height: `${size}px`,
                maxHeight: `${size}px`,
                maxWidth: `${size}px`,
              }}
            />
          </div>
        </Link>
      ) : (
        <Image
          src={LogoImg}
          alt='Law School AI'
          width={size}
          height={size}
          blurDataURL={LogoImg.src}
          style={{
            width: `${size}px`,
            height: `${size}px`,
            maxHeight: `${size}px`,
            maxWidth: `${size}px`,
          }}
        />
      )}
    </>
  );
}
