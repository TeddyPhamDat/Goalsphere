"use client";

import { useEffect } from "react";

type AdSlotProps = {
  className?: string;
  size?: "728x90" | "300x600" | "300x250" | "160x600";
  slot?: string; // AdSense slot ID
};

export default function AdSlot({ className = "", size = "728x90", slot }: AdSlotProps) {
  const [w, h] = size.split("x");
  
  useEffect(() => {
    // Load AdSense script
    try {
      if (typeof window !== "undefined") {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      }
    } catch (error) {
      console.error("AdSense error:", error);
    }
  }, []);

  // If ADSENSE_CLIENT is not set, show placeholder
  const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  
  if (!adsenseClient) {
    return (
      <div
        className={`flex items-center justify-center bg-zinc-100 text-zinc-600 border border-dashed border-zinc-300 rounded ${className}`}
        style={{ width: `${w}px`, height: `${h}px` }}
        aria-label={`Ad slot ${size}`}
      >
        <span className="text-sm">Ad {size}</span>
      </div>
    );
  }

  return (
    <div className={className} style={{ minWidth: `${w}px`, minHeight: `${h}px` }}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={adsenseClient}
        data-ad-slot={slot || ""}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
