import { FilterState, PlayStyle, SkillLevel, PaddleShape, CoreMaterial, SurfaceMaterial } from '../types';
import { brands, priceRange, weightRange } from '../data/paddles';

interface FilterPanelProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

const playStyles: PlayStyle[] = ['Power', 'Control', 'Spin', 'All-Around', 'Touch', 'Defensive', 'Aggressive'];
const skillLevels: SkillLevel[] = ['Beginner', 'Intermediate', 'Advanced', 'Pro'];
const shapes: PaddleShape[] = ['Standard', 'Elongated', 'Wide Body', 'Hybrid'];
const coreMaterials: CoreMaterial[] = ['Polymer Honeycomb', 'Nomex Honeycomb', 'Aluminum Honeycomb', 'Polypropylene Honeycomb', 'Carbon Fiber Honeycomb'];
const surfaceMaterials: SurfaceMaterial[] = ['Carbon Fiber', 'Fiberglass', 'Graphite', 'Composite', 'Raw Carbon', 'Kevlar', 'T700 Carbon', 'Toray Carbon'];

export function FilterPanel({ filters, onFilterChange }: FilterPanelProps) {
  const handleMultiSelect = <T extends string>(
    key: keyof FilterState,
    value: T,
    currentValues: T[]
  ) => {
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    onFilterChange({ ...filters, [key]: newValues });
  };

  const handleRangeChange = (
    key: keyof FilterState,
    index: 0 | 1,
    value: number
  ) => {
    const currentRange = filters[key] as [number, number];
    const newRange: [number, number] = [...currentRange] as [number, number];
    newRange[index] = value;
    onFilterChange({ ...filters, [key]: newRange });
  };

  const resetFilters = () => {
    onFilterChange({
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
  };

  return (
    <div className="filter-panel">
      <div className="filter-header">
        <h2>Filters</h2>
        <button className="reset-button" onClick={resetFilters}>
          Reset All
        </button>
      </div>

      <div className="filter-section">
        <h3>Price Range</h3>
        <div className="range-inputs">
          <input
            type="number"
            value={filters.priceRange[0]}
            onChange={(e) => handleRangeChange('priceRange', 0, Number(e.target.value))}
            min={priceRange[0]}
            max={filters.priceRange[1]}
          />
          <span>to</span>
          <input
            type="number"
            value={filters.priceRange[1]}
            onChange={(e) => handleRangeChange('priceRange', 1, Number(e.target.value))}
            min={filters.priceRange[0]}
            max={priceRange[1]}
          />
        </div>
        <input
          type="range"
          className="slider"
          min={priceRange[0]}
          max={priceRange[1]}
          value={filters.priceRange[1]}
          onChange={(e) => handleRangeChange('priceRange', 1, Number(e.target.value))}
        />
      </div>

      <div className="filter-section">
        <h3>Weight (oz)</h3>
        <div className="range-inputs">
          <input
            type="number"
            step="0.1"
            value={filters.weightRange[0]}
            onChange={(e) => handleRangeChange('weightRange', 0, Number(e.target.value))}
            min={weightRange[0]}
            max={filters.weightRange[1]}
          />
          <span>to</span>
          <input
            type="number"
            step="0.1"
            value={filters.weightRange[1]}
            onChange={(e) => handleRangeChange('weightRange', 1, Number(e.target.value))}
            min={filters.weightRange[0]}
            max={weightRange[1]}
          />
        </div>
      </div>

      <div className="filter-section">
        <h3>Skill Level</h3>
        <div className="checkbox-group">
          {skillLevels.map((level) => (
            <label key={level} className="checkbox-label">
              <input
                type="checkbox"
                checked={filters.skillLevels.includes(level)}
                onChange={() => handleMultiSelect('skillLevels', level, filters.skillLevels)}
              />
              {level}
            </label>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h3>Play Style</h3>
        <div className="checkbox-group">
          {playStyles.map((style) => (
            <label key={style} className="checkbox-label">
              <input
                type="checkbox"
                checked={filters.playStyles.includes(style)}
                onChange={() => handleMultiSelect('playStyles', style, filters.playStyles)}
              />
              {style}
            </label>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h3>Brand</h3>
        <div className="checkbox-group scrollable">
          {brands.map((brand) => (
            <label key={brand} className="checkbox-label">
              <input
                type="checkbox"
                checked={filters.brands.includes(brand)}
                onChange={() => handleMultiSelect('brands', brand, filters.brands)}
              />
              {brand}
            </label>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h3>Paddle Shape</h3>
        <div className="checkbox-group">
          {shapes.map((shape) => (
            <label key={shape} className="checkbox-label">
              <input
                type="checkbox"
                checked={filters.shapes.includes(shape)}
                onChange={() => handleMultiSelect('shapes', shape, filters.shapes)}
              />
              {shape}
            </label>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h3>Surface Material</h3>
        <div className="checkbox-group scrollable">
          {surfaceMaterials.map((material) => (
            <label key={material} className="checkbox-label">
              <input
                type="checkbox"
                checked={filters.surfaceMaterials.includes(material)}
                onChange={() => handleMultiSelect('surfaceMaterials', material, filters.surfaceMaterials)}
              />
              {material}
            </label>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h3>Core Material</h3>
        <div className="checkbox-group scrollable">
          {coreMaterials.map((material) => (
            <label key={material} className="checkbox-label">
              <input
                type="checkbox"
                checked={filters.coreMaterials.includes(material)}
                onChange={() => handleMultiSelect('coreMaterials', material, filters.coreMaterials)}
              />
              {material}
            </label>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h3>Power Rating</h3>
        <div className="range-inputs">
          <span>{filters.powerRange[0]}</span>
          <input
            type="range"
            min={1}
            max={10}
            value={filters.powerRange[0]}
            onChange={(e) => handleRangeChange('powerRange', 0, Number(e.target.value))}
          />
          <input
            type="range"
            min={1}
            max={10}
            value={filters.powerRange[1]}
            onChange={(e) => handleRangeChange('powerRange', 1, Number(e.target.value))}
          />
          <span>{filters.powerRange[1]}</span>
        </div>
      </div>

      <div className="filter-section">
        <h3>Control Rating</h3>
        <div className="range-inputs">
          <span>{filters.controlRange[0]}</span>
          <input
            type="range"
            min={1}
            max={10}
            value={filters.controlRange[0]}
            onChange={(e) => handleRangeChange('controlRange', 0, Number(e.target.value))}
          />
          <input
            type="range"
            min={1}
            max={10}
            value={filters.controlRange[1]}
            onChange={(e) => handleRangeChange('controlRange', 1, Number(e.target.value))}
          />
          <span>{filters.controlRange[1]}</span>
        </div>
      </div>

      <div className="filter-section">
        <h3>Spin Rating</h3>
        <div className="range-inputs">
          <span>{filters.spinRange[0]}</span>
          <input
            type="range"
            min={1}
            max={10}
            value={filters.spinRange[0]}
            onChange={(e) => handleRangeChange('spinRange', 0, Number(e.target.value))}
          />
          <input
            type="range"
            min={1}
            max={10}
            value={filters.spinRange[1]}
            onChange={(e) => handleRangeChange('spinRange', 1, Number(e.target.value))}
          />
          <span>{filters.spinRange[1]}</span>
        </div>
      </div>
    </div>
  );
}
