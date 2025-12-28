import { useState } from 'react';
import { Paddle, PlayStyle, SkillLevel } from '../types';
import { paddles } from '../data/paddles';

interface QuizModalProps {
  onClose: () => void;
  onSelectPaddle: (paddle: Paddle) => void;
}

interface QuizAnswers {
  skillLevel: SkillLevel | null;
  playStyle: PlayStyle | null;
  priority: 'power' | 'control' | 'spin' | 'balance' | null;
  budget: 'budget' | 'mid' | 'premium' | null;
  experience: 'tennis' | 'racquetball' | 'none' | null;
}

const steps = [
  {
    question: "What's your skill level?",
    key: 'skillLevel' as const,
    options: [
      { value: 'Beginner', label: 'Beginner', description: 'New to pickleball or still learning basics' },
      { value: 'Intermediate', label: 'Intermediate', description: 'Know the rules and can rally consistently' },
      { value: 'Advanced', label: 'Advanced', description: 'Strong technique and court awareness' },
      { value: 'Pro', label: 'Pro/Tournament', description: 'Competitive tournament player' },
    ]
  },
  {
    question: "How do you like to play?",
    key: 'playStyle' as const,
    options: [
      { value: 'Power', label: 'Power Player', description: 'I like to hit hard and dominate' },
      { value: 'Control', label: 'Control Player', description: 'I prefer precision and placement' },
      { value: 'Spin', label: 'Spin Player', description: 'I love adding spin to my shots' },
      { value: 'All-Around', label: 'All-Around', description: 'I like a balanced approach' },
    ]
  },
  {
    question: "What's most important to you in a paddle?",
    key: 'priority' as const,
    options: [
      { value: 'power', label: 'Maximum Power', description: 'I want to put the ball away' },
      { value: 'control', label: 'Maximum Control', description: 'Touch and placement are key' },
      { value: 'spin', label: 'Maximum Spin', description: 'I want to curve every shot' },
      { value: 'balance', label: 'Balance', description: 'I want a well-rounded paddle' },
    ]
  },
  {
    question: "What's your budget?",
    key: 'budget' as const,
    options: [
      { value: 'budget', label: 'Budget Friendly', description: 'Under $120' },
      { value: 'mid', label: 'Mid-Range', description: '$120 - $200' },
      { value: 'premium', label: 'Premium', description: '$200+' },
    ]
  },
  {
    question: "Do you have experience with other racquet sports?",
    key: 'experience' as const,
    options: [
      { value: 'tennis', label: 'Tennis Background', description: 'I played tennis regularly' },
      { value: 'racquetball', label: 'Racquetball/Squash', description: 'I played racquetball or squash' },
      { value: 'none', label: 'New to Racquet Sports', description: 'Pickleball is my first' },
    ]
  },
];

