import { RefObject, useEffect } from "react";

type Handler = (event: MouseEvent) => void;

const useOnClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: Handler,
  mouseEvent: "mousedown" | "mouseup" = "mousedown"
): void => {
  useEffect(() => {
    function callback(event: MouseEvent) {
      const el = ref?.current;

      //! Do nothing if clicking ref's element or descendent elements
      if (!el || el.contains(event.target as Node)) {
        return;
      }

      handler(event);
    }

    document.addEventListener(mouseEvent, callback, { capture: true });

    //* clean up
    return () => {
      document.removeEventListener(mouseEvent, callback, { capture: true });
    };
  });
};

export default useOnClickOutside;
