import { useEffect, useRef } from "react";

/**
 * Mousedown listener, which runs provided onClick callback
 * when html element clicked & doesn't contain the ref of the element.
 *
 * Pass return value ref to the html element is meant to listen
 * to "mousedown event"
 *
 * Beware to wrap on Click in useCallback, if necessary.
 */
export default function useClickOutside(onClick: () => void) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(e: globalThis.MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClick();
      }
      // console.log(e);
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, onClick]);

  return ref;
}
