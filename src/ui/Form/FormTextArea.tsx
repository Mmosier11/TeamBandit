// -------------------------------------------------------------------------- //
//-                          FORM TEXTAREA COMPONENT                         -//
// -------------------------------------------------------------------------- //
import { clsxm } from '@/utils/componentUtils';

/* -------------------------------------------------------------------------- */
// ---------------------------------- Types --------------------------------- //
type FormTextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  name: string;
  className?: string;
};
/* -------------------------------------------------------------------------- */
export function FormTextArea({ label, name, className, ...props }: FormTextAreaProps) {
  return (
    <div className='form-control'>
      <label className='label'>
        <span className='label-text'>{label}</span>
      </label>
      <textarea
        className={clsxm(
          `textarea-bordered textarea h-24 bg-[#262e3e] enter:no-ring-tw  hocus:bg-[hsl(220,24%,17%)]`,
          className
        )}
        name={name.toLowerCase()}
        {...props}
      ></textarea>
    </div>
  );
}
