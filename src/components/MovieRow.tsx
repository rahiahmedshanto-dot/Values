import { useState } from 'react';
import { PIcon, PText, PTag } from '@porsche-design-system/components-react';
import type { Movie } from '../data/movies';

interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative flex-shrink-0 rounded-md overflow-hidden cursor-pointer w-[120px] h-[180px] xs:w-[140px] xs:h-[210px] sm:w-[160px] sm:h-[240px]"
      style={{
        transform: hovered ? 'scale(1.06)' : 'scale(1)',
        transition: 'transform 0.25s cubic-bezier(.25,.1,.25,1)',
        boxShadow: hovered ? '0px 8px 40px rgba(0,0,0,0.6)' : '0px 3px 8px rgba(0,0,0,0.4)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={movie.poster}
        alt={movie.title}
        className="w-full h-full object-cover"
      />

      {movie.badge && (
        <div
          className="absolute top-static-xs left-static-xs"
        >
          <PTag theme="dark" color="background-frosted">{movie.badge}</PTag>
        </div>
      )}

      <div
        className="absolute inset-0"
        style={{
          background: hovered
            ? 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)'
            : 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)',
          transition: 'background 0.25s',
        }}
      />

      <div className="absolute bottom-0 left-0 right-0 p-static-sm">
        <PText theme="dark" size="x-small" weight="semi-bold" className="truncate">
          {movie.title}
        </PText>
        <div className="flex items-center gap-static-xs mt-static-xs">
          <PIcon name="star" theme="dark" size="x-small" color="notification-warning" />
          <PText theme="dark" size="xx-small" color="contrast-medium">
            {movie.rating.toFixed(1)}
          </PText>
          <PText theme="dark" size="xx-small" color="contrast-medium">
            · {movie.year}
          </PText>
        </div>
        <button
          className={
            hovered
              ? 'mt-static-xs w-full flex items-center justify-center gap-static-xs rounded-sm'
              : 'mt-static-xs w-full flex sm:hidden items-center justify-center gap-static-xs rounded-sm'
          }
          style={{
            background: '#10b981',
            border: 'none',
            color: '#fff',
            padding: '6px 0',
            cursor: 'pointer',
            fontFamily: "'Porsche Next','Arial Narrow',Arial,sans-serif",
            fontSize: '0.75rem',
            fontWeight: 600,
          }}
        >
          <PIcon name="play" theme="dark" size="x-small" />
          Watch
        </button>
      </div>
    </div>
  );
}

interface MovieRowProps {
  title: string;
  movies: Movie[];
}

export default function MovieRow({ title, movies }: MovieRowProps) {
  return (
    <section className="mb-fluid-lg">
      <div className="flex items-center justify-between mb-fluid-sm px-fluid-lg">
        <h2
          style={{
            fontFamily: "'Porsche Next','Arial Narrow',Arial,sans-serif",
            fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
            fontWeight: 600,
            color: '#FBFCFF',
          }}
        >
          {title}
        </h2>
        <button
          style={{
            background: 'none',
            border: 'none',
            color: '#10b981',
            cursor: 'pointer',
            fontFamily: "'Porsche Next','Arial Narrow',Arial,sans-serif",
            fontSize: '0.85rem',
          }}
        >
          More &rsaquo;
        </button>
      </div>
      <div
        className="flex gap-fluid-sm px-fluid-lg overflow-x-auto"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}
