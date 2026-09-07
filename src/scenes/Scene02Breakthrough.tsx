import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';
import {ConnectionHub} from '../components/ConnectionHub';
import {LightBackground} from '../components/LightBackground';

interface CarryoverNode {
  id: string;
  name: string;
  x: number;
  y: number;
  width: number;
  side: 'left' | 'right';
}

const NODES: CarryoverNode[] = [
  {id: 'customer', name: '客户系统', x: 328, y: 286, width: 260, side: 'left'},
  {id: 'supplier', name: '供应商系统', x: 276, y: 530, width: 286, side: 'left'},
  {id: 'external', name: '海关 / 外部平台', x: 358, y: 774, width: 320, side: 'left'},
  {id: 'erp', name: 'ERP', x: 1606, y: 218, width: 230, side: 'right'},
  {id: 'wms', name: 'WMS', x: 1650, y: 420, width: 238, side: 'right'},
  {id: 'oms', name: 'OMS', x: 1580, y: 630, width: 226, side: 'right'},
  {id: 'tms', name: 'TMS', x: 1636, y: 834, width: 242, side: 'right'},
];

const LINKS: Array<[number, number]> = [
  [0, 5],
  [2, 6],
  [1, 4],
  [0, 3],
  [1, 3],
  [0, 4],
  [1, 5],
  [2, 4],
  [0, 6],
];

const clamp = {extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const};
const ease = Easing.bezier(0.16, 1, 0.3, 1);

const CarryoverNodeCard: React.FC<{node: CarryoverNode}> = ({node}) => (
  <div
    className="absolute z-20 flex h-[108px] items-center rounded-[30px] border border-[#dbeafe] bg-white/90 px-7 backdrop-blur-2xl"
    style={{
      left: node.x - node.width / 2,
      top: node.y - 54,
      width: node.width,
      boxShadow: '0 30px 72px -40px rgba(0,113,227,0.32), 0 10px 28px -22px rgba(0,102,204,0.22)',
    }}
  >
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#f3f8ff] ring-1 ring-[#0071e3]/10">
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
    <div className="ml-4 text-[24px] font-semibold tracking-[-0.035em] text-[#1d1d1f]">
      {node.name}
    </div>
  </div>
);

const DataChip: React.FC<{
  label: string;
  x: number;
  opacity: number;
}> = ({label, x, opacity}) => (
  <div
    className="absolute left-0 top-[540px] z-30 min-w-[170px] rounded-full border border-[#0071e3]/15 bg-white/95 px-5 py-3 text-center font-mono text-[16px] font-bold text-[#0066cc] backdrop-blur-xl"
    style={{
      opacity,
      transform: `translate(${x}px, -50%)`,
      boxShadow: '0 18px 42px -22px rgba(0,113,227,0.52)',
    }}
  >
    {label}
  </div>
);

