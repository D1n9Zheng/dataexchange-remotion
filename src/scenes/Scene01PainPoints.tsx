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

interface SystemNode {
  id: string;
  name: string;
  x: number;
  y: number;
  width: number;
  entryFrame: number;
  side: 'left' | 'right';
}

interface Connection {
  from: number;
  to: number;
  startFrame: number;
  format?: string;
  channel?: string;
  late?: boolean;
}

const LEFT_NODES: SystemNode[] = [
  {id: 'customer', name: '客户系统', x: 328, y: 286, width: 260, entryFrame: 18, side: 'left'},
  {id: 'supplier', name: '供应商系统', x: 276, y: 530, width: 286, entryFrame: 72, side: 'left'},
  {id: 'external', name: '海关 / 外部平台', x: 358, y: 774, width: 320, entryFrame: 128, side: 'left'},
];

const RIGHT_NODES: SystemNode[] = [
  {id: 'erp', name: 'ERP', x: 1606, y: 218, width: 230, entryFrame: 34, side: 'right'},
  {id: 'wms', name: 'WMS', x: 1650, y: 420, width: 238, entryFrame: 88, side: 'right'},
  {id: 'oms', name: 'OMS', x: 1580, y: 630, width: 226, entryFrame: 142, side: 'right'},
  {id: 'tms', name: 'TMS', x: 1636, y: 834, width: 242, entryFrame: 194, side: 'right'},
];

// 前五条链路承载五种数据格式；后四条只负责呈现连接规模增长。
const CONNECTIONS: Connection[] = [
  {from: 0, to: 2, startFrame: 90, format: 'JSON', channel: 'REST API'},
  {from: 2, to: 3, startFrame: 148, format: 'XML', channel: 'REST API'},
  {from: 1, to: 1, startFrame: 206, format: 'CSV', channel: 'SFTP'},
  {from: 0, to: 0, startFrame: 264, format: 'X12', channel: 'SFTP'},
  {from: 1, to: 0, startFrame: 322, format: 'EDIFACT', channel: 'SFTP'},
  {from: 0, to: 1, startFrame: 326, late: true},
  {from: 1, to: 2, startFrame: 356, late: true},
  {from: 2, to: 1, startFrame: 386, late: true},
  {from: 0, to: 3, startFrame: 416, late: true},
];

const clamp = {extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const};
const ease = Easing.bezier(0.16, 1, 0.3, 1);

const cubicPoint = (
  t: number,
  p0: {x: number; y: number},
  p1: {x: number; y: number},
  p2: {x: number; y: number},
  p3: {x: number; y: number}
) => {
  const mt = 1 - t;
  return {
    x: mt ** 3 * p0.x + 3 * mt ** 2 * t * p1.x + 3 * mt * t ** 2 * p2.x + t ** 3 * p3.x,
    y: mt ** 3 * p0.y + 3 * mt ** 2 * t * p1.y + 3 * mt * t ** 2 * p2.y + t ** 3 * p3.y,
  };
};

const NetworkNode: React.FC<{node: SystemNode; frame: number; fps: number}> = ({node, frame, fps}) => {
  const progress = spring({
    frame: frame - node.entryFrame,
    fps,
    config: {damping: 24, stiffness: 125, mass: 0.85},
  });
  const slide = node.side === 'left' ? -20 : 20;

  return (
    <div
      className="absolute z-30 flex h-[108px] items-center rounded-[30px] border border-[#dbeafe] bg-white/90 px-7 backdrop-blur-2xl"
      style={{
        left: node.x - node.width / 2,
        top: node.y - 54,
        width: node.width,
        opacity: progress,
        transform: `translateX(${interpolate(progress, [0, 1], [slide, 0])}px) scale(${interpolate(progress, [0, 1], [0.96, 1])})`,
        boxShadow: '0 30px 72px -40px rgba(0,113,227,0.32), 0 10px 28px -22px rgba(0,102,204,0.22), inset 0 1px 0 rgba(255,255,255,0.98)',
      }}
    >
      <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#f3f8ff] ring-1 ring-[#0071e3]/10">
        <span
          className="h-4 w-4 rounded-full"
          style={{
            background: node.side === 'left'
              ? 'linear-gradient(135deg, #0066cc, #2997ff)'
              : 'linear-gradient(135deg, #0071e3, #64b5ff)',
            boxShadow: '0 0 18px rgba(0,113,227,0.32)',
          }}
        />
      </div>
      <div className="ml-4 text-[24px] font-semibold tracking-[-0.035em] text-[#1d1d1f]">{node.name}</div>
    </div>
  );
};

