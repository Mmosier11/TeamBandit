// -------------------------------------------------------------------------- //
//-                               AUTH (LAYOUT)                              -//
// -------------------------------------------------------------------------- //
import { WithChildren } from '@/types/typeUtils';
import { Logo } from '@/ui/Logo';
import { c } from '@/utils/componentUtils';
/* -------------------------------------------------------------------------- */

export const metadata = {
  title: 'Auth',
};

const styles = {
  wrapper: c(`AuthPage relative flex h-full w-full flex-col flex-wrap lg:flex-row`),
  formWrapper: c(
    `Form__Wrapper inset-0 flex flex-1 items-center justify-center md:p-5 lg:p-10 sm-:absolute`
  ),
  formContainer: c(
    `Form__Container relative flex h-full w-full items-center justify-center overflow-hidden rounded-none bg-[--color-background-main] px-[2rem] pb-[3rem] pt-[2.375rem] md:max-h-[850px] md:max-w-[620px] md:rounded-2xl md:bg-[--color-paper-main] md:shadow-xl lg:h-fit lg:rounded-2xl md+:px-[4rem] md+:pb-[3rem] md+:pt-[2.375rem]`
  ),
  feedWrapper: c(
    `Feed__Wrapper relative hidden flex-1 overflow-hidden items-center justify-center p-8 lg+:flex`
  ),
  feedContainer: c(
    `Feed__Container relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-xl before:absolute before:inset-0 before:bg-paper-main before:opacity-25 before:z-[-5]`
  ),
};

export default function AuthLayout({ children }: WithChildren) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.formWrapper}>
        <div className={styles.formContainer}>{children}</div>
      </div>
    </div>
  );
}
