"use client";

import { useLocale, useTranslations } from "next-intl";
import { slides } from "@/lib/content/about";

type SlideId = (typeof slides)[number]["id"];

function SlidePlaceholder({ id }: { id: SlideId }) {
  return (
    <svg
      aria-hidden="true"
      className="about-slide-drawing"
      fill="none"
      viewBox="0 0 240 180"
    >
      {id === "sketching" && (
        <>
          <path
            className="about-drawing-path"
            d="M38 124c22-52 54-67 84-44 24 18 41 10 79-30"
            pathLength="1"
          />
          <circle
            className="about-drawing-path about-drawing-delay-one"
            cx="169"
            cy="119"
            r="23"
            pathLength="1"
          />
        </>
      )}
      {id === "wireframing" && (
        <>
          <path
            className="about-drawing-path"
            d="M34 34h172v112H34zM34 61h172M58 47h1M70 47h1M82 47h1"
            pathLength="1"
          />
          <path
            className="about-drawing-path about-drawing-delay-one"
            d="M54 80h57v48H54zM126 80h59v18h-59zM126 110h59v18h-59z"
            pathLength="1"
          />
        </>
      )}
      {id === "building-ui" && (
        <>
          <path
            className="about-drawing-path"
            d="M30 32h180v116H30zM30 59h180M54 46h1M66 46h1M78 46h1"
            pathLength="1"
          />
          <path
            className="about-drawing-path about-drawing-delay-one"
            d="M50 78h63v50H50zM130 78h60v16h-60zM130 106h60v22h-60z"
            pathLength="1"
          />
          <path
            className="about-drawing-path about-drawing-delay-two"
            d="M143 111h32a8 8 0 010 16h-32a8 8 0 010-16z"
            pathLength="1"
            stroke="var(--logo-chevron)"
            strokeLinecap="round"
            strokeWidth="5"
          />
        </>
      )}
      {id === "writing-code" && (
        <>
          <path
            className="about-drawing-path"
            d="m91 51-39 39 39 39M149 51l39 39-39 39"
            pathLength="1"
          />
          <path
            className="about-drawing-path about-drawing-delay-one"
            d="m133 40-27 100"
            pathLength="1"
          />
        </>
      )}
      {id === "shipping" && (
        <path
          className="about-drawing-path"
          d="M40 134h160M120 122V48m0 0L91 77m29-29 29 29"
          pathLength="1"
        />
      )}
    </svg>
  );
}

function SlideCard({
  id,
  label,
  width,
  height,
  video,
  index,
  duplicate,
  locale,
}: {
  id: SlideId;
  label: string;
  width: number;
  height: number;
  video?: string;
  index: number;
  duplicate: boolean;
  locale: string;
}) {
  const t = useTranslations("about");
  const slideNumber = String(index + 1).padStart(2, "0");

  return (
    <article
      aria-label={`${slideNumber} / ${t(`slides.${label}`)}`}
      aria-hidden={duplicate}
      className="about-carousel-card relative shrink-0 overflow-hidden rounded-2xl bg-surface text-fg"
      data-theme="dark"
      dir={locale === "ar" ? "rtl" : "ltr"}
      style={{ width, height }}
    >
      <p className="absolute start-4 top-4 z-10 rounded-full border border-line bg-bg/60 px-3 py-1.5 font-mono text-[11px] text-fg backdrop-blur-sm">
        {slideNumber} / {t(`slides.${label}`)}
      </p>
      {video ? (
        <video
          autoPlay
          className="h-full w-full object-cover"
          loop
          muted
          playsInline
          preload="metadata"
          src={video}
        />
      ) : (
        <div className="grid h-full w-full place-items-center">
          <SlidePlaceholder id={id} />
        </div>
      )}
    </article>
  );
}

export default function AboutCarousel() {
  const locale = useLocale();
  const t = useTranslations("about");

  const renderSlides = (duplicate: boolean) =>
    slides.map((slide, index) => (
      <SlideCard
        duplicate={duplicate}
        height={slide.height}
        id={slide.id}
        index={index}
        key={slide.id}
        label={slide.label}
        locale={locale}
        video={slide.video}
        width={slide.width}
      />
    ));

  return (
    <div>
      <div
        aria-label={t("carouselLabel")}
        className="about-carousel-viewport -mx-6 overflow-hidden px-6"
        role="region"
      >
        <div className="about-carousel-track flex w-max">
          <div className="about-carousel-group flex shrink-0 gap-5 pe-5">
            {renderSlides(false)}
          </div>
          <div
            aria-hidden="true"
            className="about-carousel-group flex shrink-0 gap-5 pe-5"
          >
            {renderSlides(true)}
          </div>
        </div>
      </div>
      <p className="mt-5 text-start font-mono text-xs text-muted">
        {t("pauseHint")}
      </p>
    </div>
  );
}
