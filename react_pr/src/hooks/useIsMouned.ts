import { useEffect, useState } from "react";

export function useIsMouned() {
  const [ isMounted, setIsMounted ] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return [ isMounted ];
}
