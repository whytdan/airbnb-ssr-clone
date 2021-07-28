import { RefObject, useEffect } from 'react';

export default function useOutsideClick(
  ref: RefObject<HTMLDivElement>,
  callback: VoidFunction
) {
  useEffect(() => {
    /**
     * Hook that calls callback, if user clicks outside of the passed ref
     */
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
}
