import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {LightBackground} from '../components/LightBackground';
import {ProductWindow} from '../components/ProductWindow';
import {SubtitleBanner} from '../components/SubtitleBanner';
import {WizardSteps} from '../components/WizardSteps';

const panels = [
  {
    title: '原始数据',
    tag: 'EDIFACT',
    color: '#0284c7',
    rows: ["BGM+220+PO20260902+9'", "NAD+BY+8712345678901::9'", "LIN+1++PRODUCT_A:EN'", "QTY+21:500:PCE'"],
  },
  {
    title: '解析数据',
    tag: 'CANONICAL',
    color: '#7c3aed',
    rows: ['orderNo: PO20260902', 'buyer.gln: 8712345678901', 'sku: PRODUCT_A', 'quantity: 500'],
  },
  {
    title: '转换后数据',
    tag: 'JSON',
    color: '#059669',
    rows: ['"orderId": "PO20260902"', '"consigneeCode": "8712345678901"', '"productCode": "PRODUCT_A"', '"quantity": 500'],
  },
];

export const Scene07ResultPreview: React.FC = () => {
  const frame = useCurrentFrame();
  const activePanel = Math.min(2, Math.floor(frame / 180));
  return (
    <AbsoluteFill className="overflow-hidden bg-[#f8fbff] font-sans">
      <LightBackground glowIntensity={1.12} />
      <ProductWindow
        title="转换结果预览与校验"
        subtitle="原始报文、Canonical 统一模型与目标结构实时比对，任务投产前保障零失真"
        actionLabel="激活运行任务 →"
      >
        <WizardSteps activeStep={4} />
        <div className="mt-5 grid h-[520px] grid-cols-3 gap-5">
          {panels.map((panel, index) => {
            const active = index === activePanel;
            const glow = interpolate(frame % 180, [0, 35, 145, 179], [0, 1, 1, 0]);
            return (
              <div key={panel.title} className="rounded-2xl border bg-white p-5 shadow-sm" style={{borderColor: active ? panel.color : '#e2e8f0', boxShadow: active ? `0 18px 45px ${panel.color}22` : undefined}}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800">{panel.title}</span>
                  <span className="rounded-full px-3 py-1 text-[9px] font-bold text-white" style={{background: panel.color}}>{panel.tag}</span>
                </div>
                <div className="mt-6 space-y-4">
                  {panel.rows.map((row, rowIndex) => (
                    <div key={row} className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 font-mono text-[10px] text-slate-700" style={{opacity: active || index < activePanel ? 1 : 0.42}}>
                      <span className="mr-2 text-slate-400">{String(rowIndex + 1).padStart(2, '0')}</span>{row}
                    </div>
                  ))}
                </div>
                {active && <div className="mt-6 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-center text-[10px] font-bold text-emerald-700" style={{opacity: glow}}>字段校验通过</div>}
              </div>
            );
          })}
        </div>
      </ProductWindow>
      <SubtitleBanner text="原始报文、标准模型与目标数据三屏联动，任务投产前 100% 验证零误差，杜绝脏数据流入！" startFrame={22} bottomPx={26} />
    </AbsoluteFill>
  );
};

