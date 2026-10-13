"use client";

import dynamic from "next/dynamic";
import { useSyncExternalStore } from "react";

const Globe = dynamic(() => import("./Globe"), {
  ssr: false,
  loading: () => null,
});

const subscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

type GlobeLazyProps = {
  label: string;
  hint: string;
  est: string;
};

export default function GlobeLazy(props: GlobeLazyProps) {
  const hydrated = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot,
  );

  return (
    <div className="about-globe">
      {hydrated ? <Globe {...props} /> : null}
    </div>
  );
}
