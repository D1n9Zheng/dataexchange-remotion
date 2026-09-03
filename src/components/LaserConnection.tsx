import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';

interface LaserConnectionProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  curvature?: number;
  startFrame?: number;
  failAtFrame?: number;
  color?: string;
}

export const LaserConnection: React.FC<LaserConnectionProps> = ({
  x1,
  y1,
  x2,
  y2,
  curvature = 0.2,
  startFrame = 60,
  failAtFrame = 300,
  color = '#3b82f6',
}) => {
  const frame = useCurrentFrame();

  if (frame < startFrame) return null;

  const isFailed = frame >= failAtFrame;
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;

  // 故障时微颤
  const jitterX = isFailed ? Math.sin(frame * 1.2) * 5 : 0;
  const jitterY = isFailed ? Math.cos(frame * 1.2) * 5 : 0;

  const cx = midX - dy * curvature + jitterX;
  const cy = midY + dx * curvature + jitterY;

  const pathD = `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`;

  // 粒子流动进度 (0 ~ 1)
  const particleProgress = ((frame - startFrame) * 0.02) % 1.0;
  // 二次贝塞尔点计算
  const t = particleProgress;
  const oneMinusT = 1 - t;
  const px = oneMinusT * oneMinusT * x1 + 2 * oneMinusT * t * cx + t * t * x2;
  const py = oneMinusT * oneMinusT * y1 + 2 * oneMinusT * t * cy + t * t * y2;

  const lineAlpha = interpolate(
    frame - startFrame,
    [0, 20],
    [0, 1],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
  );

  return (
    <g style={{opacity: lineAlpha}}>
      <path
        d={pathD}
        fill="none"
        stroke={isFailed ? '#dc2626' : '#94a3b8'}
        strokeWidth={isFailed ? 3 : 1.8}
        strokeDasharray={isFailed ? '8 6' : undefined}
        strokeOpacity={isFailed ? 0.85 + Math.sin(frame * 0.5) * 0.15 : 0.45}
      />
      {/* 传输中的光粒子 */}
      {!isFailed && (
        <circle
          cx={px}
          cy={py}
          r={4.5}
          fill={color}
          filter="drop-shadow(0 0 6px rgba(37,99,235,0.8))"
        />
      )}
      {isFailed && (
        <circle
          cx={px}
          cy={py}
          r={5.5}
          fill="#dc2626"
          filter="drop-shadow(0 0 8px rgba(220,38,38,0.9))"
        />
      )}
    </g>
  );
};
