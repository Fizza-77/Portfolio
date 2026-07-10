const COLUMN_ANIMATIONS = [
  { delay: -2.5, duration: 3 },
  { delay: -3.2, duration: 4 },
  { delay: -1.8, duration: 2.5 },
  { delay: -2.9, duration: 3.5 },
  { delay: -1.5, duration: 3 },
  { delay: -3.8, duration: 4.5 },
  { delay: -2.1, duration: 2.8 },
  { delay: -2.7, duration: 3.2 },
  { delay: -3.4, duration: 3.8 },
  { delay: -1.9, duration: 2.7 },
  { delay: -3.6, duration: 4.2 },
  { delay: -2.3, duration: 3.1 },
  { delay: -3.1, duration: 3.6 },
  { delay: -2.6, duration: 2.9 },
  { delay: -3.7, duration: 4.1 },
  { delay: -2.8, duration: 3.3 },
  { delay: -3.3, duration: 3.7 },
  { delay: -2.2, duration: 2.6 },
  { delay: -3.9, duration: 4.3 },
  { delay: -2.4, duration: 3.4 },
  { delay: -1.7, duration: 2.4 },
  { delay: -3.5, duration: 3.9 },
  { delay: -2, duration: 3 },
  { delay: -4, duration: 4.4 },
  { delay: -1.6, duration: 2.3 },
  { delay: -3, duration: 3.5 },
  { delay: -3.8, duration: 4 },
  { delay: -2.5, duration: 2.8 },
  { delay: -3.2, duration: 3.6 },
  { delay: -2.7, duration: 3.2 },
  { delay: -1.8, duration: 2.7 },
  { delay: -3.6, duration: 4.1 },
  { delay: -2.1, duration: 3.1 },
  { delay: -3.4, duration: 3.7 },
  { delay: -2.8, duration: 2.9 },
  { delay: -3.7, duration: 4.2 },
  { delay: -2.3, duration: 3.3 },
  { delay: -1.9, duration: 2.5 },
  { delay: -3.5, duration: 3.8 },
  { delay: -2.6, duration: 3.4 },
] as const;

export default function MatrixBackground() {
  return (
    <div className="matrix-container" aria-hidden>
      {Array.from({ length: 5 }).map((_, patternIndex) => (
        <div key={patternIndex} className="matrix-pattern">
          {COLUMN_ANIMATIONS.map((column, columnIndex) => (
            <div
              key={columnIndex}
              className="matrix-column"
              style={{
                left: `${columnIndex * 25}px`,
                animationDelay: `${column.delay}s`,
                animationDuration: `${column.duration}s`,
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
