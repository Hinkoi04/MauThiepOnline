import React from 'react';

interface BotanicalSprigProps {
  position: 'left' | 'right';
  className?: string;
  color?: string;
}

export const BotanicalSprig: React.FC<BotanicalSprigProps> = ({
  position,
  className = '',
  color = '#8b5eb5',
}) => {
  const isLeft = position === 'left';

  return (
    <div
      className={`pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      <svg
        width="64"
        height="80"
        viewBox="0 0 70 90"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="opacity-75"
        style={{ stroke: color }}
      >
        <g transform={isLeft ? undefined : 'scale(-1, 1) translate(-70, 0)'}>
          {/* Main stem */}
          <path
            d="M 12 4 C 18 22, 28 48, 56 82"
            strokeWidth="1.25"
            strokeLinecap="round"
          />

          {/* Leaf pairs along stem */}
          {/* Pair 1 near top */}
          <path
            d="M 13 12 C 9 9, 3 10, 4 16 C 5 20, 11 18, 14 14"
            strokeWidth="1"
            strokeLinecap="round"
            fill="rgba(139, 94, 181, 0.15)"
          />
          <path
            d="M 14 14 C 18 10, 24 11, 23 17 C 22 21, 16 19, 15 16"
            strokeWidth="1"
            strokeLinecap="round"
            fill="rgba(139, 94, 181, 0.15)"
          />

          {/* Pair 2 */}
          <path
            d="M 17 26 C 11 22, 4 25, 6 31 C 8 36, 15 34, 18 29"
            strokeWidth="1"
            strokeLinecap="round"
            fill="rgba(139, 94, 181, 0.15)"
          />
          <path
            d="M 18 29 C 23 24, 30 26, 28 32 C 26 37, 20 34, 19 31"
            strokeWidth="1"
            strokeLinecap="round"
            fill="rgba(139, 94, 181, 0.15)"
          />

          {/* Pair 3 */}
          <path
            d="M 23 42 C 16 38, 8 42, 11 49 C 13 54, 21 51, 25 45"
            strokeWidth="1"
            strokeLinecap="round"
            fill="rgba(139, 94, 181, 0.15)"
          />
          <path
            d="M 25 45 C 31 39, 38 42, 36 49 C 34 54, 27 51, 26 47"
            strokeWidth="1"
            strokeLinecap="round"
            fill="rgba(139, 94, 181, 0.15)"
          />

          {/* Pair 4 */}
          <path
            d="M 32 58 C 24 55, 17 60, 20 67 C 23 72, 30 68, 34 62"
            strokeWidth="1"
            strokeLinecap="round"
            fill="rgba(139, 94, 181, 0.15)"
          />
          <path
            d="M 34 62 C 41 57, 48 61, 46 68 C 44 73, 37 70, 36 65"
            strokeWidth="1"
            strokeLinecap="round"
            fill="rgba(139, 94, 181, 0.15)"
          />

          {/* Delicate bud or berry accents */}
          <circle cx="9" cy="8" r="1.5" strokeWidth="0.8" fill={color} />
          <circle cx="21" cy="9" r="1.25" strokeWidth="0.8" fill={color} />
          <circle cx="58" cy="84" r="1.75" strokeWidth="0.8" fill={color} />
          <circle cx="48" cy="78" r="1.25" strokeWidth="0.8" fill={color} />
        </g>
      </svg>
    </div>
  );
};
