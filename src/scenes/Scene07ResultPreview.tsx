import React from 'react';
import {Freeze, OffthreadVideo, staticFile, useCurrentFrame} from 'remotion';
import {ramp} from '../components/RecordingStage';
import {FULL_TIMING} from '../timeline/timing';
import {RecordingStage} from '../components/RecordingStage';

import type {RecordingShot} from '../components/RecordingStage';
import {Scene06AiMapping} from './Scene06AiMapping';

export const SCENE06_SHOTS: RecordingShot[] = [
    {clip: 'preview', seconds: 4, layout: 'portrait', sourceSize: [700, 950], heading: '原始、解析、转换后', lines: ['切换查看', '结果可预览'], footnote: '真实结果保留空值与字段状态，便于运行前检查。'},
    {clip: 'preview-detail', seconds: 4, layout: 'detail', sourceSize: [610, 480], highlight: {x: 0.015, y: 0.23, width: 0.75, height: 0.20, from: 0.6, to: 3.6}, heading: '关注真正要交付的数据', lines: ['订单号  PO-123456', '交货日期  2024-09-15'], footnote: '交货日期已呈现为转换后的日期格式。'},
    {clip: 'saved', seconds: 2, sourceSize: [1780, 480]},
  ];

export const Scene07ResultPreview: React.FC = () => {
  const frame = useCurrentFrame();
  const enter = ramp(frame, 0, 30);
  const settle = 1 - 0.06 * ramp(frame, 285, 345);
  return <>
    <RecordingStage title="从连接到转换，让业务数据顺畅流转" minimal step={3}>
      <div style={{position:'absolute',left:540,top:230,width:840,height:726,overflow:'hidden',borderRadius:28,border:'1px solid #DCE6F1',background:'#FFFFFF',boxShadow:'0 24px 65px -32px rgba(0,63,130,0.24)',opacity:enter,transform:`scale(${(0.97+0.03*enter)*settle})`}}>
        {/* R04 converted-data tab, with the product header and workflow controls cropped away. */}
        <Freeze frame={180}><OffthreadVideo muted src={staticFile('edited/preview.mp4')} style={{position:'absolute',left:0,top:-345*1.2,width:840,height:950*1.2,maxWidth:'none'}}/></Freeze>
      </div>
    </RecordingStage>
    {frame < 24 && <div style={{position:'absolute',inset:0,opacity:1-ramp(frame,0,24)}}><Freeze frame={FULL_TIMING.aiMapping-1}><Scene06AiMapping /></Freeze></div>}
  </>;
};
