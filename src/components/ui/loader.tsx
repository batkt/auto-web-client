"use client";

import { useEffect, useState } from "react";

interface LoaderProps {
  duration?: number;
}

export default function Loader({ duration = 2000 }: LoaderProps) {
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    // Check if this is the initial page load (not a language switch)
    const isInitialLoad = !sessionStorage.getItem("hasLoaded");

    if (isInitialLoad) {
      setShowLoader(true);
      sessionStorage.setItem("hasLoaded", "true");

      const timer = setTimeout(() => {
        setShowLoader(false);
      }, duration);

      return () => clearTimeout(timer);
    } else {
      // For subsequent loads (like language switching), don't show loader
      setShowLoader(false);
    }
  }, [duration]);

  // Reset the session storage when the component unmounts (page refresh)
  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.removeItem("hasLoaded");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  if (!showLoader) return null;

  return (
    <div className="loader" id="loader-fade">
      <div className="loader-container">
        {Array.from({ length: 16 }, (_, index) => (
          <div key={index} className="loader-block" />
        ))}
      </div>
    </div>
  );
}
