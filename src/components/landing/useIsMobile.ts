"use client";

import { useState, useEffect } from "react";

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(true); // Default true to avoid flashing 3D on SSR

  useEffect(() => {
    const checkMobile = () => {
      const isSmallScreen = window.matchMedia("(max-width: 768px)").matches;
      const isLowPower =
        typeof navigator !== "undefined" &&
        "hardwareConcurrency" in navigator &&
        navigator.hardwareConcurrency <= 4;
      setIsMobile(isSmallScreen || isLowPower);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile;
}
