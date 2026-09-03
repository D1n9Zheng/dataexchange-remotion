import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {LightBackground} from '../components/LightBackground';
import {ProductWindow} from '../components/ProductWindow';
import {SubtitleBanner} from '../components/SubtitleBanner';
import {WizardSteps} from '../components/WizardSteps';

const mappings = [
  {source: 'buyer.name', target: 'consigneeName', confidence: '96%'},
  {source: 'buyer.phone', target: 'contactPhone', confidence: '94%'},
  {source: 'buyer.address', target: 'deliveryAddress', confidence: '98%'},
  {source: 'lines[].sku', target: 'items[].productCode', confidence: '97%'},
  {source: 'lines[].quantity', target: 'items[].quantity', confidence: '99%'},
];

export const Scene06AiMapping: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const aiScale = spring({frame: frame - 40, fps, config: {damping: 14, stiffness: 100}});

  return (
    <AbsoluteFill className="overflow-hidden bg-[#f8fbff] font-sans">
      <LightBackground glowIntensity={1.28} />
      <ProductWindow
        title="AI 辅助字段映射"
        subtitle="大模型智能语义对齐，自动推导异构字段映射关系，提效 80% 以上"
        actionLabel="确认映射规则"
      >
        <WizardSteps activeStep={3} />
        <div className="relative mt-5 h-[550px] rounded-2xl border border-slate-200 bg-white p-6 shadow-sm overflow-hidden">
          <div className="absolute left-8 top-6 text-xs font-bold text-slate-700">源字段 · EDIFACT Canonical</div>
          <div className="absolute right-8 top-6 text-xs font-bold text-slate-700">目标字段 · WMS JSON</div>

          {/* 精准像素对齐的贝塞尔连线 SVG */}
          <svg className="absolute inset-0 h-full w-full pointer-events-none" viewBox="0 0 1414 550">
            {mappings.map((mapping, index) => {
              const reveal = interpolate(frame - index * 40, [70, 130], [0, 1], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              });

              // 卡片高度 72px + 间距 12px，严格中心对齐: 64 + 36 + index * 84 = 100 + index * 84
              const y = 100 + index * 84;
              const startX = 408;
              const endX = 1006;
              const pathD = `M ${startX} ${y} C 620 ${y}, 794 ${y}, ${endX} ${y}`;

              // 传输中的光粒子进度
              const particleT = ((frame * 0.025 + index * 0.2) % 1.0);
              const px = startX + (endX - startX) * particleT;

              return (
                <g key={mapping.source} style={{opacity: reveal}}>
                  {/* 背景底线 */}
                  <path
                    d={pathD}
                    fill="none"
                    stroke="#bfdbfe"
                    strokeWidth={2}
                    strokeDasharray="6 4"
                    opacity={0.6}
                  />
                  {/* 高亮连线 */}
                  <path
                    d={pathD}
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth={2.8}
                    strokeDasharray={`${reveal * 600} 600`}
                  />
                  {/* 两端连接锚点 */}
                  <circle cx={startX} cy={y} r={4} fill="#2563eb" />
                  <circle cx={endX} cy={y} r={4} fill="#059669" />

                  {/* 沿线流动的数据粒子 */}
                  {reveal >= 0.9 && (
                    <circle
                      cx={px}
                      cy={y}
                      r={4.5}
                      fill="#2563eb"
                      filter="drop-shadow(0 0 6px rgba(37,99,235,0.9))"
                    />
                  )}
                </g>
              );
            })}
          </svg>

          {/* 左侧源字段列表 (精确高度与间距) */}
          <div className="absolute left-7 top-16 w-[380px] space-y-3">
            {mappings.map((mapping, index) => (
              <Field key={mapping.source} text={mapping.source} index={index} frame={frame} tone="blue" />
            ))}
          </div>

          {/* 右侧目标字段列表 (精确高度与间距) */}
          <div className="absolute right-7 top-16 w-[380px] space-y-3">
            {mappings.map((mapping, index) => (
              <Field
                key={mapping.target}
                text={mapping.target}
                index={index}
                frame={frame}
                tone="emerald"
                confidence={mapping.confidence}
              />
            ))}
          </div>

          {/* 中央 AI 智能匹配核心 */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-3xl border-2 border-purple-300 bg-purple-50/95 px-8 py-6 text-center shadow-xl backdrop-blur-sm"
            style={{transform: `translate(-50%, -50%) scale(${aiScale})`}}
          >
            <div className="text-3xl font-black text-purple-700">AI</div>
            <div className="mt-2 text-[10px] font-bold text-purple-600 tracking-wider uppercase">
              语义匹配引擎
            </div>
            <div className="mt-1 text-[9px] text-slate-500 font-medium">建议可审核 · 规则可微调 · 效率飞跃</div>
          </div>
        </div>
      </ProductWindow>

      <SubtitleBanner
        text="依托大模型深度语义理解，秒级自动推荐高置信度字段映射，告别繁重手写代码，提效 80% 以上！"
        startFrame={20}
        bottomPx={26}
      />
    </AbsoluteFill>
  );
};

const Field: React.FC<{
  text: string;
  index: number;
  frame: number;
  tone: 'blue' | 'emerald';
  confidence?: string;
}> = ({text, index, frame, tone, confidence}) => {
  const opacity = interpolate(frame - index * 30, [40, 75], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      className="flex h-[72px] items-center justify-between rounded-xl border bg-slate-50/90 px-4 shadow-sm select-none"
      style={{
        opacity,
        borderColor: tone === 'blue' ? '#bfdbfe' : '#bbf7d0',
      }}
    >
      <span className={`font-mono text-[11px] font-bold ${tone === 'blue' ? 'text-blue-700' : 'text-emerald-700'}`}>
        {text}
      </span>
      {confidence && (
        <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-bold text-emerald-700 border border-emerald-200">
          ✓ 置信度 {confidence}
        </span>
      )}
    </div>
  );
};
