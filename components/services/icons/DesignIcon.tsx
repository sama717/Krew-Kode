export function DesignIconScene() {
  return (
    <div dir="ltr" className="svc-scene svc-design-scene">
      <div className="svc-scene-sway svc-design-sway">
        <div className="svc-plane svc-plane-outline svc-design-plane-one" />

        <div className="svc-plane svc-dark-plane svc-design-plane-two">
          <div className="svc-design-grid">
            <div className="svc-box-outline" />
            <div className="svc-box-outline" />
          </div>
        </div>

        <div className="svc-plane svc-dark-plane svc-design-plane-three">
          <svg
            aria-hidden="true"
            className="svc-svg"
            viewBox="0 0 300 200"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M30 150 C 90 30, 190 30, 270 140" />
            <path className="svc-dashed" d="M30 150 L90 60 M270 140 L200 50" />
            <rect x="25" y="145" width="10" height="10" rx="1" />
            <rect x="265" y="135" width="10" height="10" rx="1" />
            <circle cx="90" cy="60" r="5" />
            <circle cx="200" cy="50" r="5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function DesignIcon() {
  return <DesignIconScene />;
}
