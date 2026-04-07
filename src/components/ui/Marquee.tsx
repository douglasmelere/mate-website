interface MarqueeProps {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  children?: React.ReactNode;
  repeat?: number;
  duration?: string;
  gap?: string;
}

export function Marquee({
  className = "",
  reverse = false,
  pauseOnHover = false,
  children,
  repeat = 4,
  duration = "30s",
  gap = "1rem",
}: MarqueeProps) {
  return (
    <div
      className={`group flex overflow-hidden ${className}`}
      style={
        {
          "--marquee-duration": duration,
          "--marquee-gap": gap,
          gap,
        } as React.CSSProperties
      }
    >
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={[
              "flex shrink-0",
              reverse ? "animate-marquee-reverse" : "animate-marquee",
              pauseOnHover ? "group-hover:[animation-play-state:paused]" : "",
            ]
              .filter(Boolean)
              .join(" ")}
            style={{ gap }}
          >
            {children}
          </div>
        ))}
    </div>
  );
}
