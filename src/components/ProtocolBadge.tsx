import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';

interface ProtocolBadgeProps {
  name: string;
  cn: string;
  tag: string;
  color: string;
  bg?: string;
  delayFrames?: number;
  isScanning?: boolean;
}

export const ProtocolBadge: React.FC<ProtocolBadgeProps> = ({
  name,
  cn,
  tag,
  color,
  bg = '#ffffff',
  delayFrames = 0,
  isScanning = false,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const scale = spring({
    frame: frame - delayFrames,
    fps,
    config: {
      damping: 14,
      stiffness: 140,
      mass: 0.6,
    },
  });

  const opacity = interpolate(
    frame - delayFrames,
    [0, 12],
    [0, 1],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
  );

  if (frame < delayFrames) return null;

  return (
    <div
      className="relative flex flex-col justify-center px-3 py-1.5 rounded-xl border transition-all select-none overflow-hidden"
      style={{
        height: 56,
        backgroundColor: isScanning ? '#eff6ff' : bg,
        borderColor: isScanning ? '#2563eb' : '#e2e8f0',
        borderWidth: isScanning ? 2 : 1,
        transform: `scale(${scale})`,
        opacity,
        boxShadow: isScanning
          ? '0 8px 20px -3px rgba(37, 99, 235, 0.22)'
          : '0 2px 8px -1px rgba(0, 0, 0, 0.04)',
      }}
    >
      {/* 左侧彩色品牌细线 */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl"
        style={{backgroundColor: color}}
      />

      {/* 第一行：代号 + 标签 + 内置标记 */}
      <div className="flex items-center justify-between pl-1">
        <div className="flex items-center gap-1.5 truncate">
          <span className="font-mono font-bold text-xs text-slate-800 tracking-tight">
            {name}
          </span>
          <span
            className="text-[9px] font-mono px-1 py-0.2 rounded font-semibold truncate"
            style={{color, backgroundColor: `${color}15`}}
          >
            {tag}
          </span>
        </div>
        <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-1 py-0.2 rounded border border-emerald-200 shrink-0">
          ✓ 内置
        </span>
      </div>

      {/* 第二行：中文全称 */}
      <div className="text-[10.5px] font-medium text-slate-600 pl-1 mt-0.5 truncate">
        {cn}
      </div>
    </div>
  );
};
