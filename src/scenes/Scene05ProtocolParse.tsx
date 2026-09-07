import React from 'react';
import {Freeze, useCurrentFrame} from 'remotion';
import {ramp} from '../components/RecordingStage';
import {RecordingStage} from '../components/RecordingStage';

import type {RecordingShot} from '../components/RecordingStage';
import {Scene04ConnectorUpload} from './Scene04ConnectorUpload';
import {FULL_TIMING} from '../timeline/timing';

export const SCENE04_SHOTS: RecordingShot[] = [
    {clip: 'parse', seconds: 5, sourceSize: [1740, 680], highlight: {x: 0.535, y: 0.08, width: 0.43, height: 0.82, from: 1.5}},
    {clip: 'parse-detail', seconds: 6, layout: 'detail', sourceSize: [780, 510], heading: '报文里的订单，有了结构', lines: ['采购订单号', 'PO-123456'], footnote: '原始报文与解析结果保留对应关系，便于继续映射与转换。'},
  ];

export const Scene05ProtocolParse: React.FC = () => {
  const frame = useCurrentFrame();
  return <><RecordingStage
  title="从原始报文，到清晰结构"
  subtitle="识别 EDIFACT ORDERS，展开订单字段"
  step={1}
  shots={SCENE04_SHOTS}
/><div style={{position: 'absolute', inset: 0, opacity: 1 - ramp(frame, 0, 24), pointerEvents: 'none'}}>{frame < 24 && <Freeze frame={FULL_TIMING.connectorAndUpload - 1}><Scene04ConnectorUpload /></Freeze>}</div></>;
};
