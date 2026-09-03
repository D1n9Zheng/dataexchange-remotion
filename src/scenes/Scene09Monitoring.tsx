import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {LightBackground} from '../components/LightBackground';
import {ProductWindow} from '../components/ProductWindow';
import {SubtitleBanner} from '../components/SubtitleBanner';

const tasks = [
  ['EDIFACT 采购订单入库', '运行中', '供应商 ERP → WMS', '1,286'],
  ['ASN 发货通知同步', '已完成', 'WMS → OMS', '842'],
  ['商业发票归档', '已完成', 'ERP → 财务系统', '659'],
  ['海关回执接收', '待处理', '海关 → 业务平台', '12'],
];

export const Scene09Monitoring: React.FC = () => {
  const frame = useCurrentFrame();
  const chartProgress = interpolate(frame, [90, 360], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return (
    <AbsoluteFill className="overflow-hidden bg-[#f8fbff] font-sans">
      <LightBackground glowIntensity={1.08} />
      <ProductWindow
        title="任务运行与统一监控"
        subtitle="全网交换拓扑实时感知，数据访问受控与全链路审计追踪，运行异常清晰可定位"
        activeNav="运行监控"
        route="/dashboard"
        actionLabel="导出运维报告"
      >
        <div className="grid grid-cols-4 gap-4">
          <Metric label="今日交换量" value="2,799" sub="业务报文" color="#2563eb" />
          <Metric label="运行任务" value="18" sub="稳定运行" color="#059669" />
          <Metric label="待处理异常" value="12" sub="可定位追踪" color="#dc2626" />
          <Metric label="连接器健康" value="24 / 25" sub="实时检测" color="#7c3aed" />
        </div>

        <div className="mt-5 grid h-[590px] grid-cols-[1.25fr_0.75fr] gap-5">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800">最近活跃任务</span>
              <span className="text-[9px] text-slate-400">状态实时更新</span>
            </div>
            <div className="mt-5 space-y-3">
              {tasks.map(([name, status, route, count], index) => (
                <div key={name} className="grid grid-cols-[1.2fr_0.55fr_1fr_0.45fr] items-center rounded-xl border border-slate-100 bg-slate-50 px-4 py-4 text-[10px]" style={{opacity: interpolate(frame - index * 24, [20, 55], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>
                  <span className="font-bold text-slate-800">{name}</span>
                  <span className={`font-bold ${status === '待处理' ? 'text-red-600' : status === '运行中' ? 'text-blue-600' : 'text-emerald-600'}`}>{status}</span>
                  <span className="text-slate-500">{route}</span>
                  <span className="text-right font-mono font-bold text-slate-700">{count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="text-xs font-bold text-slate-800">近 7 日交换趋势</div>
            <div className="mt-8 flex h-[250px] items-end justify-between gap-3 border-b border-slate-200 px-2">
              {[54, 72, 64, 88, 78, 96, 84].map((height, index) => (
                <div key={index} className="w-8 rounded-t-lg bg-gradient-to-t from-blue-600 to-sky-400" style={{height: `${height * chartProgress}%`}} />
              ))}
            </div>
            <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
              <div className="text-[10px] font-bold text-emerald-700">运行健康</div>
              <div className="mt-2 text-2xl font-black text-emerald-700">正常</div>
              <div className="mt-1 text-[9px] text-emerald-600">核心交换链路状态稳定</div>
            </div>
          </div>
        </div>
      </ProductWindow>
      <SubtitleBanner text="集中掌控全网交换拓扑与任务健康，实时指标与告警全链路可溯，运维排障精准到秒！" startFrame={22} bottomPx={26} />
    </AbsoluteFill>
  );
};

const Metric: React.FC<{label: string; value: string; sub: string; color: string}> = ({label, value, sub, color}) => (
  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
    <div className="text-[10px] font-bold text-slate-500">{label}</div>
    <div className="mt-2 text-2xl font-black" style={{color}}>{value}</div>
    <div className="mt-1 text-[9px] text-slate-400">{sub}</div>
  </div>
);
