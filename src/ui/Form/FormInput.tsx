// -------------------------------------------------------------------------- //
//-                           FORM INPUT COMPONENT                           -//
// -------------------------------------------------------------------------- //
import { clsxm } from '@/utils/componentUtils';

/* -------------------------------------------------------------------------- */
// ---------------------------------- Types --------------------------------- //
type FormInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  displayName?: string;
  className?: string;
};
/* -------------------------------------------------------------------------- */
export function FormInput({ label, name, className, displayName = name, ...props }: FormInputProps) {
  return (
    <div className='form-control'>
      <label className='label'>
        <span className='label-text'>{label}</span>
      </label>
      <label className='input-group'>
        <span>{displayName}</span>
        <input
          {...{
            type: 'text',
            name: name.toLowerCase(),
            ...props,
          }}
          className={clsxm('w-full bg-[#262e3e] enter:no-ring-tw hocus:bg-[hsl(220,24%,17%)] py-2 pl-2', className)}
        />
      </label>
    </div>
  );
}
