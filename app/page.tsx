'use client';

import { useEffect, useState } from 'react';

interface Dot {
  id: number;
  x: number;
  y: number;
  duration: number;
  key: number;
}

export default function Home() {
  const [dots, setDots] = useState<Dot[]>([]);

  useEffect(() => {
    // Generate initial dots
    const initialDots: Dot[] = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: 5 + Math.random() * 7, // 5-10 seconds random
      key: 0,
    }));
    setDots(initialDots);

    // Schedule each dot to update independently
    const timers: NodeJS.Timeout[] = [];

    const scheduleNextUpdate = (dotIndex: number, duration: number) => {
      const timer = setTimeout(() => {
        setDots((prevDots) => {
          const newDots = [...prevDots];
          const newDuration = 5 + Math.random() * 5;
          newDots[dotIndex] = {
            ...newDots[dotIndex],
            x: Math.random() * 100,
            y: Math.random() * 100,
            duration: newDuration,
            key: prevDots[dotIndex].key + 1, // Restart animation
          };
          return newDots;
        });

        // Schedule next update for this dot
        scheduleNextUpdate(dotIndex, 5 + Math.random() * 5);
      }, duration * 1000);

      timers.push(timer);
    };

    // Start scheduling for each dot
    initialDots.forEach((dot, index) => {
      scheduleNextUpdate(index, dot.duration);
    });

    return () => {
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <div className="min-h-screen w-full bg-black relative overflow-hidden">
      <style>{`
        @keyframes fadeInOut {
          0% {
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }
        
        .fade-dot {
          animation: fadeInOut var(--duration) ease-in-out forwards;
        }
      `}</style>

      {dots.map((dot) => (
        <div
          key={`${dot.id}-${dot.key}`}
          className="fade-dot fixed rounded-full bg-white pointer-events-none"
          style={{
            width: '2.4px',
            height: '2.4px',
            left: `${dot.x}%`,
            top: `${dot.y}%`,
            '--duration': `${dot.duration}s`,
          } as React.CSSProperties}
        />
      ))}

      {/* Scrollable sections */}
      <section className="min-h-screen w-full flex items-center justify-center">
        <h1 className="text-6xl font-bold text-white drop-shadow-lg">About Me</h1>
      </section>

      <section className="min-h-screen w-full flex items-center justify-center">
        <h1 className="text-6xl font-bold text-white drop-shadow-lg">Projects</h1>
      </section>

      <section className="min-h-screen w-full flex items-center justify-center">
        <h1 className="text-6xl font-bold text-white drop-shadow-lg">Experiences</h1>
      </section>

      <section className="min-h-screen w-full flex items-center justify-center">
        <h1 className="text-6xl font-bold text-white drop-shadow-lg">Writings</h1>
      </section>

      <section className="min-h-screen w-full flex items-center justify-center">
        <h1 className="text-6xl font-bold text-white drop-shadow-lg">Contact Me</h1>
      </section>
    </div>
  );
}
