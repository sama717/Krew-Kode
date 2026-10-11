export function DesktopIconScene() {
  return (
    <div dir="ltr" className="svc-scene svc-desktop-scene">
      <div className="svc-scene-sway">
        <div className="svc-plane svc-dark-plane svc-monitor">
          <div className="svc-monitor-window">
            <div className="svc-monitor-title" />
            <div className="svc-monitor-dot" />
            <div className="svc-monitor-sidebar" />
            <div className="svc-monitor-block svc-monitor-block-a" />
            <div className="svc-monitor-block svc-monitor-block-b" />
            <div className="svc-monitor-block svc-monitor-block-c" />
          </div>
        </div>

        <div className="svc-plane svc-plane-outline svc-monitor-neck" />
        <div className="svc-plane svc-plane-outline svc-monitor-base" />

        <div className="svc-plane svc-dark-plane svc-monitor-card">
          <div className="svc-monitor-card-line" />
          <div className="svc-monitor-card-line svc-monitor-card-line-mid" />
          <div className="svc-monitor-card-line svc-monitor-card-line-short" />
        </div>
      </div>
    </div>
  );
}

export default function DesktopIcon() {
  return <DesktopIconScene />;
}
