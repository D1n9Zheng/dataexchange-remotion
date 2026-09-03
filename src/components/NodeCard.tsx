import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';

interface NodeCardProps {
  label: string;
  format: string;
  sub: string;
  icon: string;
  color: string;
  x: number; // px
  y: number; // px
  entryDelayFrames?: number;
  isAlert?: boolean;
}

export const NodeCard: React.FC<NodeCardProps> = ({
  label,
  format,
  sub,
  icon,
  color,
  x,
  y,
  entryDelayFrames = 0,
  isAlert = false,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // 弹簧物理入场
  const scale = spring({
    frame: frame - entryDelayFrames,
    fps,
    config: {
      damping: 14,
      stiffness: 120,
      mass: 0.8,
    },
  });

  const opacity = interpolate(
    frame - entryDelayFrames,
    [0, 15],
    [0, 1],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
  );

  // 告警状态抖动
  const shakeX = isAlert ? Math.sin(frame * 0.8) * 3 : 0;
  const shakeY = isAlert ? Math.cos(frame * 0.8) * 2 : 0;

  if (frame < entryDelayFrames) {
    return null;
  }

  return (
    <div
      className="absolute flex items-center bg-white rounded-2xl border transition-all select-none"
      style={{
        left: x + shakeX,
        top: y + shakeY,
        width: 200,
        height: 80,
        transform: `translate(-50%, -50%) scale(${scale})`,
        opacity,
        borderColor: isAlert ? '#dc2626' : '#e2e8f0',
        borderWidth: isAlert ? 2.5 : 1.5,
        boxShadow: isAlert
          ? '0 12px 30px -4px rgba(220, 38, 38, 0.35)'
          : '0 10px 25px -4px rgba(0, 0, 0, 0.06), 0 4px 10px -2px rgba(0, 0, 0, 0.03)',
      }}
    >
      {/* 左侧彩色品牌竖条 */}
      <div
        className="w-2 h-full rounded-l-2xl"
        style={{
          backgroundColor: isAlert ? '#dc2626' : color,
        }}
      />

      {/* 卡片主体 */}
      <div className="flex-1 px-3.5 py-2 flex flex-col justify-center overflow-hidden">
        <div className="flex items-center gap-2">
          <span className="text-xl leading-none">{icon}</span>
          <span className="font-bold text-slate-800 text-sm tracking-tight truncate">
            {label}
          </span>
        </div>
        <div
          className="text-xs font-mono font-bold mt-1 tracking-tight truncate"
          style={{color: isAlert ? '#dc2626' : color}}
        >
          {format}
        </div>
        <div className="text-[11px] font-mono text-slate-400 mt-0.5 truncate">
          {sub}
        </div>
      </div>
    </div>
  );
};
