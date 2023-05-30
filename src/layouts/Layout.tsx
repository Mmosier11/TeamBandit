// -------------------------------------------------------------------------- //
//-                             LAYOUT COMPONENT                             -//
// -------------------------------------------------------------------------- //
import { Footer, Header } from '@/layouts';
import { WithChildren } from '@/types/typeUtils';
import { c } from '@/utils/componentUtils';

/* -------------------------------------------------------------------------- */
// ---------------------------------- Types --------------------------------- //
type LayoutProps = WithChildren<{
  header?: boolean;
  footer?: boolean;
  fit?: boolean;
  MainProps?: Omit<
    React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>,
    'children' | 'ref'
  >;
}>;
/* -------------------------------------------------------------------------- */
export function Layout(props: LayoutProps) {
  const { children, header = true, footer = true, fit=false, MainProps } = props;

  return (
    <div className={c('flex h-full max-w-full flex-1 flex-col', {
      'contents': !fit,
    })}>
      {header && <Header />}
      <main {...MainProps}>{children}</main>
      {footer && <Footer />}
    </div>
  );
}
