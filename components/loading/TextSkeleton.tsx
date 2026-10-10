import Skeleton from "@/components/loading/Skeleton";

type TextSkeletonProps = {
  lines?: number;
};

export default function TextSkeleton({ lines = 1 }: TextSkeletonProps) {
  return (
    <Skeleton>
      {Array.from({ length: lines }, (_, index) => (
        <div key={index} />
      ))}
    </Skeleton>
  );
}
