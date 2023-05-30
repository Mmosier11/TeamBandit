import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export function useSaveStateOnExit(saveFunction: () => void) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Handler to save state before page unload
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      saveFunction();
    };

    // Handler to save state before route change within the app

    window.addEventListener('beforeunload', handleBeforeUnload);

    // Clean up event listeners when the component is unmounted or dependencies change
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [saveFunction]);

  useEffect(saveFunction, [pathname, searchParams]);
}
