import React from 'react';
import {PRODUCT_NAME} from '../content/demo';

interface ProductWindowProps {
  title: string;
  subtitle: string;
  activeNav?: string;
  route?: string;
  actionLabel?: string;
  children: React.ReactNode;
}

const navItems = ['AI 协议解析中心', '默认协议库', '连接器管理', '字段映射', '传输任务', '运行监控'];

export const ProductWindow: React.FC<ProductWindowProps> = ({
  title,
  subtitle,
  activeNav = 'AI 协议解析中心',
  route = '/ai-protocol-center',
  actionLabel = '新建任务',
  children,
}) => {
  return (
    <div className="absolute left-1/2 top-1/2 z-20 h-[900px] w-[1710px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[22px] border-2 border-blue-600 bg-white shadow-[0_34px_90px_rgba(37,99,235,0.22)]">
      <div className="h-11 border-b border-slate-200 bg-slate-50 flex items-center px-4 gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
        <div className="ml-4 h-6 flex-1 max-w-[660px] rounded-md bg-white border border-slate-200 flex items-center px-3 text-[10px] text-slate-400 font-mono">
          {route}
        </div>
      </div>

      <div className="flex h-[856px]">
        <aside className="w-56 shrink-0 bg-[#071b38] px-5 py-6 text-white">
          <div className="text-base font-black tracking-tight">{PRODUCT_NAME}</div>
          <div className="mt-1 text-[9px] tracking-[0.18em] text-sky-300 font-mono">DATA EXCHANGE</div>
          <div className="mt-8 space-y-1">
            {navItems.map((item) => (
              <div
                key={item}
                className="rounded-xl border px-3 py-2.5 text-[11px] font-semibold"
                style={{
                  color: item === activeNav ? '#e0f2fe' : '#cbd5e1',
                  borderColor: item === activeNav ? 'rgba(96,165,250,0.3)' : 'transparent',
                  background: item === activeNav ? 'rgba(37,99,235,0.25)' : 'transparent',
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </aside>

        <main className="flex-1 overflow-hidden bg-[#f6f8fb] px-9 py-7">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-black text-slate-900">{title}</h2>
              <p className="mt-1 text-[11px] text-slate-500">{subtitle}</p>
            </div>
            <div className="rounded-lg bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-sm">{actionLabel}</div>
          </div>
          <div className="mt-6 h-[744px]">{children}</div>
        </main>
      </div>
    </div>
  );
};

