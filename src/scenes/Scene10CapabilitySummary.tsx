import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {LightBackground} from '../components/LightBackground';

type CapabilityIconName = 'protocol' | 'mapping' | 'stream' | 'security' | 'monitoring';

const CapabilityIcon: React.FC<{
  name: CapabilityIconName;
  accent?: string;
  inverted?: boolean;
}> = ({name, accent = '#0071e3', inverted = false}) => (
  <span
    className="flex h-11 w-11 items-center justify-center rounded-[14px]"
    style={{
      color: inverted ? '#ffffff' : accent,
      background: inverted ? 'rgba(255,255,255,0.16)' : `${accent}12`,
      border: inverted ? '1px solid rgba(255,255,255,0.2)' : `1px solid ${accent}20`,
    }}
  >
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {name === 'protocol' && (
        <>
          <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.8" />
          <path d="M4 12h16M12 4c2.2 2.2 3.2 4.9 3.2 8S14.2 17.8 12 20M12 4C9.8 6.2 8.8 8.9 8.8 12s1 5.8 3.2 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </>
      )}
      {name === 'mapping' && (
        <>
          <rect x="3.5" y="5" width="6" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
          <rect x="14.5" y="14" width="6" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
          <path d="M9.5 7.5h3.2a3 3 0 0 1 3 3V14M13.1 11.5l2.6 2.6 2.6-2.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </>
      )}
      {name === 'stream' && (
        <>
          <path d="M3.5 7.5h11M3.5 12h15M3.5 16.5h11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="m15 5.5 3 2-3 2M18.5 14.5l2.5 2-2.5 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </>
      )}
      {name === 'security' && (
        <path d="M12 3.5 19 6v5.2c0 4.3-2.7 7.5-7 9.3-4.3-1.8-7-5-7-9.3V6l7-2.5Zm-3 8.3 2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      )}
      {name === 'monitoring' && (
        <>
          <path d="M4 19.5V14m5.3 5.5V10m5.4 9.5V6m5.3 13.5V11" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          <path d="m4 9 4-3 4 2 7-4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </>
      )}
    </svg>
  </span>
);

export const Scene10CapabilitySummary: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // 结尾收拢退出动效
  const exit = interpolate(frame, [330, 415], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill className="overflow-hidden bg-[#fbfbfd] font-sans select-none">
      <LightBackground glowIntensity={1.3} />

      {/* ======================================================================= */}
      {/* 苹果 iPad Keynote 级全景 Bento Grid 特性大画幅网格墙 (1640px × 690px 居中) */}
      {/* 彻底剔除顶部文字冗余，引入大胆的高级渐变色块、深空芯片色块与多色对比 */}
      {/* ======================================================================= */}
      <div
        className="absolute left-1/2 top-[47%] -translate-x-1/2 -translate-y-1/2 select-none"
        style={{
          width: 1640,
          height: 690,
          transform: `translate(-50%, -50%) scale(${1 - exit * 0.75})`,
          opacity: 1 - exit,
        }}
      >
        <div className="grid h-full grid-rows-2 gap-5">
          {/* =================================================================== */}
          {/* 上半行 (Row 1, 高度约 335px) */}
          {/* =================================================================== */}
          <div className="grid grid-cols-12 gap-5 h-full">
            {/* 1. 全主流协议库 (占 5 列 · 极简白晶高级卡片) */}
            <div
              className="col-span-5 rounded-[36px] p-8 flex flex-col justify-between"
              style={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(30px)',
                border: '1px solid rgba(0, 0, 0, 0.06)',
                boxShadow:
                  '0 20px 45px -10px rgba(0, 0, 0, 0.05), 0 2px 6px rgba(0, 0, 0, 0.02)',
                transform: `scale(${spring({frame: frame - 8, fps, config: {damping: 20, stiffness: 120}})})`,
              }}
            >
              <div>
                <div className="flex items-center justify-between">
                  <CapabilityIcon name="protocol" />
                  <span className="rounded-full bg-blue-50 px-4 py-1.5 text-[15px] font-semibold text-[#0071e3] border border-blue-100">
                    协议接入
                  </span>
                </div>
                <div className="mt-5 text-[30px] font-bold text-[#1d1d1f] tracking-tight">
                  多协议与多格式接入
                </div>
                <div className="mt-2 text-[18px] font-medium text-[#6e6e73]">
                  主流交换标准统一接入
                </div>
              </div>

              <div>
                <div className="mt-4 space-y-2.5">
                  <div className="flex items-center gap-2">
                    <span className="w-[72px] text-[15px] font-semibold text-[#6e6e73]">数据标准</span>
                    {['EDIFACT', 'X12', 'JSON / XML'].map((tag) => (
                      <span key={tag} className="rounded-full bg-[#f5f5f7] px-3.5 py-1.5 text-[15px] font-semibold text-[#1d1d1f] border border-black/[0.04]">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-[72px] text-[15px] font-semibold text-[#6e6e73]">接入方式</span>
                    {['REST API', 'SFTP'].map((tag) => (
                      <span key={tag} className="rounded-full bg-blue-50 px-3.5 py-1.5 text-[15px] font-semibold text-[#0071e3] border border-blue-100">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 2. 大模型 AI 语义映射 (占 7 列 · 苹果经典高饱和渐变旗舰色块！参考 iPadOS 色块) */}
            <div
              className="col-span-7 rounded-[36px] p-9 flex items-center justify-between text-white relative overflow-hidden"
              style={{
                background:
                  'linear-gradient(135deg, #4338ca 0%, #6366f1 35%, #9333ea 70%, #db2777 100%)',
                boxShadow:
                  '0 25px 55px -12px rgba(99, 102, 241, 0.45), inset 0 1px 1px rgba(255, 255, 255, 0.3)',
                transform: `scale(${spring({frame: frame - 28, fps, config: {damping: 20, stiffness: 120}})})`,
              }}
            >
              {/* 背景微光粒子与光斑 */}
              <div
                className="absolute -right-16 -top-16 w-80 h-80 rounded-full pointer-events-none"
                style={{
                  background: 'radial-gradient(circle, rgba(255,255,255,0.22) 0%, transparent 70%)',
                  filter: 'blur(20px)',
                }}
              />

              <div className="relative z-10 max-w-lg">
                <div className="flex items-center gap-2.5">
                  <CapabilityIcon name="mapping" inverted />
                  <span className="rounded-full bg-white/20 px-4 py-1.5 text-[15px] font-semibold text-white border border-white/30 backdrop-blur-md">
                    AI 映射
                  </span>
                </div>

                <div className="mt-5 text-[34px] font-bold tracking-tight text-white leading-tight">
                  AI 辅助语义映射
                </div>
                <div className="mt-2 text-[18px] font-medium text-white/85 leading-relaxed">
                  智能推荐字段关系，保留人工审核
                </div>

                {/* 语义对齐展示胶囊 */}
                <div className="mt-5 flex items-center gap-3 text-[16px] font-semibold">
                  <span className="rounded-xl bg-white/15 px-4 py-2 border border-white/20">
                    ORDERS.QTY
                  </span>
                  <span className="text-white/70">→</span>
                  <span className="rounded-xl bg-white/25 px-4 py-2 border border-white/30 text-white">
                    wms.quantity
                  </span>
                  <span className="ml-1 text-white/90 text-[16px] font-semibold">
                    ✓ 建议可审核
                  </span>
                </div>
              </div>

              {/* 单一结果词，避免未经验证的营销数字 */}
              <div className="relative z-10 text-right shrink-0">
                <div className="text-[44px] font-bold tracking-[-0.03em] leading-none text-white drop-shadow-md">
                  智能推荐
                </div>
                <div className="mt-3 text-[18px] font-medium text-white/85">
                  映射关系清晰可控
                </div>
              </div>
            </div>
          </div>

          {/* =================================================================== */}
          {/* 下半行 (Row 2, 高度约 335px · 三列并排高对比色块) */}
          {/* =================================================================== */}
          <div className="grid grid-cols-3 gap-5 h-full">
            {/* 3. 毫秒流式数据面 (深空芯片质感色块 · 参考 A12 Bionic 芯片色块) */}
            <div
              className="rounded-[36px] p-8 flex flex-col justify-between text-white relative overflow-hidden"
              style={{
                background:
                  'linear-gradient(145deg, #090d16 0%, #111827 60%, #1e293b 100%)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow:
                  '0 20px 45px -10px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
                transform: `scale(${spring({frame: frame - 48, fps, config: {damping: 20, stiffness: 120}})})`,
              }}
            >
              <div className="flex items-center justify-between">
                <CapabilityIcon name="stream" accent="#34d399" inverted />
                <span className="rounded-full bg-emerald-500/15 px-4 py-1.5 text-[15px] font-semibold text-emerald-300 border border-emerald-500/30">
                  流式交换
                </span>
              </div>

              <div className="my-auto">
                <div className="text-[44px] font-bold tracking-[-0.03em] leading-none text-emerald-300">
                  稳定传输
                </div>
                <div className="mt-4 text-[26px] font-bold text-white tracking-tight">
                  流式数据交换
                </div>
                <div className="mt-2 text-[18px] text-slate-300 font-medium">
                  断点续传 · 可靠投递
                </div>
              </div>

              <div className="flex items-center gap-2 text-[16px] font-medium text-emerald-300">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
                <span>链路状态可追踪</span>
              </div>
            </div>

            {/* 4. 多租户安全隔离与治理 (温暖琥珀色块 · 参考 10 hours / Security 标识) */}
            <div
              className="rounded-[36px] p-8 flex flex-col justify-between"
              style={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(30px)',
                border: '1px solid rgba(0, 0, 0, 0.06)',
                boxShadow:
                  '0 20px 45px -10px rgba(0, 0, 0, 0.05), 0 2px 6px rgba(0, 0, 0, 0.02)',
                transform: `scale(${spring({frame: frame - 68, fps, config: {damping: 20, stiffness: 120}})})`,
              }}
            >
              <div className="flex items-center justify-between">
                <CapabilityIcon name="security" accent="#d97706" />
                <span className="rounded-full bg-amber-50 px-4 py-1.5 text-[15px] font-semibold text-amber-700 border border-amber-200">
                  安全治理
                </span>
              </div>

              <div className="my-auto">
                <div className="text-[44px] font-bold tracking-[-0.03em] leading-none text-amber-600">
                  租户隔离
                </div>
                <div className="mt-4 text-[26px] font-bold text-[#1d1d1f] tracking-tight">
                  多租户权限与审计
                </div>
                <div className="mt-2 text-[18px] text-[#6e6e73] font-medium">
                  权限控制 · 操作留痕
                </div>
              </div>

              <div className="flex items-center gap-2 text-[16px] font-medium text-amber-700">
                <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                <span>治理过程可审计</span>
              </div>
            </div>

            {/* 5. 集中运行监控与态势感知 (活力冰蓝卡片 · 参考 LTE 信号 / 统计图表) */}
            <div
              className="rounded-[36px] p-8 flex flex-col justify-between"
              style={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(30px)',
                border: '1px solid rgba(0, 0, 0, 0.06)',
                boxShadow:
                  '0 20px 45px -10px rgba(0, 0, 0, 0.05), 0 2px 6px rgba(0, 0, 0, 0.02)',
                transform: `scale(${spring({frame: frame - 88, fps, config: {damping: 20, stiffness: 120}})})`,
              }}
            >
              <div className="flex items-center justify-between">
                <CapabilityIcon name="monitoring" accent="#0284c7" />
                <span className="rounded-full bg-sky-50 px-4 py-1.5 text-[15px] font-semibold text-sky-700 border border-sky-200">
                  运行监控
                </span>
              </div>

              <div className="my-auto">
                <div className="text-[44px] font-bold tracking-[-0.03em] leading-none text-sky-700">
                  全链路
                </div>
                <div className="mt-4 text-[26px] font-bold text-[#1d1d1f] tracking-tight">
                  任务运行与异常监控
                </div>
                <div className="mt-2 text-[18px] text-[#6e6e73] font-medium">
                  任务 · 日志 · 异常集中呈现
                </div>
              </div>

              {/* 信号柱状动效 */}
              <div className="flex items-center justify-between">
                <div className="flex items-end gap-1.5 h-6">
                  {[40, 65, 80, 100, 90].map((h, i) => (
                    <div
                      key={i}
                      className="w-2 rounded-t bg-gradient-to-t from-sky-600 to-blue-400"
                      style={{height: `${h}%`}}
                    />
                  ))}
                </div>
                <span className="text-[16px] font-medium text-sky-700">运行状态清晰可见</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </AbsoluteFill>
  );
};