export const Scene02Breakthrough: React.FC = () => {
  const frame = useCurrentFrame();

  const collapse = interpolate(frame, [18, 178], [0, 1], {
    ...clamp,
    easing: Easing.inOut(Easing.cubic),
  });
  const networkOpacity = interpolate(frame, [18, 130, 180], [1, 0.32, 0], clamp);
  const networkScale = interpolate(collapse, [0, 1], [1, 0.34]);

  const phraseOneOpacity = interpolate(frame, [34, 54, 112, 142], [0, 1, 1, 0], clamp);
  const phraseTwoOpacity = interpolate(frame, [132, 154, 214, 242], [0, 1, 1, 0], clamp);

  const railOpacity = interpolate(frame, [76, 102, 270, 316], [0, 1, 1, 0], clamp);
  const inputX = interpolate(frame, [112, 214], [510, 795], {...clamp, easing: Easing.inOut(Easing.cubic)});
  const inputOpacity = interpolate(frame, [106, 124, 192, 216], [0, 1, 1, 0], clamp);
  const outputX = interpolate(frame, [204, 284], [1125, 1420], {...clamp, easing: Easing.inOut(Easing.cubic)});
  const outputOpacity = interpolate(frame, [198, 216, 262, 286], [0, 1, 1, 0], clamp);

  const hubOpacity = interpolate(frame, [176, 204], [0, 1], clamp);
  const morph = interpolate(frame, [248, 350], [0, 1], {...clamp, easing: ease});

  return (
    <AbsoluteFill className="overflow-hidden bg-[#fbfbfd] font-sans text-[#1d1d1f] select-none">
      <div style={{opacity: 1 - morph}}><LightBackground glowIntensity={1.08 + collapse * 0.2} /></div>

      <div
        className="absolute left-1/2 top-1/2 h-[620px] w-[940px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[135px]"
        style={{
          opacity: interpolate(frame, [0, 190, 350], [0.28, 0.34, 0], clamp),
          background: 'radial-gradient(circle, rgba(0,113,227,0.2), rgba(41,151,255,0.08) 48%, transparent 76%)',
        }}
      />

      {/* 延续第一幕终帧，再把整个点对点网络向中央收拢。 */}
      <div
        className="absolute inset-0"
        style={{
          opacity: networkOpacity,
          transform: `scale(${networkScale})`,
          transformOrigin: '50% 49%',
        }}
      >
        <svg className="absolute inset-0 h-full w-full pointer-events-none" aria-hidden="true">
          {LINKS.map(([sourceIndex, targetIndex], index) => {
            const source = NODES[sourceIndex];
            const target = NODES[targetIndex];
            const x1 = source.x + source.width / 2;
            const x2 = target.x - target.width / 2;
            return (
              <path
                key={`${source.id}-${target.id}-${index}`}
                d={`M ${x1} ${source.y} C 690 ${source.y}, 1230 ${target.y}, ${x2} ${target.y}`}
                fill="none"
                stroke={index === 0 ? '#0071e3' : '#8fc5f7'}
                strokeWidth={index === 0 ? 3 : 1.7}
                strokeLinecap="round"
                opacity={index === 0 ? 0.78 : 0.5}
              />
            );
          })}
        </svg>
        {NODES.map((node) => <CarryoverNodeCard key={node.id} node={node} />)}
      </div>

      {/* 口播的两个判断分开出现，避免形成标题列表。 */}
      <div
        className="absolute inset-x-0 top-[82px] z-40 text-center text-[60px] font-bold leading-none tracking-[-0.052em]"
        style={{
          opacity: phraseOneOpacity,
          transform: `translateY(${interpolate(phraseOneOpacity, [0, 1], [12, 0])}px)`,
        }}
      >
        连接，更快。
      </div>
      <div
        className="absolute inset-x-0 top-[82px] z-40 text-center text-[60px] font-bold leading-none tracking-[-0.052em]"
        style={{
          opacity: phraseTwoOpacity,
          transform: `translateY(${interpolate(phraseTwoOpacity, [0, 1], [12, 0])}px)`,
        }}
      >
        转换，更准确。
      </div>

      {/* 一条清晰链路承载真实业务语义：EDIFACT ORDERS 输入，JSON 输出。 */}
      <svg
        className="absolute inset-0 z-10 h-full w-full pointer-events-none"
        style={{opacity: railOpacity}}
        aria-hidden="true"
      >
        <path d="M 180 540 C 430 540, 620 540, 795 540" fill="none" stroke="#b9dcfa" strokeWidth={4} strokeLinecap="round" />
        <path d="M 1125 540 C 1300 540, 1490 540, 1740 540" fill="none" stroke="#b9dcfa" strokeWidth={4} strokeLinecap="round" />
      </svg>
      <DataChip label="EDIFACT ORDERS" x={inputX} opacity={inputOpacity} />
      <DataChip label="JSON" x={outputX} opacity={outputOpacity} />

      {/* 产品节点收束到 S03 的位置与材质，跨镜头保持同一对象。 */}
      <div className="absolute inset-0 z-20" style={{opacity: hubOpacity}}>
        <ConnectionHub progress={morph} />
      </div>
    </AbsoluteFill>
  );
};
