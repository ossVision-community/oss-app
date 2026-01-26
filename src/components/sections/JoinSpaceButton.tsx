"use client";

import { type MouseEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { fetchRemoteConfig } from "@/lib/remoteConfigClient";

export default function JoinSpaceButton() {
  const joinSpaceUrl = process.env.NEXT_PUBLIC_JOIN_SPACE_URL;
  const href = useMemo(() => joinSpaceUrl ?? "#", [joinSpaceUrl]);

  const [enabled, setEnabled] = useState(false);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetchRemoteConfig(["join_space"])
      .then((configs) => {
        if (cancelled) return;
        setEnabled(Boolean(configs.join_space));
      })
      .catch(() => {
        if (cancelled) return;
        setEnabled(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const onDisabledClick = (e: MouseEvent) => {
    e.preventDefault();
    setPressed(true);
    window.setTimeout(() => setPressed(false), 1800);
  };

  const baseClass =
    "inline-flex items-center justify-center bg-white text-primary font-bold py-2.5 px-8 rounded-xl shadow-lg hover:bg-slate-50 transition-all";

  if (enabled && href !== "#") {
    return (
      <Link className={baseClass} href={href} target="_blank" rel="noreferrer">
        انضم لمساحتنا
      </Link>
    );
  }

  return (
    <div className="relative inline-block">
      <a
        className={`${baseClass} cursor-pointer ${pressed ? "animate-[wiggle_350ms_ease-in-out_0ms_2]" : ""}`}
        href="#"
        onClick={onDisabledClick}
        aria-disabled="true"
      >
        انضم لمساحتنا
      </a>

      {pressed && (
        <div
          className="absolute left-1/2 -translate-x-1/2 -top-12 whitespace-nowrap rounded-2xl bg-white/95 border border-slate-200 px-3 py-2 text-sm text-slate-800 shadow-xl"
          role="status"
        >
          قريباً... نجهّزها لك
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
