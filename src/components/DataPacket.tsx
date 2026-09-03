import React from 'react';

interface DataPacketProps {
  x: number;
  y: number;
  scale?: number;
  opacity?: number;
  glow?: number;
  compact?: boolean;
  protocol?: string;
  messageType?: string;
  description?: string;
  rawPreview?: string;
}

export const DataPacket: React.FC<DataPacketProps> = ({
  x,
  y,
  scale = 1,
  opacity = 1,
  glow = 1,
  compact = false,
  protocol = 'EDIFACT',
  messageType = 'ORDERS',
  description = '采购订单 · D96A',
  rawPreview = 'UNH+1+ORDERS:D:96A:UN',
}) => {
  return (
    <div
      className="absolute z-30 rounded-2xl border-2 border-sky-500 bg-white overflow-hidden"
      style={{
        left: x,
        top: y,
        width: compact ? 176 : 236,
        height: compact ? 76 : 104,
        opacity,
        transform: `translate(-50%, -50%) scale(${scale})`,
        boxShadow: `0 18px 55px rgba(14, 165, 233, ${0.22 * glow}), 0 0 ${30 * glow}px rgba(56, 189, 248, ${0.25 * glow})`,
        willChange: 'transform, opacity',
      }}
    >
      <div className="h-2 bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600" />
      <div className={compact ? 'px-4 py-2.5' : 'px-5 py-3.5'}>
        <div className="flex items-center justify-between gap-3">
          <span className="text-[11px] font-black tracking-[0.18em] text-sky-700">
            {protocol}
          </span>
          <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-bold text-emerald-700 border border-emerald-200">
            {messageType}
          </span>
        </div>
        {!compact && (
          <div className="mt-2 font-mono text-[10px] leading-4 text-slate-500 truncate">
            {rawPreview}
          </div>
        )}
        <div className="mt-1 text-[10px] font-semibold text-slate-700">
          {description}
        </div>
      </div>
    </div>
  );
};
