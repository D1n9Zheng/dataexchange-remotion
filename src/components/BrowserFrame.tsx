import React from 'react';
import {interpolate} from 'remotion';
import {DEMO_FLOW, PRODUCT_NAME} from '../content/demo';

interface BrowserFrameProps {
  progress?: number;
  activeStep?: number;
  showRecordingSlot?: boolean;
}

const steps = ['连接器配置', '学习数据', '协议解析', 'AI 规则转换', '结果确认'];

export const BrowserFrame: React.FC<BrowserFrameProps> = ({
  progress = 1,
  activeStep = 0,
  showRecordingSlot = false,
}) => {
  const width = interpolate(progress, [0, 1], [330, 1710]);
  const height = interpolate(progress, [0, 1], [184, 900]);
  const radius = interpolate(progress, [0, 1], [30, 22]);
  const contentOpacity = interpolate(progress, [0.62, 0.92], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      className="absolute left-1/2 top-1/2 z-20 overflow-hidden border-2 border-blue-600 bg-white"
      style={{
        width,
        height,
        borderRadius: radius,
        transform: 'translate(-50%, -50%)',
        boxShadow: '0 34px 90px rgba(37, 99, 235, 0.22)',
      }}
    >
      <div
        className="h-full flex flex-col"
        style={{opacity: contentOpacity}}
      >
        <div className="h-11 shrink-0 border-b border-slate-200 bg-slate-50 flex items-center px-4 gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
          <div className="ml-4 h-6 flex-1 max-w-[660px] rounded-md bg-white border border-slate-200 flex items-center px-3 text-[10px] text-slate-400 font-mono">
            /ai-protocol-center · {DEMO_FLOW.sourceProtocol} {DEMO_FLOW.messageType}
          </div>
        </div>

        <div className="flex flex-1 min-h-0">
          <aside className="w-56 shrink-0 bg-[#071b38] text-white px-5 py-6">
            <div className="text-base font-black tracking-tight">{PRODUCT_NAME}</div>
            <div className="mt-1 text-[9px] tracking-[0.18em] text-sky-300 font-mono">
              DATA EXCHANGE
            </div>
            <div className="mt-8 rounded-xl bg-blue-600/25 border border-blue-400/30 px-3 py-2.5 text-xs font-bold text-sky-100">
              AI 协议解析中心
            </div>
            {['默认协议库', '连接器管理', '字段映射', '传输任务', '运行监控'].map((item) => (
              <div key={item} className="px-3 py-2.5 text-[11px] text-slate-300">
                {item}
              </div>
            ))}
          </aside>

          <main className="flex-1 bg-[#f6f8fb] px-9 py-7 relative overflow-hidden">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-xl font-black text-slate-900">AI 协议解析中心</div>
                <div className="mt-1 text-[11px] text-slate-500">
                  从业务样例中识别协议结构，生成可审核的转换规则
                </div>
              </div>
              <div className="rounded-lg bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-sm">
                新建分析任务
              </div>
            </div>

            <div className="mt-7 rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-sm">
              <div className="grid grid-cols-5 gap-3">
                {steps.map((step, index) => {
                  const isActive = index === activeStep;
                  const isDone = index < activeStep;
                  return (
                    <div
                      key={step}
                      className="relative rounded-xl border px-3 py-3 text-center"
                      style={{
                        borderColor: isActive ? '#2563eb' : isDone ? '#86efac' : '#e2e8f0',
                        background: isActive ? '#eff6ff' : isDone ? '#f0fdf4' : '#ffffff',
                        boxShadow: isActive ? '0 8px 25px rgba(37,99,235,0.15)' : undefined,
                      }}
                    >
                      <div className="text-[10px] font-mono font-bold text-slate-400">
                        {String(index + 1).padStart(2, '0')}
                      </div>
                      <div className="mt-1 text-xs font-bold text-slate-800">{step}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-5">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="text-xs font-bold text-slate-800">源端配置</div>
                <div className="mt-4 grid grid-cols-2 gap-3 text-[11px]">
                  <Info label="源系统" value={DEMO_FLOW.sourceSystem} />
                  <Info label="源协议" value={`${DEMO_FLOW.sourceProtocol} ${DEMO_FLOW.messageType}`} />
                  <Info label="报文版本" value={DEMO_FLOW.version} />
                  <Info label="样例文件" value={DEMO_FLOW.sampleFile} />
                </div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="text-xs font-bold text-slate-800">目标端配置</div>
                <div className="mt-4 grid grid-cols-2 gap-3 text-[11px]">
                  <Info label="目标系统" value={DEMO_FLOW.targetSystem} />
                  <Info label="目标格式" value={DEMO_FLOW.targetFormat} />
                  <Info label="转换方式" value="AI 辅助映射" />
                  <Info label="审核状态" value="待确认" />
                </div>
              </div>
            </div>

            {showRecordingSlot && (
              <div className="absolute inset-0 flex items-end justify-center pb-6 pointer-events-none">
                <div className="rounded-full border border-blue-200 bg-white/95 px-4 py-2 text-[10px] font-bold tracking-[0.12em] text-blue-700 shadow-lg">
                  REAL UI SLOT · 后续接入 R01 录屏
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      <div
        className="absolute inset-0 flex items-center justify-center bg-white"
        style={{opacity: 1 - contentOpacity, pointerEvents: 'none'}}
      >
        <div className="text-center">
          <div className="text-[34px] font-bold tracking-[-0.04em] text-slate-900">{PRODUCT_NAME}</div>
        </div>
      </div>
    </div>
  );
};

const Info: React.FC<{label: string; value: string}> = ({label, value}) => (
  <div className="rounded-lg bg-slate-50 px-3 py-2.5 border border-slate-100 min-w-0">
    <div className="text-[9px] text-slate-400">{label}</div>
    <div className="mt-1 font-semibold text-slate-700 truncate">{value}</div>
  </div>
);
