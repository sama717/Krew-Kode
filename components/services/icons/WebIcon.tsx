export function WebIconScene() {
  return (
    <div dir="ltr" className="svc-scene svc-web-scene">
      <div className="svc-scene-sway">
        <div className="svc-plane svc-plane-outline svc-web-back-one" />
        <div className="svc-plane svc-plane-outline svc-web-back-two" />

        <div className="svc-plane svc-dark-plane svc-web-main">
          <div className="svc-web-header" />
          <div className="svc-web-dot" />
          <div className="svc-web-dot svc-web-dot-two" />
          <div className="svc-web-dot svc-web-dot-three" />
          <div className="svc-web-block svc-web-block-main" />
          <div className="svc-web-block svc-web-block-top" />
          <div className="svc-web-line svc-web-line-top" />
          <div className="svc-web-line svc-web-line-mid" />
          <div className="svc-web-block svc-web-block-wide" />
        </div>

        <div className="svc-plane svc-dark-plane svc-web-card">
          <div className="svc-web-chart-bars">
            <span className="svc-web-bar s1" />
            <span className="svc-web-bar s2" />
            <span className="svc-web-bar s3" />
            <span className="svc-web-bar s4" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function WebIcon() {
  return <WebIconScene />;
}
