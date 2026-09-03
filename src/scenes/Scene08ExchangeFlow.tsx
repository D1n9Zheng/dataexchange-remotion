import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';
import {LightBackground} from '../components/LightBackground';
import {SubtitleBanner} from '../components/SubtitleBanner';
import {PRODUCT_NAME} from '../content/demo';

export const Scene08ExchangeFlow: React.FC = () => {
  const frame = useCurrentFrame();

  // =========================================================================
  // 苹果电影级三幕式运镜系统 (Apple Keynote Camera System)
  // =========================================================================
  const cameraScale = interpolate(
    frame,
    [0, 100, 260, 420, 540],
    [1.0, 1.04, 1.07, 1.03, 1.0],
    {
      easing: Easing.bezier(0.16, 1, 0.3, 1),
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  const cameraX = interpolate(
    frame,
    [0, 90, 240, 370, 500],
    [12, 18, 0, -15, 0],
    {
      easing: Easing.bezier(0.2, 0.8, 0.2, 1),
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  const cameraY = Math.sin(frame * 0.03) * 2;

  // =========================================================================
  // 数据报文流转轨迹
  // =========================================================================
  const cycleFrame = frame % 180;
  const progress = interpolate(cycleFrame, [10, 165], [0, 1], {
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const packetX = interpolate(
    progress,
    [0, 0.2, 0.5, 0.8, 1],
    [310, 600, 960, 1320, 1610]
  );

  const activeStage =
    progress < 0.2
      ? -1
      : progress < 0.32
      ? 0
      : progress < 0.44
      ? 1
      : progress < 0.56
      ? 2
      : progress < 0.68
      ? 3
      : progress < 0.8
      ? 4
      : 5;

  const isTransformed = progress >= 0.5;
  const isMorphing = progress > 0.46 && progress < 0.54;

  const stages = [
    {num: '01', name: '接收', icon: '📥', color: '#0071e3'},
    {num: '02', name: '解析', icon: '⚙️', color: '#0071e3'},
    {num: '03', name: '映射', icon: '🧠', color: '#6366f1'},
    {num: '04', name: '转换', icon: '🔄', color: '#00ba68'},
    {num: '05', name: '投递', icon: '🚀', color: '#00ba68'},
  ];

  return (
    <AbsoluteFill className="overflow-hidden bg-[#fbfbfd] font-sans select-none">
      <LightBackground glowIntensity={1.25} />

      {/* 虚拟摄影机容器 */}
      <div
        className="w-full h-full relative"
        style={{
          transform: `translate3d(${cameraX}px, ${cameraY}px, 0) scale(${cameraScale})`,
          transformOrigin: '50% 50%',
          willChange: 'transform',
        }}
      >
        {/* 极简贯穿式光纤导轨 */}
        <svg className="absolute inset-0 h-full w-full pointer-events-none">
          <defs>
            <linearGradient id="streamRail" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#818cf8" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#34d399" stopOpacity="0.8" />
            </linearGradient>
          </defs>

          <line
            x1="310"
            y1="500"
            x2="1610"
            y2="500"
            stroke="#e5e5ea"
            strokeWidth={8}
            strokeLinecap="round"
          />
          <line
            x1="310"
            y1="500"
            x2="1610"
            y2="500"
            stroke="url(#streamRail)"
            strokeWidth={2.5}
            strokeLinecap="round"
          />
        </svg>

        {/* 蜕变瞬间的量子光晕爆破 */}
        {isMorphing && (
          <div
            className="absolute left-1/2 top-[500px] pointer-events-none z-20 rounded-full"
            style={{
              width: 320,
              height: 320,
              background:
                'radial-gradient(circle, rgba(99, 102, 241, 0.35) 0%, rgba(56, 189, 248, 0.15) 50%, transparent 70%)',
              filter: 'blur(16px)',
              transform: 'translate(-50%, -50%)',
            }}
          />
        )}

        {/* 1. 左侧：源端系统 (供应商 ERP · 苹果陶瓷卡片) */}
        <div
          className="absolute top-[500px] -translate-y-1/2 flex items-center gap-4 px-6 py-5 rounded-[28px] select-none"
          style={{
            left: 140,
            width: 270,
            height: 110,
            background: 'rgba(255, 255, 255, 0.92)',
            backdropFilter: 'blur(24px)',
            border: '1px solid rgba(0, 0, 0, 0.06)',
            boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.02)',
          }}
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#f5f5f7] text-2xl border border-black/[0.04]">
            🏢
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-extrabold text-[#1d1d1f] tracking-tight">供应商 ERP</span>
              <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
            </div>
            <span className="mt-1.5 inline-block rounded-full bg-[#f5f5f7] px-3 py-0.5 font-mono text-[10px] font-bold text-[#86868b] border border-black/[0.04]">
              EDIFACT ORDERS
            </span>
          </div>
        </div>

        {/* 2. 中央：极简 B2B 交换中枢 (苹果级流式处理舱) */}
        <div
          className="absolute left-1/2 top-[500px] -translate-x-1/2 -translate-y-1/2 rounded-[36px] p-7 z-10 select-none"
          style={{
            width: 780,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(30px)',
            border: '1px solid rgba(0, 113, 227, 0.25)',
            boxShadow:
              '0 30px 60px -15px rgba(0, 113, 227, 0.15), 0 2px 8px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255, 255, 255, 1)',
          }}
        >
          {/* 顶部极简标题条 */}
          <div className="flex items-center justify-between border-b border-black/[0.05] pb-4">
            <div className="flex items-center gap-2.5">
              <span className="text-xl">⚡</span>
              <span className="text-base font-extrabold text-[#1d1d1f] tracking-tight">
                {PRODUCT_NAME} · 流式交换中枢
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-blue-50 px-3 py-1 font-mono text-[10.5px] font-bold text-blue-700 border border-blue-100">
                毫秒级流式处理 · 1.2ms
              </span>
              <span className="flex items-center gap-1.5 font-mono text-[10.5px] font-bold text-emerald-600">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
                100% 投递成功
              </span>
            </div>
          </div>

          {/* 5 大极简工位 */}
          <div className="mt-5 grid grid-cols-5 gap-3.5">
            {stages.map((stage, idx) => {
              const isCurrent = activeStage === idx;
              const isPassed = activeStage > idx;

              return (
                <div
                  key={stage.num}
                  className="relative flex flex-col items-center justify-center rounded-2xl py-4 transition-all duration-200"
                  style={{
                    height: 94,
                    border: isCurrent
                      ? `1.5px solid ${stage.color}`
                      : '1px solid rgba(0, 0, 0, 0.06)',
                    backgroundColor: isCurrent
                      ? '#eff6ff'
                      : isPassed
                      ? '#fbfbfd'
                      : '#ffffff',
                    boxShadow: isCurrent ? `0 8px 20px -4px ${stage.color}35` : undefined,
                    transform: isCurrent ? 'translateY(-2px)' : 'none',
                  }}
                >
                  <div className="flex items-center gap-1.5">
                    <span className="text-xl">{stage.icon}</span>
                    <span className="font-mono text-[10px] font-bold text-[#86868b]">
                      {stage.num}
                    </span>
                  </div>
                  <div
                    className="mt-1.5 text-xs font-bold tracking-tight"
                    style={{color: isCurrent ? stage.color : '#1d1d1f'}}
                  >
                    {stage.name}
                  </div>

                  {isCurrent && (
                    <div
                      className="absolute bottom-0 inset-x-3 h-1 rounded-full animate-pulse"
                      style={{backgroundColor: stage.color}}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. 右侧：目标端系统 (采购企业 WMS · 苹果陶瓷卡片) */}
        <div
          className="absolute top-[500px] -translate-y-1/2 flex items-center gap-4 px-6 py-5 rounded-[28px] select-none"
          style={{
            right: 140,
            width: 270,
            height: 110,
            background: 'rgba(255, 255, 255, 0.92)',
            backdropFilter: 'blur(24px)',
            border: '1px solid rgba(0, 0, 0, 0.06)',
            boxShadow:
              progress > 0.95
                ? '0 0 35px rgba(0, 186, 104, 0.35)'
                : '0 20px 40px -10px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.02)',
          }}
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#f5f5f7] text-2xl border border-black/[0.04]">
            📦
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-extrabold text-[#1d1d1f] tracking-tight">采购企业 WMS</span>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse" />
            </div>
            <span className="mt-1.5 inline-block rounded-full bg-[#f5f5f7] px-3 py-0.5 font-mono text-[10px] font-bold text-[#86868b] border border-black/[0.04]">
              REST / JSON
            </span>
          </div>
        </div>

        {/* 4. 流动中的极简科技胶囊 */}
        {progress > 0.04 && progress < 0.98 && (
          <div
            className="absolute z-30 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 rounded-full px-4 py-2 select-none transition-transform"
            style={{
              left: packetX,
              top: 500,
              background: '#ffffff',
              border: `1.5px solid ${isTransformed ? '#00ba68' : '#0071e3'}`,
              boxShadow: isTransformed
                ? '0 10px 25px rgba(0, 186, 104, 0.25)'
                : '0 10px 25px rgba(0, 113, 227, 0.25)',
              transform: `translate(-50%, -50%) scale(${isMorphing ? 1.15 : 1})`,
            }}
          >
            <span
              className="h-2 w-2 rounded-full"
              style={{backgroundColor: isTransformed ? '#00ba68' : '#0071e3'}}
            />
            <span
              className="font-mono text-[10.5px] font-black tracking-wider uppercase"
              style={{color: isTransformed ? '#00ba68' : '#0071e3'}}
            >
              {isTransformed ? 'JSON 标准报文' : 'EDIFACT 原始报文'}
            </span>
          </div>
        )}
      </div>

      {/* 固定 HUD 底部字幕条 */}
      <SubtitleBanner
        text="高性能数据面流式驱动！毫秒级吞吐流转，支持异常智能拦截与断点重试，保障数据零丢失。"
        startFrame={20}
        bottomPx={26}
      />
    </AbsoluteFill>
  );
};
