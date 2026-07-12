import { useState, useEffect, useRef } from 'react';
import { PIcon, PText, PTag } from '@porsche-design-system/components-react';
import type { HeroSlide } from '../data/movies';

interface HeroCarouselProps {
  slides: HeroSlide[];
}

export default function HeroCarousel({ slides }: HeroCarouselProps) {
  const [active, setActive] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 5000);
  };

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [slides.length]);

  const goTo = (idx: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setActive(idx);
    startTimer();
  };

  const prev = () => goTo((active - 1 + slides.length) % slides.length);
  const next = () => goTo((active + 1) % slides.length);

  const slide = slides[active];

  return (
    <div className="relative overflow-hidden h-[280px] xs:h-[340px] sm:h-[420px] md:h-[480px] lg:h-[520px]">
      {slides.map((s, i) => (
        <div
          key={s.id}
          className="absolute inset-0 transition-opacity"
          style={{
            opacity: i === active ? 1 : 0,
            transitionDuration: '0.6s',
          }}
        >
          <img
            src={s.image}
            alt={s.title}
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)' }}
          />
        </div>
      ))}

      {/* Content overlay */}
      <div
        className="absolute inset-0 flex items-end pb-fluid-md sm:pb-fluid-lg pl-fluid-md sm:pl-fluid-lg pr-fluid-md sm:pr-fluid-lg"
        style={{ pointerEvents: 'none' }}
      >
        <div style={{ pointerEvents: 'auto', maxWidth: '100%' }}>
          <div className="flex items-center gap-static-sm mb-static-sm">
            <PTag theme="dark" color="background-frosted">{slide.genre}</PTag>
            <PText theme="dark" color="contrast-medium" size="x-small">{slide.year}</PText>
          </div>
          <h1
            className="text-primary-dark mb-static-sm"
            style={{
              fontFamily: "'Porsche Next','Arial Narrow',Arial,sans-serif",
              fontSize: 'clamp(1.5rem, 6vw, 3.5rem)',
              fontWeight: 700,
              lineHeight: 1.1,
              textShadow: '0 2px 12px rgba(0,0,0,0.6)',
            }}
          >
            {slide.title}
          </h1>
          <button
            className="flex items-center gap-static-xs px-fluid-sm sm:px-fluid-md py-static-xs sm:py-static-sm rounded-sm"
            style={{
              background: '#10b981',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
              fontFamily: "'Porsche Next','Arial Narrow',Arial,sans-serif",
              fontSize: '0.85rem',
              fontWeight: 600,
              whiteSpace: 'nowrap',
            }}
          >
            <PIcon name="play" theme="dark" size="small" />
            Watch Now
          </button>
        </div>
      </div>

      {/* Arrows */}
      <button
        onClick={prev}
        className="hidden sm:flex absolute left-static-md top-1/2 -translate-y-1/2 items-center justify-center rounded-full"
        style={{
          background: 'rgba(0,0,0,0.5)',
          border: '1px solid rgba(255,255,255,0.2)',
          width: 40,
          height: 40,
          cursor: 'pointer',
        }}
      >
        <PIcon name="arrow-left" theme="dark" size="small" />
      </button>
      <button
        onClick={next}
        className="hidden sm:flex absolute right-static-md top-1/2 -translate-y-1/2 items-center justify-center rounded-full"
        style={{
          background: 'rgba(0,0,0,0.5)',
          border: '1px solid rgba(255,255,255,0.2)',
          width: 40,
          height: 40,
          cursor: 'pointer',
        }}
      >
        <PIcon name="arrow-right" theme="dark" size="small" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-static-sm sm:bottom-static-md right-static-sm sm:right-fluid-md flex gap-static-xs">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            style={{
              width: i === active ? 24 : 8,
              height: 8,
              borderRadius: 4,
              background: i === active ? '#10b981' : 'rgba(255,255,255,0.4)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s',
              padding: 0,
            }}
          />
        ))}
      </div>
    </div>
  );
}
