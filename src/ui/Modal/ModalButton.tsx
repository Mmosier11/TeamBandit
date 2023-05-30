// -------------------------------------------------------------------------- //
//-                          MODAL BUTTON COMPONENT                          -//
// -------------------------------------------------------------------------- //
import { WithChildren } from '@/types/typeUtils';

/* -------------------------------------------------------------------------- */
// ---------------------------------- Types --------------------------------- //
type ModalButtonProps = WithChildren<{
  id?: string;
  className?: string;
}>;
/* -------------------------------------------------------------------------- */
export function ModalButton({ id, className, children }: ModalButtonProps) {
  const modalID = id ? `Modal-${id}` : 'Modal';
  return (
    <>
      <label htmlFor={modalID} className={className}>
        {children}
      </label>
    </>
  );
}
