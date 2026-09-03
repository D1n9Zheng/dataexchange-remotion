import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {LightBackground} from '../components/LightBackground';
import {ProductWindow} from '../components/ProductWindow';
import {SubtitleBanner} from '../components/SubtitleBanner';
import {WizardSteps} from '../components/WizardSteps';

const rawSegments = [
  "UNH+1+ORDERS:D:96A:UN'",
  "BGM+220+PO20260902+9'",
  "DTM+137:20260902:102'",
  "NAD+BY+8712345678901::9'",
  "LIN+1++PRODUCT_A:EN'",
  "QTY+21:500:PCE'",
];

const parsedFields = [
  ['header.orderNo', 'PO20260902'],
  ['header.orderDate', '2026-09-02'],
  ['buyer.gln', '8712345678901'],
  ['lines[0].sku', 'PRODUCT_A'],
  ['lines[0].quantity', '500'],
  ['lines[0].unit', 'PCE'],
];

export const Scene05ProtocolParse: React.FC = () => {
  const frame = useCurrentFrame();
  const scanY = interpolate(frame, [80, 330], [0, 430], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const parsedProgress = interpolate(frame, [180, 520], [0, parsedFields.length], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill className="overflow-hidden bg-[#f8fbff] font-sans">
      <LightBackground glowIntensity={1.18} />
      <ProductWindow
        title="协议识别与结构解析"
        subtitle="支持 EDIFACT、ANSI X12、海关报文等数十种格式自动识别与段式解析"
        actionLabel="下一步：字段映射 →"
      >
        <WizardSteps activeStep={2} />
        <div className="mt-5 grid h-[550px] grid-cols-[1fr_120px_1fr] gap-5">
          <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-[#071426] p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white">原始 EDIFACT 报文</span>
              <span className="rounded-full border border-sky-500/30 bg-sky-500/15 px-3 py-1 text-[9px] font-bold text-sky-300">ORDERS · D96A</span>
            </div>
            <div className="mt-5 space-y-3 font-mono text-[11px] text-sky-100">
              {rawSegments.map((segment, index) => (
                <div key={segment} className="rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-2" style={{opacity: frame < index * 20 ? 0.3 : 1}}>
                  <span className="mr-3 text-sky-400">{String(index + 1).padStart(2, '0')}</span>{segment}
                </div>
              ))}
            </div>
            <div className="absolute inset-x-0 h-16 bg-gradient-to-b from-transparent via-sky-400/20 to-transparent" style={{top: scanY}} />
          </div>

          <div className="flex flex-col items-center justify-center gap-4">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-400 to-transparent" />
            <div className="rounded-2xl border border-blue-200 bg-white px-4 py-5 text-center shadow-lg">
              <div className="text-[10px] font-bold tracking-[0.14em] text-blue-600">AUTO DETECT</div>
              <div className="mt-2 text-2xl font-black text-slate-900">解析</div>
              <div className="mt-2 text-[9px] text-emerald-600">协议已识别</div>
            </div>
            <div className="h-px w-full bg-gradient-to-r from-transparent via-emerald-400 to-transparent" />
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800">结构化解析结果</span>
              <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[9px] font-bold text-emerald-700">CANONICAL JSON</span>
            </div>
            <div className="mt-5 space-y-3">
              {parsedFields.map(([path, value], index) => (
                <div
                  key={path}
                  className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50 px-4 py-2.5"
                  style={{opacity: parsedProgress > index ? 1 : 0.16}}
                >
                  <span className="font-mono text-[10px] font-bold text-blue-700">{path}</span>
                  <span className="font-mono text-[10px] text-slate-600">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ProductWindow>
      <SubtitleBanner text="内置主流供应链协议模板库！智能识别报文头与版本，毫秒级拆解为 100% 结构化标准模型。" startFrame={24} bottomPx={26} />
    </AbsoluteFill>
  );
};

