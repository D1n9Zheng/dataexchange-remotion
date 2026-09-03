import React from 'react';

const steps = ['连接器配置', '学习数据', '协议解析', 'AI 规则转换', '结果确认'];

export const WizardSteps: React.FC<{activeStep: number}> = ({activeStep}) => (
  <div className="grid grid-cols-5 gap-3 rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-sm">
    {steps.map((step, index) => {
      const isActive = index === activeStep;
      const isDone = index < activeStep;
      return (
        <div
          key={step}
          className="rounded-xl border px-3 py-3 text-center"
          style={{
            borderColor: isActive ? '#2563eb' : isDone ? '#86efac' : '#e2e8f0',
            background: isActive ? '#eff6ff' : isDone ? '#f0fdf4' : '#ffffff',
            boxShadow: isActive ? '0 8px 25px rgba(37,99,235,0.15)' : undefined,
          }}
        >
          <div className="text-[10px] font-mono font-bold text-slate-400">{String(index + 1).padStart(2, '0')}</div>
          <div className="mt-1 text-xs font-bold text-slate-800">{step}</div>
        </div>
      );
    })}
  </div>
);

