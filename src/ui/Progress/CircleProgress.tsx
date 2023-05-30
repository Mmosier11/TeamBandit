// -------------------------------------------------------------------------- //
//-                        CIRCULARPROGRESS COMPONENT                        -//
// -------------------------------------------------------------------------- //
import { clsxm } from '@/utils/componentUtils';
/* -------------------------------------------------------------------------- */

export function CircularProgress({className}: {className?: string}) {
  return (
    <div className={clsxm('w-10', className ?? '')}>
      <svg className={'animate-[cp-rotate_2s_linear_infinite]'} viewBox='25 25 50 50'>
        <circle className={'animate-[cp-dash_1.5s_ease-in-out_infinite,cp-color_6s_ease-in-out_infinite]'} cx='50' cy='50' r='20' fill='none' stroke='#ec4899' strokeWidth='4' />
      </svg>
    </div>
  );
}
