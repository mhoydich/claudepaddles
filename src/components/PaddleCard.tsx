import { Paddle } from '../types';

interface PaddleCardProps {
  paddle: Paddle;
  onClick: () => void;
}

export function PaddleCard({ paddle, onClick }: PaddleCardProps) {
  return (
    <div className="paddle-card" onClick={onClick}>
      <div
        className="paddle-image"
        style={{ backgroundColor: paddle.imageColor }}
      >
        <div className="paddle-shape">
          <svg viewBox="0 0 60 100" className="paddle-svg">
            <ellipse cx="30" cy="35" rx="25" ry="32" fill="currentColor" opacity="0.9"/>
            <rect x="24" y="62" width="12" height="28" rx="3" fill="#92400e"/>
            <ellipse cx="30" cy="35" rx="20" ry="27" fill="white" opacity="0.15"/>
          </svg>
        </div>
        <span className="brand-tag">{paddle.brand}</span>
      </div>

      <div className="paddle-info">
        <h3 className="paddle-name">{paddle.name}</h3>
        <p className="paddle-price">${paddle.price.toFixed(2)}</p>

        <div className="paddle-stats">
          <div className="stat">
            <span className="stat-label">Power</span>
            <div className="stat-bar">
              <div
                className="stat-fill power"
                style={{ width: `${paddle.power * 10}%` }}
              />
            </div>
            <span className="stat-value">{paddle.power}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Control</span>
            <div className="stat-bar">
              <div
                className="stat-fill control"
                style={{ width: `${paddle.control * 10}%` }}
              />
            </div>
            <span className="stat-value">{paddle.control}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Spin</span>
            <div className="stat-bar">
              <div
                className="stat-fill spin"
                style={{ width: `${paddle.spin * 10}%` }}
              />
            </div>
            <span className="stat-value">{paddle.spin}</span>
          </div>
        </div>

        <div className="paddle-tags">
          {paddle.playStyle.slice(0, 3).map((style) => (
            <span key={style} className="tag">{style}</span>
          ))}
        </div>

        <div className="paddle-specs">
          <span>{paddle.weight} oz</span>
          <span>{paddle.shape}</span>
          <span>{paddle.coreThickness}mm</span>
        </div>
      </div>
    </div>
  );
}
