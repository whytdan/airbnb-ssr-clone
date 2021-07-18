import { useEffect } from 'react';

export default function useOutsideClick(ref, callback) {
  useEffect(() => {
    /**
     * Hook that calls callback, if user clicks outside of the passed ref
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
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
