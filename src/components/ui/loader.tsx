"use client";

import { useEffect, useState } from "react";

interface LoaderProps {
  isLoading?: boolean;
  duration?: number;
}

export default function Loader({
  isLoading = true,
  duration = 2000,
}: LoaderProps) {
  const [showLoader, setShowLoader] = useState(isLoading);

  useEffect(() => {
    if (isLoading) {
      setShowLoader(true);
      const timer = setTimeout(() => {
        setShowLoader(false);
      }, duration);
      return () => clearTimeout(timer);
    } else {
      setShowLoader(false);
    }
  }, [isLoading, duration]);

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
