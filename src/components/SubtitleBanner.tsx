import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';

interface SubtitleBannerProps {
  text: string;
  startFrame?: number;
  bottomPx?: number;
}

export const SubtitleBanner: React.FC<SubtitleBannerProps> = ({
  text,
  startFrame = 0,
  bottomPx = 26,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // 苹果黄金阻尼弹簧入场
  const translateY = spring({
    frame: frame - startFrame,
    fps,
    config: {
      damping: 22,
      stiffness: 125,
      mass: 0.8,
    },
  });

  const opacity = interpolate(
    frame - startFrame,
    [0, 18],
    [0, 1],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
  );

  return (
    <div
      className="absolute inset-x-0 flex justify-center pointer-events-none px-16 select-none z-40"
      style={{
        bottom: bottomPx,
        opacity,
        transform: `translateY(${interpolate(translateY, [0, 1], [16, 0])}px)`,
      }}
    >
      <div
        className="max-w-4xl px-7 py-3 rounded-full text-center text-[#1d1d1f] font-semibold text-[13.5px] leading-relaxed tracking-[-0.015em]"
        style={{
          background: 'rgba(255, 255, 255, 0.82)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(0, 0, 0, 0.08)',
          boxShadow:
            '0 12px 32px -4px rgba(0, 0, 0, 0.06), 0 2px 6px rgba(0, 0, 0, 0.02), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
        }}
      >
        {text}
      </div>
    </div>
  );
};
