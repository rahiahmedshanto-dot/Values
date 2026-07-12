import { PIcon, PText } from '@porsche-design-system/components-react';
import { MovieCard } from './MovieRow';
import type { Movie } from '../data/movies';

interface SearchResultsProps {
  query: string;
  results: Movie[];
}

export default function SearchResults({ query, results }: SearchResultsProps) {
  return (
    <div className="pt-fluid-lg pb-fluid-lg px-fluid-lg">
      <PText theme="dark" size="small" color="contrast-medium" className="mb-static-sm block">
        {results.length > 0
          ? `${results.length} result${results.length === 1 ? '' : 's'} for "${query}"`
          : `No results for "${query}"`}
      </PText>

      {results.length > 0 ? (
        <div className="flex flex-wrap gap-fluid-sm mt-fluid-sm">
          {results.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <div
          className="flex flex-col items-center justify-center text-center"
          style={{ padding: '64px 16px' }}
        >
          <PIcon name="search" theme="dark" size="large" color="contrast-medium" />
          <PText theme="dark" size="medium" weight="semi-bold" className="mt-static-md">
            No movies or shows found
          </PText>
          <PText theme="dark" size="small" color="contrast-medium" className="mt-static-xs">
            Try searching a different title.
          </PText>
        </div>
      )}
    </div>
  );
}
