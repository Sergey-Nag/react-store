import { RefObject, useEffect } from "react";

export const useClickOutside = (ref: RefObject<HTMLElement> ,callback: () => void) => {
  useEffect(() => {
    
    const handleOutsideClick = ({ target }: MouseEvent) => {
      if (ref && target && ref.current?.contains(target as HTMLElement)) return;
      
      if (typeof callback === 'function') callback();
    }

    document.addEventListener('click', handleOutsideClick, true);

    return () => document.removeEventListener('click', handleOutsideClick);
  }, [ref, callback]);
};