export const Scene01PainPoints: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const networkScale = interpolate(frame, [0, 230], [1.06, 1], {...clamp, easing: ease});
  const complexity = interpolate(frame, [300, 420], [0, 1], {...clamp, easing: ease});
  const conclusionOpacity = interpolate(frame, [370, 402, 458, 479], [0, 1, 1, 0], clamp);

  return (
    <AbsoluteFill className="overflow-hidden bg-[#fbfbfd] font-sans text-[#1d1d1f] select-none">
      <LightBackground glowIntensity={1.04 + complexity * 0.2} />

      <div
        className="absolute left-1/2 top-1/2 h-[640px] w-[980px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[130px]"
        style={{
          opacity: 0.24 + complexity * 0.28,
          background: 'radial-gradient(circle at 46% 46%, rgba(0,113,227,0.22), rgba(41,151,255,0.11) 40%, rgba(100,181,255,0.055) 60%, transparent 76%)',
        }}
      />

      <div
        className="absolute inset-0"
        style={{transform: `scale(${networkScale})`, transformOrigin: '50% 52%'}}
      >
        <div
          className="absolute inset-x-0 top-[64px] z-40 flex justify-center text-center"
          style={{
            opacity: conclusionOpacity,
            transform: `translateY(${interpolate(conclusionOpacity, [0, 1], [12, 0])}px)`,
          }}
        >
          <div className="text-[62px] font-bold leading-none tracking-[-0.052em]">连接越多，数据交换越复杂</div>
        </div>

        <svg className="absolute inset-0 z-10 h-full w-full pointer-events-none" aria-hidden="true">
          <defs>
            <linearGradient id="primaryConnection" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0066cc" />
              <stop offset="58%" stopColor="#0071e3" />
              <stop offset="100%" stopColor="#64b5ff" />
            </linearGradient>
            <linearGradient id="lateConnection" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2997ff" />
              <stop offset="100%" stopColor="#8ac8ff" />
            </linearGradient>
          </defs>
          {CONNECTIONS.map((connection, index) => {
            const source = LEFT_NODES[connection.from];
            const target = RIGHT_NODES[connection.to];
            const p0 = {x: source.x + source.width / 2, y: source.y};
            const p1 = {x: 690, y: source.y};
            const p2 = {x: 1230, y: target.y};
            const p3 = {x: target.x - target.width / 2, y: target.y};
            const lineProgress = interpolate(
              frame,
              [connection.startFrame, connection.startFrame + 66],
              [0, 1],
              {...clamp, easing: Easing.out(Easing.cubic)}
            );
            const isPrimary = index === 0;

            return (
              <path
                key={`${source.id}-${target.id}-${index}`}
                d={`M ${p0.x} ${p0.y} C ${p1.x} ${p1.y}, ${p2.x} ${p2.y}, ${p3.x} ${p3.y}`}
                fill="none"
                stroke={connection.late ? 'url(#lateConnection)' : isPrimary ? 'url(#primaryConnection)' : '#9bc8f4'}
                strokeWidth={isPrimary ? 3 : connection.late ? 2 : 1.5}
                strokeLinecap="round"
                pathLength={1}
                strokeDasharray="1"
                strokeDashoffset={1 - lineProgress}
                opacity={lineProgress * (connection.late ? 0.48 : isPrimary ? 0.78 : 0.42)}
              />
            );
          })}
        </svg>

        {/* 数据格式和接入方式只跟随数据包短暂出现，不形成常驻信息墙。 */}
        {CONNECTIONS.slice(0, 5).map((connection, index) => {
          const source = LEFT_NODES[connection.from];
          const target = RIGHT_NODES[connection.to];
          const p0 = {x: source.x + source.width / 2, y: source.y};
          const p1 = {x: 690, y: source.y};
          const p2 = {x: 1230, y: target.y};
          const p3 = {x: target.x - target.width / 2, y: target.y};
          const travel = interpolate(
            frame,
            [connection.startFrame + 8, connection.startFrame + 158],
            [0, 1],
            {...clamp, easing: Easing.inOut(Easing.cubic)}
          );
          const point = cubicPoint(travel, p0, p1, p2, p3);
          const labelOpacity = interpolate(
            frame,
            [connection.startFrame + 8, connection.startFrame + 26, connection.startFrame + 138, connection.startFrame + 158],
            [0, 1, 1, 0],
            clamp
          );

          return (
            <div
              key={`${connection.format}-${index}`}
              className="absolute z-20 flex min-h-[48px] items-center rounded-full border border-[#0071e3]/15 bg-white/95 py-3 pl-[18px] pr-4 backdrop-blur-xl"
              style={{
                left: point.x,
                top: point.y,
                opacity: labelOpacity,
                transform: 'translate(-50%, -50%)',
                color: '#0066cc',
                boxShadow: '0 18px 42px -22px rgba(0,113,227,0.52), 0 5px 18px -14px rgba(0,102,204,0.3)',
              }}
            >
              <span className="font-mono text-[16px] font-bold tracking-[-0.02em]">
                {connection.format}
              </span>
              <span className="mx-3 h-4 w-px bg-[#0071e3]/20" />
              <span className="font-mono text-[13px] font-semibold text-[#4d8bc8]">{connection.channel}</span>
            </div>
          );
        })}

        {LEFT_NODES.map((node) => <NetworkNode key={node.id} node={node} frame={frame} fps={fps} />)}
        {RIGHT_NODES.map((node) => <NetworkNode key={node.id} node={node} frame={frame} fps={fps} />)}

        {/* 复杂阶段只增加少量沿新增链路运动的流光。 */}
        {CONNECTIONS.filter((connection) => connection.late).slice(0, 3).map((connection, index) => {
          const source = LEFT_NODES[connection.from];
          const target = RIGHT_NODES[connection.to];
          const p0 = {x: source.x + source.width / 2, y: source.y};
          const p1 = {x: 690, y: source.y};
          const p2 = {x: 1230, y: target.y};
          const p3 = {x: target.x - target.width / 2, y: target.y};
          const travel = ((Math.max(0, frame - connection.startFrame) + index * 36) % 150) / 150;
          const point = cubicPoint(travel, p0, p1, p2, p3);

          return (
            <span
              key={`${connection.from}-${connection.to}-${index}`}
              className="absolute z-20 h-2 w-2 rounded-full bg-[#2997ff]"
              style={{
                left: point.x - 4,
                top: point.y - 4,
                opacity: complexity * 0.65,
                boxShadow: '0 0 16px rgba(41,151,255,0.5)',
              }}
            />
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
