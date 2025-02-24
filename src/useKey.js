import { useEffect } from "react";

export function useKey(key, type, action) {
  useEffect(() => {
    const callback = (e) => {
      if (e.code.toLowerCase() === key.toLowerCase()) action();
    };

    document.addEventListener(type, callback);

    return () => {
      document.removeEventListener(type, callback);
    };
  }, [action, key, type]);
}
