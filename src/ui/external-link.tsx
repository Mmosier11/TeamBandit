// -------------------------------------------------------------------------- //
//-                          EXTERNAL LINK COMPONENT                         -//
// -------------------------------------------------------------------------- //
import clsx from 'clsx';
/* -------------------------------------------------------------------------- */
type ExtLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  newTab?: boolean;
};

export const ExtLink = ({ children, newTab = true, className, ...rest }: ExtLinkProps) => {
  return (
    <a
      {...{
        ...rest,
        ...(newTab && { target: '_blank', rel: 'noopener noreferrer' }),
      }}
      className={clsx('cursor-pointer', className)}
    >
      <div>{children}</div>
    </a>
  );
};
