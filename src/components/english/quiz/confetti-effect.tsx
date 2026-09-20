"use client";

import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  rotation: number;
  speedY: number;
  speedX: number;
}

const COLORS = ["#f59e0b", "#ec4899", "#8b5cf6", "#10b981", "#3b82f6", "#ef4444"];

function createParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100, // % width
    y: -10 - Math.random() * 20, // % height
    size: Math.random() * 8 + 6,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    rotation: Math.random() * 360,
    speedY: Math.random() * 2 + 1.5,
    speedX: (Math.random() - 0.5) * 1.5,
  }));
}

export function ConfettiEffect({ active = true, count = 40 }: { active?: boolean; count?: number }) {
  const [particles, setParticles] = useState<Particle[]>(() => (active ? createParticles(count) : []));

  useEffect(() => {
    if (!active) return;

    const timer = setTimeout(() => {
      setParticles(createParticles(count));
    }, 0);

    const interval = setInterval(() => {
      setParticles((prev) =>
        prev.map((p) => ({
          ...p,
          y: p.y + p.speedY,
          x: p.x + p.speedX,
          rotation: p.rotation + 5,
        }))
      );
    }, 30);

    const timeout = setTimeout(() => {
      clearInterval(interval);
    }, 2500);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [active, count]);

  if (!active || particles.length === 0) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-xs shadow-xs"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size * 1.4}px`,
            backgroundColor: p.color,
            transform: `rotate(${p.rotation}deg)`,
            opacity: p.y > 85 ? Math.max(0, (100 - p.y) / 15) : 1,
          }}
        />
      ))}
    </div>
  );
}