export function QuizModal({ onClose, onSelectPaddle }: QuizModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({
    skillLevel: null,
    playStyle: null,
    priority: null,
    budget: null,
    experience: null,
  });
  const [recommendations, setRecommendations] = useState<Paddle[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (value: string) => {
    const step = steps[currentStep];
    setAnswers({ ...answers, [step.key]: value });

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      calculateRecommendations({ ...answers, [step.key]: value });
    }
  };

  const calculateRecommendations = (finalAnswers: QuizAnswers) => {
    let scored = paddles.map(paddle => {
      let score = 0;

      // Skill level match
      if (finalAnswers.skillLevel && paddle.skillLevel.includes(finalAnswers.skillLevel)) {
        score += 20;
      }

      // Play style match
      if (finalAnswers.playStyle && paddle.playStyle.includes(finalAnswers.playStyle)) {
        score += 25;
      }

      // Priority match
      if (finalAnswers.priority === 'power') {
        score += paddle.power * 3;
      } else if (finalAnswers.priority === 'control') {
        score += paddle.control * 3;
      } else if (finalAnswers.priority === 'spin') {
        score += paddle.spin * 3;
      } else if (finalAnswers.priority === 'balance') {
        const balance = 10 - Math.abs(paddle.power - paddle.control) - Math.abs(paddle.control - paddle.spin);
        score += balance * 2;
      }

      // Budget match
      if (finalAnswers.budget === 'budget' && paddle.price < 120) {
        score += 15;
      } else if (finalAnswers.budget === 'mid' && paddle.price >= 120 && paddle.price <= 200) {
        score += 15;
      } else if (finalAnswers.budget === 'premium' && paddle.price > 200) {
        score += 15;
      }

      // Experience adjustments
      if (finalAnswers.experience === 'tennis') {
        // Tennis players often prefer elongated paddles
        if (paddle.shape === 'Elongated') score += 10;
        if (paddle.gripLength >= 5.25) score += 5;
      } else if (finalAnswers.experience === 'none') {
        // New players benefit from larger sweet spots
        if (paddle.sweetSpot === 'Extra Large' || paddle.sweetSpot === 'Large') score += 10;
        if (paddle.shape === 'Wide Body') score += 5;
      }

      return { paddle, score };
    });

    scored.sort((a, b) => b.score - a.score);
    setRecommendations(scored.slice(0, 5).map(s => s.paddle));
    setShowResults(true);
  };

  const goBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (showResults) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content quiz-results" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close" onClick={onClose}>&times;</button>

          <h2>Your Perfect Paddle Matches</h2>
          <p className="quiz-subtitle">Based on your preferences, here are our top recommendations:</p>

          <div className="recommendations-list">
            {recommendations.map((paddle, index) => (
              <div
                key={paddle.id}
                className="recommendation-card"
                onClick={() => onSelectPaddle(paddle)}
              >
                <div className="rec-rank">#{index + 1}</div>
                <div
                  className="rec-paddle-image"
                  style={{ backgroundColor: paddle.imageColor }}
                >
                  <svg viewBox="0 0 60 100" className="paddle-svg-small">
                    <ellipse cx="30" cy="35" rx="25" ry="32" fill="currentColor" opacity="0.9"/>
                    <rect x="24" y="62" width="12" height="28" rx="3" fill="#92400e"/>
                  </svg>
                </div>
                <div className="rec-info">
                  <span className="rec-brand">{paddle.brand}</span>
                  <h3>{paddle.name}</h3>
                  <p className="rec-price">${paddle.price.toFixed(2)}</p>
                  <div className="rec-tags">
                    {paddle.playStyle.slice(0, 2).map(style => (
                      <span key={style} className="tag small">{style}</span>
                    ))}
                  </div>
                </div>
                <div className="rec-stats">
                  <div className="mini-stat">
                    <span>PWR</span>
                    <strong>{paddle.power}</strong>
                  </div>
                  <div className="mini-stat">
                    <span>CTL</span>
                    <strong>{paddle.control}</strong>
                  </div>
                  <div className="mini-stat">
                    <span>SPN</span>
                    <strong>{paddle.spin}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button className="quiz-restart" onClick={() => {
            setCurrentStep(0);
            setAnswers({
              skillLevel: null,
              playStyle: null,
              priority: null,
              budget: null,
              experience: null,
            });
            setShowResults(false);
          }}>
            Retake Quiz
          </button>
        </div>
      </div>
    );
  }

  const step = steps[currentStep];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content quiz-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>

        <div className="quiz-progress">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`progress-dot ${index === currentStep ? 'active' : ''} ${index < currentStep ? 'completed' : ''}`}
            />
          ))}
        </div>

        <h2>{step.question}</h2>

        <div className="quiz-options">
          {step.options.map((option) => (
            <button
              key={option.value}
              className="quiz-option"
              onClick={() => handleAnswer(option.value)}
            >
              <span className="option-label">{option.label}</span>
              <span className="option-description">{option.description}</span>
            </button>
          ))}
        </div>

        {currentStep > 0 && (
          <button className="quiz-back" onClick={goBack}>
            &larr; Back
          </button>
        )}
      </div>
    </div>
  );
}
