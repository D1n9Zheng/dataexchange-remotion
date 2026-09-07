import React from 'react';
import {SCENE06_SHOTS} from './Scene07ResultPreview';
import {AbsoluteFill, interpolate, Sequence, useCurrentFrame} from 'remotion';
import {RecordingStage, RecordingShotLayer, ramp, recordingStyle} from '../components/RecordingStage';

const Flow: React.FC = () => {
  const frame = useCurrentFrame();
  const progress = ramp(frame, 10, 118);
  const stages = ['接收', '解析', '映射', '转换', '投递'];
  return <AbsoluteFill style={{opacity: ramp(frame, 0, 15)}}>
    <div style={{position: 'absolute', inset: '210px 0 128px', background: '#FBFBFD'}} />
    <div style={{position: 'absolute', left: 120, top: 320, right: 120, textAlign: 'center', color: recordingStyle.muted, fontSize: 26}}>订单传输 · 按已配置规则运行</div>
    <svg width="1920" height="1080" style={{position: 'absolute', inset: 0}}>
      <path d="M 300 565 H 1620" stroke="#DCE6F1" strokeWidth="3" />
      <path d="M 300 565 H 1620" stroke={recordingStyle.blue} strokeWidth="3" pathLength="1" strokeDasharray="1" strokeDashoffset={1 - progress} />
    </svg>
    {[{x: 145, title: '源端文件', format: 'SFTP · EDI'}, {x: 1485, title: '目标数据库', format: 'JDBC · JSON'}].map(node => <div key={node.title} style={{position: 'absolute', left: node.x, top: 495, width: 290, padding: '27px 0', textAlign: 'center', background: 'white', border: '1px solid #DCE6F1', borderRadius: 26}}>
      <div style={{fontSize: 29, fontWeight: 600}}>{node.title}</div><div style={{fontSize: 20, color: recordingStyle.muted, marginTop: 10}}>{node.format}</div>
    </div>)}
    {stages.map((stage, index) => {
      const active = progress >= (index + 1) / 6;
      return <div key={stage} style={{position: 'absolute', left: 520 + index * 178, top: 510, width: 152, height: 112, borderRadius: 24, background: active ? '#EDF6FF' : '#FFFFFF', border: `1px solid ${active ? recordingStyle.blue : '#DCE6F1'}`, display: 'grid', placeItems: 'center', color: active ? recordingStyle.blue : recordingStyle.muted, fontSize: 26, fontWeight: 600}}>{stage}</div>;
    })}
    <div style={{position: 'absolute', left: interpolate(progress, [0, 1], [310, 1600]), top: 677, width: 14, height: 14, borderRadius: 7, background: recordingStyle.blue}} />
    <div style={{position: 'absolute', top: 760, left: 0, right: 0, textAlign: 'center', fontSize: 23, color: recordingStyle.muted}}>接入与投递，由同一条任务串联</div>
  </AbsoluteFill>;
};

export const Scene08ExchangeFlow: React.FC = () => <RecordingStage
  title="规则进入任务，数据开始流转"
  subtitle="启动订单传输，再查看实际执行结果"
  step={4}
  transitionFrom={SCENE06_SHOTS.at(-1)}
>
  <Sequence durationInFrames={165}>
    <RecordingShotLayer first={false} shot={{clip: 'activate', seconds: 2.5, sourceSize: [1780, 400]}} />
  </Sequence>
  <Sequence from={150} durationInFrames={165}><Flow /></Sequence>
  <Sequence from={300} durationInFrames={240}>
    <RecordingShotLayer first={false} shot={{clip: 'execution', seconds: 4, layout: 'detail', sourceSize: [1010, 450], heading: '这一次执行，已有记录', lines: ['成功 1 · 失败 0', '执行历史可查看'], footnote: '本次订单任务的执行结果，可在执行历史中查看。'}} />
  </Sequence>
</RecordingStage>;
