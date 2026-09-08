import React from 'react';
import {Freeze, useCurrentFrame} from 'remotion';
import {ramp} from '../components/RecordingStage';
import {FULL_TIMING} from '../timeline/timing';
import {RecordingStage} from '../components/RecordingStage';

import type {RecordingShot} from '../components/RecordingStage';
import {Scene05ProtocolParse} from './Scene05ProtocolParse';

export const SCENE05_SHOTS: RecordingShot[] = [
    {clip: 'suggestions', seconds: 3, layout: 'detail', sourceSize: [1020, 690], heading: '建议与状态，一起呈现', lines: ['查看字段对应关系', '逐项审核'], footnote: '置信度是建议参考，不代表结果已通过验证。'},
    {clip: 'date-review', seconds: 6, layout: 'portrait', sourceSize: [700, 700], heading: '把交货日期转为日期类型', lines: ['读取源值', '→ 类型转换 → 确认保存'], footnote: '实际操作：查看 deliveryDate 的源路径，并确认日期转换规则。'},
    {clip: 'date-confirmed', seconds: 3, layout: 'detail', sourceSize: [1020, 690], heading: '确认一条，继续审核', lines: ['delivery_date', '转换规则已确认'], footnote: '其余字段保留各自状态，支持继续查看和调整。'},
  ];

export const Scene06AiMapping: React.FC = () => {
  const frame = useCurrentFrame();
  return <><RecordingStage
  title="AI 给出建议，人来确认规则"
  subtitle="查看映射关系，按业务需要调整转换方式"
  step={2}
  shots={SCENE05_SHOTS}
/>{frame < 24 && <div style={{position: 'absolute', inset: 0, opacity: 1-ramp(frame,0,24)}}><Freeze frame={FULL_TIMING.protocolParse-1}><Scene05ProtocolParse /></Freeze></div>}</>;
};
