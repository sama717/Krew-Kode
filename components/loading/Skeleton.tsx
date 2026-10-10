import type { ReactNode } from "react";

type SkeletonProps = {
  children?: ReactNode;
};

export default function Skeleton({ children }: SkeletonProps) {
  return <div aria-hidden="true">{children}</div>;
}
