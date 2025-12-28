import { Paddle } from '../types';

interface PaddleModalProps {
  paddle: Paddle;
  onClose: () => void;
}

export function PaddleModal({ paddle, onClose }: PaddleModalProps) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>

        <div className="modal-header">
          <div
            className="modal-paddle-image"
            style={{ backgroundColor: paddle.imageColor }}
          >
            <svg viewBox="0 0 60 100" className="paddle-svg-large">
              <ellipse cx="30" cy="35" rx="25" ry="32" fill="currentColor" opacity="0.9"/>
              <rect x="24" y="62" width="12" height="28" rx="3" fill="#92400e"/>
              <ellipse cx="30" cy="35" rx="20" ry="27" fill="white" opacity="0.15"/>
            </svg>
          </div>

          <div className="modal-title">
            <span className="modal-brand">{paddle.brand}</span>
            <h2>{paddle.name}</h2>
            <p className="modal-price">${paddle.price.toFixed(2)}</p>
          </div>
        </div>

        <div className="modal-body">
          <p className="modal-description">{paddle.description}</p>

          <div className="modal-stats">
            <h3>Performance Ratings</h3>
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-name">Power</span>
                <div className="stat-bar-large">
                  <div
                    className="stat-fill power"
                    style={{ width: `${paddle.power * 10}%` }}
                  />
                </div>
                <span className="stat-number">{paddle.power}/10</span>
              </div>
              <div className="stat-item">
                <span className="stat-name">Control</span>
                <div className="stat-bar-large">
                  <div
                    className="stat-fill control"
                    style={{ width: `${paddle.control * 10}%` }}
                  />
                </div>
                <span className="stat-number">{paddle.control}/10</span>
              </div>
              <div className="stat-item">
                <span className="stat-name">Spin</span>
                <div className="stat-bar-large">
                  <div
                    className="stat-fill spin"
                    style={{ width: `${paddle.spin * 10}%` }}
                  />
                </div>
                <span className="stat-number">{paddle.spin}/10</span>
              </div>
            </div>
          </div>

          <div className="modal-specs">
            <h3>Specifications</h3>
            <div className="specs-grid">
              <div className="spec">
                <span className="spec-label">Weight</span>
                <span className="spec-value">{paddle.weight} oz</span>
              </div>
              <div className="spec">
                <span className="spec-label">Core Thickness</span>
                <span className="spec-value">{paddle.coreThickness}mm</span>
              </div>
              <div className="spec">
                <span className="spec-label">Core Material</span>
                <span className="spec-value">{paddle.coreMaterial}</span>
              </div>
              <div className="spec">
                <span className="spec-label">Surface Material</span>
                <span className="spec-value">{paddle.surfaceMaterial}</span>
              </div>
              <div className="spec">
                <span className="spec-label">Shape</span>
                <span className="spec-value">{paddle.shape}</span>
              </div>
              <div className="spec">
                <span className="spec-label">Grip Length</span>
                <span className="spec-value">{paddle.gripLength}"</span>
              </div>
              <div className="spec">
                <span className="spec-label">Grip Circumference</span>
                <span className="spec-value">{paddle.gripCircumference}"</span>
              </div>
              <div className="spec">
                <span className="spec-label">Sweet Spot</span>
                <span className="spec-value">{paddle.sweetSpot}</span>
              </div>
            </div>
          </div>

          <div className="modal-sections">
            <div className="modal-section">
              <h3>Play Styles</h3>
              <div className="tags-container">
                {paddle.playStyle.map((style) => (
                  <span key={style} className="tag large">{style}</span>
                ))}
              </div>
            </div>

            <div className="modal-section">
              <h3>Skill Levels</h3>
              <div className="tags-container">
                {paddle.skillLevel.map((level) => (
                  <span key={level} className="tag skill-tag">{level}</span>
                ))}
              </div>
            </div>

            <div className="modal-section">
              <h3>Key Features</h3>
              <ul className="features-list">
                {paddle.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>

            <div className="modal-section pros-cons">
              <div className="pros">
                <h3>Pros</h3>
                <ul>
                  {paddle.pros.map((pro, index) => (
                    <li key={index}>{pro}</li>
                  ))}
                </ul>
              </div>
              <div className="cons">
                <h3>Cons</h3>
                <ul>
                  {paddle.cons.map((con, index) => (
                    <li key={index}>{con}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
