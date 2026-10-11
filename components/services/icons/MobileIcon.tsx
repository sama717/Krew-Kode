export function MobileIconScene() {
  return (
    <div dir="ltr" className="svc-scene svc-mobile-scene">
      <div className="svc-scene-sway">
        <div className="svc-phone-back" />
        <div className="svc-plane svc-dark-plane svc-phone-front">
          <div className="svc-phone-notch" />
          <div className="svc-phone-block" />
          <div className="svc-phone-square" />
          <div className="svc-phone-square svc-phone-square-two" />
          <div className="svc-phone-line" />
          <div className="svc-phone-line svc-phone-line-short" />
          <div className="svc-phone-pill" />
        </div>
      </div>
    </div>
  );
}

export default function MobileIcon() {
  return <MobileIconScene />;
}
