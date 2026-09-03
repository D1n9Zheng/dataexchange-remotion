import React from 'react';
import {AbsoluteFill} from 'remotion';

interface LightBackgroundProps {
  glowIntensity?: number;
}

export const LightBackground: React.FC<LightBackgroundProps> = ({
  glowIntensity = 1.0,
}) => {
  return (
    <AbsoluteFill className="bg-[#fbfbfd] overflow-hidden select-none pointer-events-none">
      {/* 苹果 Studio 陶瓷演播室柔光漫反射底色 */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 35%, #ffffff 0%, #fbfbfd 45%, #f5f5f7 85%, #ececee 100%)',
        }}
      />

      {/* 顶部柔和天光 (Soft Key Light) */}
      <div
        className="absolute top-0 inset-x-0 h-[400px]"
        style={{
          background:
            'linear-gradient(180deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 100%)',
        }}
      />

      {/* 核心微光晕 (极度克制的微米级环境漫射光，无网格杂质) */}
      <div
        className="absolute rounded-full filter blur-[140px] pointer-events-none"
        style={{
          width: 1000,
          height: 650,
          left: '50%',
          top: '42%',
          transform: 'translate(-50%, -50%)',
          background: `radial-gradient(circle, rgba(0, 113, 227, ${0.07 * glowIntensity}) 0%, rgba(99, 102, 241, ${0.03 * glowIntensity}) 50%, transparent 80%)`,
        }}
      />
    </AbsoluteFill>
  );
};
