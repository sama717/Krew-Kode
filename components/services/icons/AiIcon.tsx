export function AiIconScene() {
  return (
    <div dir="ltr" className="svc-scene svc-ai-scene">
      <div className="svc-ai-gyro svc-ai-gyro-outer">
        <div className="svc-ai-ring svc-ai-ring-a" />
        <div className="svc-ai-ring svc-ai-ring-b" />
        <div className="svc-ai-ring svc-ai-ring-c" />
        <span className="svc-ai-dot svc-ai-dot-top" />
        <span className="svc-ai-dot svc-ai-dot-bottom" />
        <span className="svc-ai-dot svc-ai-dot-left" />
        <span className="svc-ai-dot svc-ai-dot-right" />
      </div>

      <div className="svc-ai-gyro svc-ai-gyro-inner">
        <div className="svc-ai-ring svc-ai-ring-a" />
        <div className="svc-ai-ring svc-ai-ring-b" />
        <div className="svc-ai-ring svc-ai-ring-c" />
      </div>
    </div>
  );
}

export default function AiIcon() {
  return <AiIconScene />;
}
