import { useEffect } from "react";
// import { useStore } from "../lib/store";
import { useLenis } from "@studio-freight/react-lenis";

export function useScroll(callback, deps = []) {
  const lenis = useLenis(({ lenis }) => lenis);

  useEffect(() => {
    if (!lenis) return;
    lenis.on("scroll", callback);
    lenis.emit();

    return () => {
      lenis.off("scroll", callback);
    };
  }, [lenis, callback, [...deps]]);
}
