import { useState, useMemo } from 'react';
import { FilterPanel } from './components/FilterPanel';
import { PaddleCard } from './components/PaddleCard';
import { PaddleModal } from './components/PaddleModal';
import { QuizModal } from './components/QuizModal';
import { paddles, priceRange, weightRange } from './data/paddles';
import { Paddle, FilterState } from './types';

type SortOption = 'name' | 'price-asc' | 'price-desc' | 'power' | 'control' | 'spin';

function App() {
  const [filters, setFilters] = useState<FilterState>({
    priceRange: priceRange,
    brands: [],
    playStyles: [],
    skillLevels: [],
    shapes: [],
    coreMaterials: [],
    surfaceMaterials: [],
    weightRange: weightRange,
    powerRange: [1, 10],
    controlRange: [1, 10],
    spinRange: [1, 10],
  });

  const [sortBy, setSortBy] = useState<SortOption>('name');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPaddle, setSelectedPaddle] = useState<Paddle | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const filteredPaddles = useMemo(() => {
    let result = paddles.filter(paddle => {
      // Search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        if (!paddle.name.toLowerCase().includes(query) &&
            !paddle.brand.toLowerCase().includes(query) &&
            !paddle.description.toLowerCase().includes(query)) {
          return false;
        }
      }

      // Price range
      if (paddle.price < filters.priceRange[0] || paddle.price > filters.priceRange[1]) {
        return false;
      }

      // Weight range
      if (paddle.weight < filters.weightRange[0] || paddle.weight > filters.weightRange[1]) {
        return false;
      }

      // Brands
      if (filters.brands.length > 0 && !filters.brands.includes(paddle.brand)) {
        return false;
      }

      // Play styles
      if (filters.playStyles.length > 0 &&
          !filters.playStyles.some(style => paddle.playStyle.includes(style))) {
        return false;
      }

      // Skill levels
      if (filters.skillLevels.length > 0 &&
          !filters.skillLevels.some(level => paddle.skillLevel.includes(level))) {
        return false;
      }

      // Shapes
      if (filters.shapes.length > 0 && !filters.shapes.includes(paddle.shape)) {
        return false;
      }

      // Core materials
      if (filters.coreMaterials.length > 0 && !filters.coreMaterials.includes(paddle.coreMaterial)) {
        return false;
      }

      // Surface materials
      if (filters.surfaceMaterials.length > 0 && !filters.surfaceMaterials.includes(paddle.surfaceMaterial)) {
        return false;
      }

      // Power range
      if (paddle.power < filters.powerRange[0] || paddle.power > filters.powerRange[1]) {
        return false;
      }

      // Control range
      if (paddle.control < filters.controlRange[0] || paddle.control > filters.controlRange[1]) {
        return false;
      }

      // Spin range
      if (paddle.spin < filters.spinRange[0] || paddle.spin > filters.spinRange[1]) {
        return false;
      }

      return true;
    });

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'power':
          return b.power - a.power;
        case 'control':
          return b.control - a.control;
        case 'spin':
          return b.spin - a.spin;
        default:
          return 0;
      }
    });

    return result;
  }, [filters, searchQuery, sortBy]);

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <svg viewBox="0 0 60 100" className="logo-paddle">
              <ellipse cx="30" cy="35" rx="25" ry="32" fill="#3b82f6"/>
              <rect x="24" y="62" width="12" height="28" rx="3" fill="#92400e"/>
              <ellipse cx="30" cy="35" rx="20" ry="27" fill="white" opacity="0.2"/>
            </svg>
            <h1>Pickleball Paddle Selector</h1>
          </div>
          <p className="tagline">Find your perfect paddle from {paddles.length}+ options</p>
        </div>
      </header>

      <div className="toolbar">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search paddles, brands..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        <button
          className="quiz-button"
          onClick={() => setShowQuiz(true)}
        >
          <span className="quiz-icon">?</span>
          Find My Paddle
        </button>

        <button
          className="filter-toggle"
          onClick={() => setShowFilters(!showFilters)}
        >
          Filters {showFilters ? '▼' : '▶'}
        </button>

        <div className="sort-container">
          <label>Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
          >
            <option value="name">Name</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="power">Power Rating</option>
            <option value="control">Control Rating</option>
            <option value="spin">Spin Rating</option>
          </select>
        </div>
      </div>

      <main className="main-content">
        <aside className={`sidebar ${showFilters ? 'show' : ''}`}>
          <FilterPanel filters={filters} onFilterChange={setFilters} />
        </aside>

        <section className="paddle-grid-section">
          <div className="results-count">
            Showing {filteredPaddles.length} of {paddles.length} paddles
          </div>

          {filteredPaddles.length === 0 ? (
            <div className="no-results">
              <p>No paddles match your filters.</p>
              <button onClick={() => setFilters({
                priceRange: priceRange,
                brands: [],
                playStyles: [],
                skillLevels: [],
                shapes: [],
                coreMaterials: [],
                surfaceMaterials: [],
                weightRange: weightRange,
                powerRange: [1, 10],
                controlRange: [1, 10],
                spinRange: [1, 10],
              })}>Reset Filters</button>
            </div>
          ) : (
            <div className="paddle-grid">
              {filteredPaddles.map(paddle => (
                <PaddleCard
                  key={paddle.id}
                  paddle={paddle}
                  onClick={() => setSelectedPaddle(paddle)}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      {selectedPaddle && (
        <PaddleModal
          paddle={selectedPaddle}
          onClose={() => setSelectedPaddle(null)}
        />
      )}

      {showQuiz && (
        <QuizModal
          onClose={() => setShowQuiz(false)}
          onSelectPaddle={(paddle) => {
            setShowQuiz(false);
            setSelectedPaddle(paddle);
          }}
        />
      )}
    </div>
  );
}

export default App;
