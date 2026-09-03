import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {LightBackground} from '../components/LightBackground';
import {ProductWindow} from '../components/ProductWindow';
import {SubtitleBanner} from '../components/SubtitleBanner';
import {WizardSteps} from '../components/WizardSteps';
import {DEMO_FLOW} from '../content/demo';

export const Scene04ConnectorUpload: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // 节奏加速：1.5秒后切入步骤 1 (学习数据)，避免前 5 秒死板静止
  const activeStep = frame < 90 ? 0 : 1;

  // 文件卡片弹簧飞入 (第 100 帧入场)
  const fileScale = spring({
    frame: frame - 100,
    fps,
    config: {damping: 14, stiffness: 120},
  });

  // 上传与采样进度 (第 120 帧 ~ 340 帧推进至 100%)
  const progress = interpolate(frame, [120, 340], [0, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const isUploaded = progress >= 100;

  return (
    <AbsoluteFill className="overflow-hidden bg-[#f8fbff] font-sans">
      <LightBackground glowIntensity={1.05} />
      <ProductWindow
        title="接入业务数据"
        subtitle="配置源端与目标端连接器，并提交用于协议学习的业务样例"
        actionLabel={isUploaded ? '下一步：开始解析 →' : '保存连接器配置'}
      >
        <WizardSteps activeStep={activeStep} />

        <div className="mt-5 grid grid-cols-2 gap-5">
          <ConfigCard
            accent="#0284c7"
            title="源端连接器"
            badge="SFTP · ACTIVE"
            items={[
              ['源系统', DEMO_FLOW.sourceSystem],
              ['通信方式', 'SFTP / SSH'],
              ['数据格式', DEMO_FLOW.sourceProtocol],
              ['报文类型', `${DEMO_FLOW.messageType} · ${DEMO_FLOW.version}`],
            ]}
            delay={10}
            frame={frame}
          />
          <ConfigCard
            accent="#7c3aed"
            title="目标端连接器"
            badge="REST · ACTIVE"
            items={[
              ['目标系统', DEMO_FLOW.targetSystem],
              ['通信方式', 'REST API (OAuth 2.0)'],
              ['目标格式', DEMO_FLOW.targetFormat],
              ['处理方式', 'AI 辅助映射'],
            ]}
            delay={25}
            frame={frame}
          />
        </div>

        {/* 上传区域与实时采样状态 */}
        <div className="mt-5 h-[260px] rounded-2xl border-2 border-dashed border-blue-200 bg-white flex flex-col items-center justify-center relative overflow-hidden shadow-sm">
          <div className="text-xs font-bold text-slate-800">上传或采集学习样例</div>
          <div className="mt-1 text-[10px] text-slate-400">支持文件上传、端点实时监听与连接器端点采样</div>

          {frame >= 100 && (
            <div
              className="mt-4 w-[560px] rounded-2xl border px-6 py-4 shadow-md transition-all select-none"
              style={{
                transform: `scale(${fileScale})`,
                borderColor: isUploaded ? '#86efac' : '#93c5fd',
                backgroundColor: isUploaded ? '#f0fdf4' : '#f8fbff',
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{isUploaded ? '✅' : '📄'}</span>
                  <div>
                    <div className="text-xs font-bold text-slate-800">{DEMO_FLOW.sampleFile}</div>
                    <div className="mt-0.5 text-[10px] text-slate-500 font-mono">
                      EDIFACT ORDERS · 1.4 KB · 虚构采购订单样例
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div
                    className="text-xs font-mono font-bold"
                    style={{color: isUploaded ? '#059669' : '#2563eb'}}
                  >
                    {Math.round(progress)}%
                  </div>
                  <div className="text-[9px] text-slate-400">
                    {isUploaded ? '已完成解析就绪' : '数据采样中...'}
                  </div>
                </div>
              </div>

              {/* 进度条 */}
              <div className="mt-3 h-2 rounded-full bg-slate-100 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${progress}%`,
                    backgroundColor: isUploaded ? '#10b981' : '#3b82f6',
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </ProductWindow>

      <SubtitleBanner
        text="全面覆盖 SFTP、REST、AS2 等主流通信方式，一键导入真实样例，开启智能数据洞察。"
        startFrame={22}
        bottomPx={26}
      />
    </AbsoluteFill>
  );
};

const ConfigCard: React.FC<{
  accent: string;
  title: string;
  badge: string;
  items: Array<[string, string]>;
  delay: number;
  frame: number;
}> = ({accent, title, badge, items, delay, frame}) => {
  const alpha = interpolate(frame - delay, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
      style={{opacity: alpha}}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5 text-xs font-bold text-slate-800">
          <span className="h-6 w-1.5 rounded-full" style={{background: accent}} />
          {title}
        </div>
        <span
          className="rounded-md px-2 py-0.5 text-[9px] font-mono font-bold"
          style={{color: accent, backgroundColor: `${accent}15`}}
        >
          {badge}
        </span>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3">
        {items.map(([label, value]) => (
          <div key={label} className="rounded-lg border border-slate-100 bg-slate-50/80 px-3 py-2">
            <div className="text-[9px] text-slate-400">{label}</div>
            <div className="mt-0.5 text-[11px] font-semibold text-slate-700 truncate">{value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
