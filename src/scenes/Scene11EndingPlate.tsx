import React from 'react';
import {AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {LightBackground} from '../components/LightBackground';
import {SubtitleBanner} from '../components/SubtitleBanner';
import {PRODUCT_NAME} from '../content/demo';

export const Scene11EndingPlate: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // 镜头入场缩放 (Apple 黄金阻尼微推)
  const plateScale = spring({
    frame,
    fps,
    config: {damping: 22, stiffness: 110, mass: 0.85},
  });

  // 渐入透明度
  const contentOpacity = interpolate(frame, [0, 20], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // =========================================================================
  // 矢量箭头光标移动与点击动效
  // =========================================================================
  // 1. 第 50 ~ 135 帧：箭头光标从右下角顺滑滑行至“立即试用”按钮中心
  const cursorMove = interpolate(frame, [50, 135], [0, 1], {
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const cursorX = interpolate(cursorMove, [0, 1], [1260, 960]);
  const cursorY = interpolate(cursorMove, [0, 1], [840, 665]);

  // 鼠标透明度 (第 45 帧渐显)
  const cursorOpacity = interpolate(frame, [45, 60], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 2. 第 150 ~ 170 帧：点击受击动作 (Click Press & Rebound)
  const cursorClickScale = interpolate(
    frame,
    [150, 158, 172],
    [1.0, 0.82, 1.0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  // 按钮受击下沉与回弹
  const isClicked = frame >= 158;
  const btnScale = interpolate(
    frame,
    [150, 158, 170, 185],
    [1.0, 0.93, 1.04, 1.0],
    {
      easing: Easing.bezier(0.16, 1, 0.3, 1),
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  // 点击时扩散的光斑与波纹 (Ripple)
  const rippleProgress = interpolate(frame, [158, 195], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const rippleOpacity = interpolate(rippleProgress, [0, 0.2, 1], [0, 0.8, 0]);
  const rippleScale = interpolate(rippleProgress, [0, 1], [0.3, 2.4]);

  // CTA 呼吸微光
  const ctaGlow = isClicked
    ? 0.75
    : 0.38 + Math.sin(frame * 0.08) * 0.22;

  return (
    <AbsoluteFill className="overflow-hidden bg-[#fbfbfd] font-sans select-none">
      <LightBackground glowIntensity={1.35} />

      {/* 极简演播室背景微光流线 */}
      <svg className="absolute inset-0 h-full w-full pointer-events-none opacity-40">
        <path
          d="M -100 480 C 400 300, 600 660, 960 480 C 1320 300, 1600 660, 2060 480"
          fill="none"
          stroke="#0071e3"
          strokeWidth={1.5}
          strokeDasharray="4 8"
        />
      </svg>

      {/* ======================================================================= */}
      {/* 核心定板区域：放大、去杂后的纯粹主视觉 (居中展示) */}
      {/* ======================================================================= */}
      <div
        className="absolute left-1/2 top-[50%] z-20 flex flex-col items-center justify-center -translate-x-1/2 -translate-y-1/2 text-center"
        style={{
          transform: `translate(-50%, -50%) scale(${plateScale})`,
          opacity: contentOpacity,
        }}
      >
        {/* 1. 放大后的主标题 (纯粹有力的品牌名) */}
        <h1 className="text-[68px] font-black tracking-[-0.035em] text-[#1d1d1f] leading-none">
          {PRODUCT_NAME}
        </h1>

        {/* 2. 放大后的核心价值主张 Slogan */}
        <p className="mt-6 text-[28px] font-extrabold tracking-tight text-[#1d1d1f]">
          让异构系统无缝对话 · 让企业数据自由流动
        </p>

        {/* 3. 放大后的 4 大核心优势标签 */}
        <div className="mt-8 flex items-center gap-3.5">
          {['全主流协议覆盖', 'AI 辅助语义映射', '毫秒级流式吞吐', '数据安全与审计'].map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-white px-5 py-2.5 text-[14px] font-bold text-[#1d1d1f] border border-black/[0.08] shadow-sm"
            >
              ✓ {tag}
            </span>
          ))}
        </div>

        {/* 4. 放大后的单一主按钮：立即试用 (带拟真受击与光晕反馈) */}
        <div className="mt-11 relative flex items-center justify-center">
          {/* 点击扩散光晕涟漪 */}
          {frame >= 158 && (
            <div
              className="absolute pointer-events-none rounded-full"
              style={{
                width: 280,
                height: 80,
                borderRadius: 9999,
                background: 'rgba(0, 113, 227, 0.45)',
                filter: 'blur(12px)',
                transform: `scale(${rippleScale})`,
                opacity: rippleOpacity,
              }}
            />
          )}

          <div
            className="relative flex items-center justify-center gap-3.5 rounded-2xl px-16 py-5 select-none cursor-pointer transition-all"
            style={{
              backgroundColor: '#0071e3',
              transform: `scale(${btnScale})`,
              boxShadow: isClicked
                ? '0 18px 45px -4px rgba(0, 113, 227, 0.6), inset 0 1px 1px rgba(255,255,255,0.4)'
                : `0 14px 36px -6px rgba(0, 113, 227, ${ctaGlow})`,
            }}
          >
            <span className="text-[21px] font-extrabold text-white tracking-tight">
              {isClicked ? '立即试用 ✓' : '立即试用'}
            </span>
            <span className="text-base text-white/90">→</span>
          </div>
        </div>
      </div>

      {/* 蓝白极简矢量箭头光标 */}
      <div
        className="absolute pointer-events-none z-50 select-none"
        style={{
          left: cursorX,
          top: cursorY,
          opacity: cursorOpacity,
          transform: `translate(-4px, -4px) scale(${cursorClickScale})`,
          transformOrigin: '4px 4px',
          willChange: 'transform, left, top',
        }}
      >
        <svg
          width="46"
          height="52"
          viewBox="0 0 30 36"
          style={{
            filter: 'drop-shadow(0 8px 16px rgba(29, 29, 31, 0.22))',
          }}
          aria-hidden="true"
        >
          <path
            d="M4 3.5v25.2l6.5-6.2 5.2 10.5 5.6-2.8-5.2-10.1h9.2L4 3.5Z"
            fill="#ffffff"
            stroke="#1d1d1f"
            strokeWidth="2.1"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* 固定 HUD 底部字幕 */}
      <SubtitleBanner
        text="连接异构世界，赋能企业互联。开启敏捷、安全、高效的新一代数据交换之旅！"
        startFrame={15}
        bottomPx={26}
      />
    </AbsoluteFill>
  );
};
