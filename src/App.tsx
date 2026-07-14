import { useMemo, useRef, useState } from 'react';
import { PCanvas, PIcon, PText, PButtonPure } from '@porsche-design-system/components-react';
import HeroCarousel from './components/HeroCarousel';
import MovieRow from './components/MovieRow';
import SearchResults from './components/SearchResults';
import { heroSlides, popularSeries, popularMovies, topRated, type Movie } from './data/movies';

type NavPage = 'home' | 'tvshow' | 'movie' | 'animation' | 'most-watched';

const navItems: { id: NavPage; label: string; icon: string }[] = [
  { id: 'home', label: 'Home', icon: 'home' },
  { id: 'tvshow', label: 'TV Show', icon: 'broadcast' },
  { id: 'movie', label: 'Movie', icon: 'image' },
  { id: 'animation', label: 'Animation', icon: 'ai-spark' },
  { id: 'most-watched', label: 'Most Watched', icon: 'chart' },
];

const secondaryItems = [
  { label: 'FlixWorld App', icon: 'mobile' },
  { label: 'FM Download', icon: 'download' },
  { label: 'Games', icon: 'globe' },
];

export default function App() {
  const [activePage, setActivePage] = useState<NavPage>('home');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const allMovies = useMemo<Movie[]>(() => {
    const seen = new Map<number, Movie>();
    for (const m of [...popularSeries, ...popularMovies, ...topRated]) {
      if (!seen.has(m.id)) seen.set(m.id, m);
    }
    return Array.from(seen.values());
  }, []);

  const trimmedQuery = searchQuery.trim();
  const searchResults = useMemo(() => {
    if (!trimmedQuery) return [];
    const q = trimmedQuery.toLowerCase();
    return allMovies.filter(
      (m) => m.title.toLowerCase().includes(q) || m.genre.toLowerCase().includes(q)
    );
  }, [allMovies, trimmedQuery]);

  const openSearch = () => {
    setSearchOpen(true);
    setTimeout(() => searchInputRef.current?.focus(), 0);
  };

  const closeSearch = () => {
    setSearchOpen(false);
    setSearchQuery('');
  };

  return (
    <PCanvas
      theme="dark"
      sidebarStartOpen={sidebarOpen}
      onSidebarStartUpdate={(e) => setSidebarOpen(e.detail.open)}
      style={{ height: '100vh' }}
    >
      <span slot="title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 28,
            height: 28,
            background: '#10b981',
            borderRadius: 6,
          }}
        >
          <PIcon name="play" theme="dark" size="x-small" />
        </span>
        <span
          style={{
            fontFamily: "'Porsche Next','Arial Narrow',Arial,sans-serif",
            fontWeight: 700,
            fontSize: '1.1rem',
            color: '#FBFCFF',
          }}
        >
          FlixWorld
        </span>
      </span>

      <div slot="header-start" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <PButtonPure
          theme="dark"
          icon="menu-lines"
          hideLabel
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          Menu
        </PButtonPure>
        <PText theme="dark" size="small" color="contrast-medium">
          {navItems.find((n) => n.id === activePage)?.label ?? 'Home'}
        </PText>
      </div>

      <div
        slot="header-end"
        style={{ display: 'flex', alignItems: 'center', gap: 16, minWidth: 0, flex: searchOpen ? 1 : undefined }}
      >
        {searchOpen ? (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              flex: 1,
              minWidth: 0,
              maxWidth: 420,
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: 8,
              padding: '6px 10px',
            }}
          >
            <PIcon name="search" theme="dark" size="x-small" color="contrast-medium" />
            <input
              ref={searchInputRef}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Escape') closeSearch();
              }}
              placeholder="Search movies, shows..."
              style={{
                flex: 1,
                minWidth: 0,
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: '#FBFCFF',
                fontFamily: "'Porsche Next','Arial Narrow',Arial,sans-serif",
                fontSize: '0.9rem',
              }}
            />
            <button
              onClick={closeSearch}
              aria-label="Close search"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: 4,
                flexShrink: 0,
              }}
            >
              <PIcon name="close" theme="dark" size="x-small" color="contrast-medium" />
            </button>
          </div>
        ) : (
          <PButtonPure theme="dark" icon="search" hideLabel onClick={openSearch}>Search</PButtonPure>
        )}
        <PButtonPure
          theme="dark"
          icon="bell"
          hideLabel
          style={searchOpen ? { display: 'none' } : undefined}
        >
          Notifications
        </PButtonPure>
      </div>

      <div
        slot="sidebar-start"
        style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#0E0E12', padding: '12px 0' }}
      >
        <nav style={{ flex: 1, padding: '0 8px' }}>
          {navItems.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  background: isActive ? 'rgba(16,185,129,0.15)' : 'transparent',
                  border: isActive ? '1px solid rgba(16,185,129,0.3)' : '1px solid transparent',
                  padding: '10px 12px',
                  cursor: 'pointer',
                  borderRadius: 8,
                  marginBottom: 4,
                  transition: 'all 0.25s cubic-bezier(.25,.1,.25,1)',
                }}
              >
                <PIcon
                  name={item.icon as Parameters<typeof PIcon>[0]['name']}
                  theme="dark"
                  size="small"
                  color={isActive ? 'notification-success' : 'contrast-medium'}
                />
                <PText
                  theme="dark"
                  size="small"
                  weight={isActive ? 'semi-bold' : 'regular'}
                  color={isActive ? 'primary' : 'contrast-medium'}
                >
                  {item.label}
                </PText>
              </button>
            );
          })}
        </nav>

        <div style={{ height: 1, background: 'rgba(255,255,255,0.08)', margin: '8px 12px' }} />

        <div style={{ padding: '0 8px' }}>
          {secondaryItems.map((item) => (
            <button
              key={item.label}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                background: 'transparent',
                border: '1px solid transparent',
                padding: '8px 12px',
                cursor: 'pointer',
                borderRadius: 8,
                marginBottom: 4,
              }}
            >
              <PIcon
                name={item.icon as Parameters<typeof PIcon>[0]['name']}
                theme="dark"
                size="small"
                color="contrast-medium"
              />
              <PText theme="dark" size="small" color="contrast-medium">{item.label}</PText>
            </button>
          ))}
        </div>

        <div
          style={{
            margin: '12px',
            borderRadius: 8,
            padding: '12px',
            background: 'rgba(16,185,129,0.1)',
            border: '1px solid rgba(16,185,129,0.2)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <PIcon name="download" theme="dark" size="small" color="notification-success" />
            <PText theme="dark" size="x-small" weight="semi-bold">Get FlixWorld</PText>
          </div>
          <PText theme="dark" size="xx-small" color="contrast-medium">
            For mobile &amp; desktop
          </PText>
        </div>
      </div>

      <div style={{ background: '#0E0E12', minHeight: '100%' }}>
        {trimmedQuery ? (
          <SearchResults query={trimmedQuery} results={searchResults} />
        ) : (
          <>
            <HeroCarousel slides={heroSlides} />
            <div style={{ paddingTop: 32, paddingBottom: 32 }}>
              <MovieRow title="Popular Series" movies={popularSeries} />
              <MovieRow title="Popular Movies" movies={popularMovies} />
              <MovieRow title="Top Rated" movies={topRated} />
            </div>
          </>
        )}
      </div>
    </PCanvas>
  );
}
