import React from 'react';
import {RecordingStage} from '../components/RecordingStage';

import type {RecordingShot} from '../components/RecordingStage';
import {SCENE05_SHOTS} from './Scene06AiMapping';

export const SCENE06_SHOTS: RecordingShot[] = [
    {clip: 'preview', seconds: 4, layout: 'portrait', sourceSize: [700, 950], heading: '原始、解析、转换后', lines: ['切换查看', '结果可预览'], footnote: '真实结果保留空值与字段状态，便于运行前检查。'},
    {clip: 'preview-detail', seconds: 4, layout: 'detail', sourceSize: [610, 480], highlight: {x: 0.015, y: 0.23, width: 0.75, height: 0.20, from: 0.6, to: 3.6}, heading: '关注真正要交付的数据', lines: ['订单号  PO-123456', '交货日期  2024-09-15'], footnote: '交货日期已呈现为转换后的日期格式。'},
    {clip: 'saved', seconds: 2, sourceSize: [1780, 480]},
  ];

export const Scene07ResultPreview: React.FC = () => <RecordingStage
  title="运行之前，先看转换结果"
  subtitle="对照关键业务值，再保存本次配置"
  step={3}
  transitionFrom={SCENE05_SHOTS.at(-1)}
  shots={SCENE06_SHOTS}
/>;
