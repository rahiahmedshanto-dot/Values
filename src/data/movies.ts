export interface Movie {
  id: number;
  title: string;
  year: number;
  genre: string;
  rating: number;
  poster: string;
  badge?: string;
}

export interface HeroSlide {
  id: number;
  title: string;
  year: number;
  genre: string;
  image: string;
}

export const heroSlides: HeroSlide[] = [
  {
    id: 1,
    title: 'Shadow Protocol',
    year: 2026,
    genre: 'Action',
    image: '/hero-shadow-protocol.webp',
  },
  {
    id: 2,
    title: 'Eternal Storm',
    year: 2025,
    genre: 'Disaster',
    image: '/hero-eternal-storm.webp',
  },
];

export const popularSeries: Movie[] = [
  { id: 1, title: 'Kingdom Chronicles', year: 2025, genre: 'Fantasy', rating: 8.7, poster: '/poster-kingdom-chronicles.webp', badge: 'HBO' },
  { id: 2, title: 'Iron Crown', year: 2025, genre: 'Drama', rating: 9.1, poster: '/poster-iron-crown.webp', badge: 'NETFLIX' },
  { id: 3, title: 'Nova Station', year: 2026, genre: 'Sci-Fi', rating: 8.3, poster: '/poster-nova-station.webp', badge: 'APPLE TV+' },
  { id: 4, title: 'Neon Vendetta', year: 2025, genre: 'Thriller', rating: 8.0, poster: '/poster-neon-vendetta.webp' },
  { id: 5, title: 'Ghost Circuit', year: 2026, genre: 'Sci-Fi', rating: 7.8, poster: '/poster-ghost-circuit.webp' },
  { id: 6, title: 'Crimson Falls', year: 2025, genre: 'Horror', rating: 7.5, poster: '/poster-crimson-falls.webp' },
];

export const popularMovies: Movie[] = [
  { id: 7, title: 'Nexus Frontier', year: 2026, genre: 'Sci-Fi', rating: 8.4, poster: '/poster-nexus-frontier.webp' },
  { id: 8, title: 'City Hearts', year: 2025, genre: 'Romance', rating: 7.2, poster: '/poster-city-hearts.webp' },
  { id: 9, title: 'Deep Blue', year: 2025, genre: 'Thriller', rating: 8.1, poster: '/poster-deep-blue.webp' },
  { id: 10, title: 'Red Dawn Rising', year: 2026, genre: 'War', rating: 7.9, poster: '/poster-red-dawn.webp' },
  { id: 11, title: 'Blazing Trail', year: 2025, genre: 'Western', rating: 7.6, poster: '/poster-blazing-trail.webp' },
  { id: 12, title: 'Arctic Code', year: 2026, genre: 'Action', rating: 8.2, poster: '/poster-arctic-code.webp' },
  { id: 13, title: 'Silver Rain', year: 2025, genre: 'Mystery', rating: 7.4, poster: '/poster-silver-rain.webp' },
];

export const topRated: Movie[] = [
  { id: 2, title: 'Iron Crown', year: 2025, genre: 'Drama', rating: 9.1, poster: '/poster-iron-crown.webp', badge: 'NETFLIX' },
  { id: 1, title: 'Kingdom Chronicles', year: 2025, genre: 'Fantasy', rating: 8.7, poster: '/poster-kingdom-chronicles.webp', badge: 'HBO' },
  { id: 7, title: 'Nexus Frontier', year: 2026, genre: 'Sci-Fi', rating: 8.4, poster: '/poster-nexus-frontier.webp' },
  { id: 12, title: 'Arctic Code', year: 2026, genre: 'Action', rating: 8.2, poster: '/poster-arctic-code.webp' },
  { id: 9, title: 'Deep Blue', year: 2025, genre: 'Thriller', rating: 8.1, poster: '/poster-deep-blue.webp' },
  { id: 3, title: 'Nova Station', year: 2026, genre: 'Sci-Fi', rating: 8.3, poster: '/poster-nova-station.webp' },
];
