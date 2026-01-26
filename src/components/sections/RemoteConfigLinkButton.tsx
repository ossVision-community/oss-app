"use client";

import { type MouseEvent, type ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import { fetchRemoteConfig } from "@/lib/remoteConfigClient";

type Props = {
  flagKey: string;
  href: string;
  className: string;
  children: ReactNode;
  disabledMessage?: string;
};

export default function RemoteConfigLinkButton({
  flagKey,
  href,
  className,
  children,
  disabledMessage = "قريباً... نجهّزها لك",
}: Props) {
  const [enabled, setEnabled] = useState(false);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetchRemoteConfig([flagKey])
      .then((configs) => {
        if (cancelled) return;
        setEnabled(Boolean(configs[flagKey]));
      })
      .catch(() => {
        if (cancelled) return;
        setEnabled(false);
      });
    return () => {
      cancelled = true;
    };
  }, [flagKey]);

  const onDisabledClick = (e: MouseEvent) => {
    e.preventDefault();
    setPressed(true);
    window.setTimeout(() => setPressed(false), 1800);
  };

  if (enabled) {
    return <Link className={className} href={href}>{children}</Link>;
  }

  return (
    <div className="relative inline-block">
      <a
        className={`${className} cursor-pointer ${pressed ? "animate-[wiggle_350ms_ease-in-out_0ms_2]" : ""}`}
        href="#"
        onClick={onDisabledClick}
        aria-disabled="true"
      >
        {children}
      </a>

      {pressed && (
        <div
          className="absolute left-1/2 -translate-x-1/2 -top-12 whitespace-nowrap rounded-2xl bg-white/95 border border-slate-200 px-3 py-2 text-sm text-slate-800 shadow-xl"
          role="status"
        >
          {disabledMessage}
          <span className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-3 h-3 bg-white/95 border-b border-r border-slate-200 rotate-45" />
        </div>
      )}

      <style jsx>{`
        @keyframes wiggle {
          0%,
          100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-3px);
          }
          50% {
            transform: translateX(3px);
          }
          75% {
            transform: translateX(-2px);
          }
        }
      `}</style>
    </div>
  );
}
