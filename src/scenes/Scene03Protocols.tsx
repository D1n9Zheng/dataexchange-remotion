import React from 'react';
import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {LightBackground} from '../components/LightBackground';
import {ProtocolBadge} from '../components/ProtocolBadge';
import {SubtitleBanner} from '../components/SubtitleBanner';

export const Scene03Protocols: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // =========================================================================
  // 电影级运镜与景深系统 (Camera & Depth of Field)
  // =========================================================================
  const cameraScale = interpolate(
    frame,
    [0, 180, 220, 440, 480, 600],
    [1.0, 1.0, 1.18, 1.18, 1.0, 1.0],
    {
      easing: Easing.bezier(0.16, 1, 0.3, 1),
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  const cameraY = interpolate(
    frame,
    [0, 180, 220, 440, 480, 600],
    [0, 0, -8, -8, 0, 0],
    {
      easing: Easing.bezier(0.16, 1, 0.3, 1),
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  // 两侧协议翅膀景深虚化与暗化 (在乐章二时优雅退居幕后)
  const wingOpacity = interpolate(
    frame,
    [170, 210, 440, 475],
    [1.0, 0.15, 0.15, 1.0],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
  );
  const wingBlur = interpolate(
    frame,
    [170, 210, 440, 475],
    [0, 6, 6, 0],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
  );

  // 乐章一全息光波
  const sweepProgress = interpolate(frame, [40, 140], [-200, 2120], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // =========================================================================
  // 数据集定义 (F-01 规范)
  // =========================================================================
  const edifactProtocols = [
    {name: 'ORDERS', cn: '采购订单 Purchase Order', tag: 'D96A / D01B'},
    {name: 'DESADV', cn: '发货通知 / ASN', tag: 'Despatch Advice'},
    {name: 'INVOIC', cn: '商业发票 Commercial Invoice', tag: 'Billing / Invoice'},
    {name: 'IFTMIN', cn: '运输委托指令', tag: 'Transport Instruction'},
    {name: 'IFTMCS', cn: '运输合同报文', tag: 'Transport Contract'},
    {name: 'APERAK', cn: '应用确认回执', tag: 'App Acknowledgment'},
    {name: 'ORDRSP', cn: '订单确认应答', tag: 'Order Response'},
    {name: 'CONTRL', cn: '语法校验控制', tag: 'Syntax & Control'},
  ];

  const x12Protocols = [
    {name: 'X12 850', cn: '采购订单 Purchase Order', tag: 'Release 4010/5010'},
    {name: 'X12 856', cn: '装运通知 Ship Notice (ASN)', tag: 'Supply Chain'},
    {name: 'X12 810', cn: '电子发票 Invoice', tag: 'Finance & Billing'},
    {name: 'X12 855', cn: '订单确认 PO Ack', tag: 'Order Response'},
    {name: 'X12 214', cn: '运输轨迹跟踪 Status', tag: 'Carrier Status'},
    {name: 'X12 997', cn: '功能回执 Functional ACK', tag: 'Service ACK'},
  ];

  const customsProtocols = [
    {name: '海关报关单', cn: 'Customs Declaration', tag: 'Clearance Form'},
    {name: '进出口舱单', cn: 'Customs Manifest', tag: 'B/L Manifest'},
    {name: '转运放行单', cn: 'Transit Release', tag: 'Port Release'},
    {name: '原产地证书', cn: 'Origin Certificate', tag: 'Trade Standard'},
  ];

  // 乐章三权威验收门禁徽章
  const metrics = [
    {
      title: '100% 解析正确率',
      sub: 'Golden File 门禁严格校验 · 零失真',
      icon: '🎯',
      color: '#059669',
      border: '#86efac',
      bg: '#f0fdf4',
      tag: 'GOLDEN BENCHMARK',
    },
    {
      title: '秒级自动报文识别',
      sub: '智能识别报文头与版本 · 零配置',
      icon: '⚡',
      color: '#0284c7',
      border: '#93c5fd',
      bg: '#f0f9ff',
      tag: 'AUTO HEADER PARSER',
    },
    {
      title: '零停机自定义扩展',
      sub: '支持在线热加载自定义模板 · 免停机改码',
      icon: '🧩',
      color: '#7c3aed',
      border: '#c4b5fd',
      bg: '#faf5ff',
      tag: 'HOT EXTENSION',
    },
  ];

  const rawText =
    "UNH+1+ORDERS:D:96A:UN'BGM+220+PO20260902+9'DTM+137:20260902:102'NAD+BY+8712345678901::9'LIN+1++PRODUCT_A:EN'QTY+21:500:PCE'";

  const engineLaserY = interpolate((frame * 1.8) % 100, [0, 100], [0, 100]);

  const isAct2Active = frame >= 190 && frame < 450;
  const isAct3Active = frame >= 450;

  // 动态旁白文本切片
  let currentSubtitle =
    '内置覆盖物流与供应链主流标准的协议模板库，支持 EDIFACT、X12 及海关报文数十种格式。';
  if (frame >= 200 && frame < 450) {
    currentSubtitle =
      '智能识别入站报文头，毫秒级拆解语法段式，无损归一化为标准 Canonical 统一模型。';
  } else if (frame >= 450) {
    currentSubtitle =
      '100% 测试基准正确率，更支持管理员在线零停机热扩展，兼顾极致稳定与敏捷进化。';
  }

  return (
    <AbsoluteFill className="overflow-hidden bg-[#f8fbff] select-none font-sans">
      <LightBackground glowIntensity={isAct2Active ? 1.4 : 1.05} />

      {/* 固定 HUD 前景层：顶部产品主标题 (Y: 38px ~ 138px, 上下间隙充裕) */}
      <div className="absolute top-9 inset-x-0 flex flex-col items-center pointer-events-none z-40">
        <div className="flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200/90 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
          <span className="text-[11px] font-mono font-bold tracking-wider text-blue-700 uppercase">
            FEATURE F-01 · 标准协议解析与主流模板库
          </span>
        </div>

        <h1 className="mt-2 text-[30px] font-black tracking-tight text-slate-900 leading-tight">
          内置主流标准协议模板库 · 毫秒级自动解析
        </h1>

        <p className="mt-1 text-[11px] font-mono font-bold text-blue-600 tracking-wider">
          BUILT-IN EDIFACT (≥8) · ANSI X12 (≥5) · CUSTOMS EDI · 100% ACCURACY · ZERO-DOWNTIME EXTENSION
        </p>
      </div>

      {/* 乐章一全息扫光光带 */}
      <div
        className="absolute top-0 bottom-0 w-28 bg-gradient-to-r from-transparent via-blue-400/25 to-transparent pointer-events-none skew-x-12 z-20"
        style={{left: `${sweepProgress}px`}}
      />

      {/* 动态相机内容层 (起始 Y: 195px，整体下沉以达到绝对垂直居中) */}
      <div
        className="w-full h-full relative"
        style={{
          transform: `scale(${cameraScale}) translateY(${cameraY}px)`,
          transformOrigin: '50% 50%',
          willChange: 'transform',
        }}
      >
        {/* --- 左侧翼：UN/EDIFACT 矩阵 (8种) - 下移至 top-[195px] --- */}
        <div
          className="absolute left-16 top-[195px] w-[420px] flex flex-col gap-2.5 z-10 transition-all duration-300"
          style={{
            opacity: wingOpacity,
            filter: `blur(${wingBlur}px)`,
            transform: `translateX(${interpolate(
              frame,
              [180, 220],
              [0, -20],
              {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
            )}px)`,
          }}
        >
          <div className="flex items-center justify-between px-3.5 py-1.5 rounded-xl bg-sky-50/90 border border-sky-200 shadow-sm">
            <span className="font-bold text-sky-900 text-xs tracking-tight">
              🔷 UN/EDIFACT 物流贸易标准 (内置 ≥8 种)
            </span>
            <span className="text-[10px] font-mono font-bold text-sky-700 bg-white px-2 py-0.5 rounded border border-sky-200">
              8 READY
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {edifactProtocols.map((proto, i) => (
              <ProtocolBadge
                key={proto.name}
                name={proto.name}
                cn={proto.cn}
                tag={proto.tag}
                color="#0284c7"
                delayFrames={i * 6}
                isScanning={frame < 180 && Math.floor(frame / 20) % 8 === i}
              />
            ))}
          </div>

          <div className="mt-1 p-2.5 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50/70 border border-blue-200/80 shadow-sm flex items-center gap-2.5">
            <span className="text-xl">🧩</span>
            <div>
              <div className="font-bold text-slate-800 text-[11px]">管理员零停机自定义扩展</div>
              <div className="text-[9.5px] text-slate-500">在线热更新自定义 EDI/段式映射模板</div>
            </div>
          </div>
        </div>

        {/* --- 右侧翼：ANSI X12 供应链 + 海关 EDI - 下移至 top-[195px] --- */}
        <div
          className="absolute right-16 top-[195px] w-[420px] flex flex-col gap-2.5 z-10 transition-all duration-300"
          style={{
            opacity: wingOpacity,
            filter: `blur(${wingBlur}px)`,
            transform: `translateX(${interpolate(
              frame,
              [180, 220],
              [0, 20],
              {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
            )}px)`,
          }}
        >
          {/* 上半部：ANSI X12 */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between px-3.5 py-1.5 rounded-xl bg-purple-50/90 border border-purple-200 shadow-sm">
              <span className="font-bold text-purple-900 text-xs tracking-tight">
                🔶 ANSI X12 供应链标准 (内置 ≥5 种)
              </span>
              <span className="text-[10px] font-mono font-bold text-purple-700 bg-white px-2 py-0.5 rounded border border-purple-200">
                6 READY
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {x12Protocols.map((proto, i) => (
                <ProtocolBadge
                  key={proto.name}
                  name={proto.name}
                  cn={proto.cn}
                  tag={proto.tag}
                  color="#7c3aed"
                  delayFrames={10 + i * 6}
                  isScanning={frame < 180 && Math.floor((frame + 10) / 20) % 6 === i}
                />
              ))}
            </div>
          </div>

          {/* 下半部：海关 EDI */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between px-3.5 py-1.5 rounded-xl bg-emerald-50/90 border border-emerald-200 shadow-sm">
              <span className="font-bold text-emerald-900 text-xs tracking-tight">
                🟢 海关 EDI 申报格式 (预置标准)
              </span>
              <span className="text-[10px] font-mono font-bold text-emerald-700 bg-white px-2 py-0.5 rounded border border-emerald-200">
                4 READY
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {customsProtocols.map((proto, i) => (
                <ProtocolBadge
                  key={proto.name}
                  name={proto.name}
                  cn={proto.cn}
                  tag={proto.tag}
                  color="#059669"
                  delayFrames={45 + i * 6}
                />
              ))}
            </div>
          </div>
        </div>

        {/* --- 中央主舞台：3 阶段流式解析引擎 - 下移至 top-[195px] --- */}
        <div
          className="absolute left-[516px] right-[516px] top-[195px] flex flex-col items-center z-20 transition-all duration-500"
          style={{
            opacity: isAct3Active ? 0.25 : 1.0,
            filter: isAct3Active ? 'blur(3px)' : 'none',
            transform: isAct3Active ? 'scale(0.95) translateY(-10px)' : 'none',
          }}
        >
          {/* 阶段 1: 入站报文流 */}
          <div className="w-full px-4 py-2 rounded-2xl bg-white border border-slate-200 shadow-md">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-800 text-xs flex items-center gap-1.5">
                <span className="animate-pulse">📥</span> 实时入站原始报文流 (Raw EDI Stream)
              </span>
              <span className="font-mono text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                AS2 / SFTP INBOUND
              </span>
            </div>

            <div className="font-mono text-[11px] text-blue-700 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 mt-1.5 truncate font-semibold">
              {rawText}
            </div>
          </div>

          {/* 垂直激光光束 1 */}
          <div className="w-0.5 h-6 bg-blue-400 relative my-0.5 overflow-hidden">
            <div
              className="absolute w-full h-3 bg-blue-600 shadow-sm shadow-blue-500"
              style={{
                top: `${(frame * 3) % 100}%`,
              }}
            />
          </div>

          {/* 阶段 2: 核心解析引擎卡片 */}
          <div className="w-full relative px-5 py-4 rounded-3xl bg-white border-2 border-blue-600 shadow-2xl overflow-hidden">
            <div
              className="absolute inset-x-0 h-0.5 bg-blue-500 pointer-events-none"
              style={{
                top: `${engineLaserY}%`,
                boxShadow: '0 0 14px 3px rgba(37, 99, 235, 0.8)',
              }}
            />

            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div className="flex items-center gap-2">
                <span className="text-xl">⚙️</span>
                <span className="font-bold text-slate-900 text-xs tracking-tight">
                  标准协议解析引擎 (Smooks / Rule-Mapping Cartridge)
                </span>
              </div>
              <span className="text-[10px] font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                AUTO DETECT ACTIVE
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2.5 my-3">
              <div
                className="p-2.5 rounded-xl border transition-all"
                style={{
                  backgroundColor: frame >= 220 ? '#eff6ff' : '#f8fafc',
                  borderColor: frame >= 220 ? '#bfdbfe' : '#e2e8f0',
                }}
              >
                <div className="font-bold text-slate-800 text-[11px]">1. 智能协议识别</div>
                <div className="text-[9px] font-mono text-slate-400">Header Inspection</div>
                <div className="font-mono text-xs font-bold text-sky-600 mt-1">MATCH: EDIFACT</div>
                <div className="text-[10px] text-emerald-600 font-medium">✓ ORDERS 模板命中</div>
              </div>

              <div
                className="p-2.5 rounded-xl border transition-all"
                style={{
                  backgroundColor: frame >= 280 ? '#faf5ff' : '#f8fafc',
                  borderColor: frame >= 280 ? '#ddd6fe' : '#e2e8f0',
                }}
              >
                <div className="font-bold text-slate-800 text-[11px]">2. 语法与段式解析</div>
                <div className="text-[9px] font-mono text-slate-400">Smooks Cartridge</div>
                <div className="font-mono text-xs font-bold text-purple-600 mt-1">34 SEGMENTS</div>
                <div className="text-[10px] text-emerald-600 font-medium">✓ 语法校验 100%</div>
              </div>

              <div
                className="p-2.5 rounded-xl border transition-all"
                style={{
                  backgroundColor: frame >= 350 ? '#f0fdf4' : '#f8fafc',
                  borderColor: frame >= 350 ? '#bbf7d0' : '#e2e8f0',
                }}
              >
                <div className="font-bold text-slate-800 text-[11px]">3. Canonical 归一</div>
                <div className="text-[9px] font-mono text-slate-400">CanonicalMessage</div>
                <div className="font-mono text-xs font-bold text-emerald-600 mt-1">JAVA / JSON</div>
                <div className="text-[10px] text-emerald-600 font-medium">✓ 无损结构化组装</div>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono font-semibold text-slate-600 border-t border-slate-100 pt-2">
              <span className="text-blue-600">⚡ 耗时: 1.8ms</span>
              <span className="text-slate-500">吞吐: 12,000 TPS</span>
              <span className="text-emerald-600 font-bold">✓ 零丢失 零乱码</span>
            </div>
          </div>

          {/* 垂直激光光束 2 */}
          <div className="w-0.5 h-6 bg-emerald-400 relative my-0.5 overflow-hidden">
            <div
              className="absolute w-full h-3 bg-emerald-600 shadow-sm shadow-emerald-500"
              style={{
                top: `${(frame * 3) % 100}%`,
              }}
            />
          </div>

          {/* 阶段 3: CanonicalMessage 输出视窗 */}
          <div className="w-full px-4 py-2 rounded-2xl bg-emerald-50/90 border border-emerald-300 shadow-md">
            <div className="flex items-center justify-between">
              <span className="font-bold text-emerald-900 text-xs">
                📤 标准化 CanonicalMessage 输出 (供 Camel 流式处理管道消费)
              </span>
              <span className="font-mono text-[9px] font-bold text-emerald-700 bg-white px-2 py-0.5 rounded border border-emerald-200">
                100% ACCURACY
              </span>
            </div>
            <div className="font-mono text-[11px] text-emerald-800 bg-white px-3 py-1 rounded-lg border border-emerald-200 mt-1 truncate font-semibold">
              &#123; "family": "EDIFACT", "type": "ORDERS", "orderId": "PO20260902", "lines": 12, "status": "PARSED" &#125;
            </div>
          </div>
        </div>

        {/* --- 乐章三：三大权威定格印章 (下沉至 top-[755px]，高度拓宽为 96px，彻底充盈下半区) --- */}
        {isAct3Active && (
          <div className="absolute top-[755px] inset-x-0 flex justify-center gap-7 z-30 px-12">
            {metrics.map((m, i) => {
              const badgeSpring = spring({
                frame: frame - 455 - i * 10,
                fps,
                config: {damping: 13, stiffness: 130, mass: 0.8},
              });

              return (
                <div
                  key={i}
                  className="flex items-center gap-4 px-6 py-4 rounded-3xl border-2 shadow-2xl select-none"
                  style={{
                    width: 410,
                    height: 96,
                    borderColor: m.color,
                    backgroundColor: '#ffffff',
                    transform: `scale(${badgeSpring}) translateY(${interpolate(
                      badgeSpring,
                      [0, 1],
                      [30, 0]
                    )}px)`,
                    boxShadow: `0 24px 40px -10px ${m.color}35, 0 6px 16px -2px rgba(0, 0, 0, 0.06)`,
                  }}
                >
                  <span className="text-5xl shrink-0">{m.icon}</span>
                  <div className="flex flex-col justify-center">
                    <div className="flex items-center gap-2.5">
                      <span className="font-black text-slate-900 text-[17px] tracking-tight">
                        {m.title}
                      </span>
                      <span
                        className="text-[9.5px] font-mono px-2 py-0.5 rounded-full font-bold"
                        style={{color: m.color, backgroundColor: `${m.color}18`}}
                      >
                        {m.tag}
                      </span>
                    </div>
                    <div className="text-[12px] text-slate-600 font-medium mt-1">
                      {m.sub}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 固定 HUD 前景层：底部旁白字幕条 (固定于 Y: 990px，与上方徽章保留优雅呼吸感) */}
      <SubtitleBanner text={currentSubtitle} startFrame={10} bottomPx={32} />
    </AbsoluteFill>
  );
};
