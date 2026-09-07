import React from 'react';
import {AbsoluteFill, Easing, Freeze, interpolate, OffthreadVideo, Sequence, staticFile, useCurrentFrame} from 'remotion';

export const recordingStyle = {
  ink: '#1D1D1F', muted: '#6E6E73', blue: '#0071E3', border: '#DCE6F1',
  ease: Easing.bezier(0.22, 1, 0.36, 1),
  font: '-apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif',
};
const clamp = {extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const};
export const ramp = (frame: number, start: number, end: number) =>
  interpolate(frame, [start, end], [0, 1], {...clamp, easing: recordingStyle.ease});

export interface RecordingShot {
  clip: string;
  seconds: number;
  layout?: 'wide' | 'detail' | 'portrait';
  heading?: string;
  lines?: string[];
  footnote?: string;
  /** Normalized coordinates in the cropped source, not the letterboxed window. */
  highlight?: {x: number; y: number; width: number; height: number; from?: number; to?: number};
  sourceSize: [number, number];
}

export const RecordingShotLayer: React.FC<{shot: RecordingShot; first: boolean}> = ({shot, first}) => {
  const frame = useCurrentFrame();
  const layout = shot.layout ?? 'wide';
  const rect = layout === 'wide' ? [120, 254, 1680, 680] : layout === 'portrait' ? [1050, 215, 750, 725] : [805, 240, 995, 700];
  const [x, y, width, height] = rect;
  const factor = Math.min((width - 36) / shot.sourceSize[0], (height - 36) / shot.sourceSize[1]);
  const vw = factor * shot.sourceSize[0];
  const vh = factor * shot.sourceSize[1];
  const zoom = interpolate(ramp(frame, 12, Math.min(100, shot.seconds * 60 - 20)), [0, 1], [1, 1.025]);
  const mark = shot.highlight;
  const markOpacity = mark ? interpolate(frame, [(mark.from ?? 0.6) * 60, (mark.from ?? 0.6) * 60 + 18, (mark.to ?? shot.seconds - 0.2) * 60, (mark.to ?? shot.seconds - 0.2) * 60 + 12], [0, 1, 1, 0], clamp) : 0;
  return <AbsoluteFill style={{opacity: first ? 1 : ramp(frame, 0, 15)}}>
    {/* An opaque backing dissolves the complete shot, avoiding double-exposed text. */}
    <div style={{position: 'absolute', inset: '210px 0 128px', background: '#FBFBFD'}} />
    {layout !== 'wide' && <div style={{position: 'absolute', left: 120, top: 350, width: layout === 'portrait' ? 800 : 610, transform: `translateY(${(1 - ramp(frame, 8, 42)) * 16}px)`, opacity: ramp(frame, 5, 35)}}>
      <div style={{fontSize: 34, fontWeight: 550, lineHeight: 1.3, letterSpacing: '-0.03em', marginBottom: 34}}>{shot.heading}</div>
      {shot.lines?.map((line, i) => <div key={line} style={{fontSize: i === 0 ? 38 : 40, lineHeight: 1.8, fontWeight: 550, color: i === 0 ? recordingStyle.muted : recordingStyle.blue, opacity: ramp(frame, 22 + i * 18, 45 + i * 18)}}>{line}</div>)}
    </div>}
    <div style={{position: 'absolute', left: x, top: y, width, height, borderRadius: 28, overflow: 'hidden', background: '#F7FAFD', border: `1px solid ${recordingStyle.border}`, boxShadow: '0 24px 65px -32px rgba(0,63,130,0.24)'}}>
      <div style={{position: 'absolute', left: (width - vw) / 2, top: (height - vh) / 2, width: vw, height: vh, transform: `scale(${zoom})`}}>
        <OffthreadVideo src={staticFile(`edited/${shot.clip}.mp4`)} muted style={{width: '100%', height: '100%', display: 'block'}} />
        {mark && <div style={{position: 'absolute', left: mark.x * vw, top: mark.y * vh, width: mark.width * vw, height: mark.height * vh, border: `3px solid ${recordingStyle.blue}`, borderRadius: 12, background: 'rgba(0,113,227,0.035)', opacity: markOpacity, boxShadow: '0 0 0 5px rgba(0,113,227,0.07)', pointerEvents: 'none'}} />}
      </div>
    </div>
  </AbsoluteFill>;
};

export const RecordingStage: React.FC<{
  title: string; subtitle: string; step: number; shots?: RecordingShot[]; transitionFrom?: RecordingShot; children?: React.ReactNode;
}> = ({title, subtitle, step, shots = [], transitionFrom, children}) => {
  const frame = useCurrentFrame();
  let offset = 0;
  return <AbsoluteFill style={{background: '#FBFBFD', color: recordingStyle.ink, fontFamily: recordingStyle.font, overflow: 'hidden'}}>
    {transitionFrom && <Sequence durationInFrames={15}>
      <Freeze frame={Math.round(transitionFrom.seconds * 60) - 1}>
        <RecordingShotLayer shot={transitionFrom} first />
      </Freeze>
    </Sequence>}
    {shots.map((shot, index) => {
      const from = offset;
      offset += Math.round(shot.seconds * 60);
      return <Sequence key={`${shot.clip}-${index}`} from={from} durationInFrames={Math.round(shot.seconds * 60) + 15}>
        <RecordingShotLayer shot={shot} first={index === 0 && !transitionFrom} />
      </Sequence>;
    })}
    {children}
    <div style={{position: 'absolute', left: 120, top: 88, opacity: ramp(frame, 0, 24), transform: `translateY(${(1 - ramp(frame, 0, 30)) * 12}px)`}}>
      <div style={{fontSize: 56, fontWeight: 650, letterSpacing: '-0.035em', lineHeight: 1.15}}>{title}</div>
      <div style={{marginTop: 20, fontSize: 25, color: recordingStyle.muted}}>{subtitle}</div>
    </div>
    <div style={{position: 'absolute', right: 124, top: 111, display: 'flex', alignItems: 'center', gap: 10, color: recordingStyle.muted, fontSize: 18}}>
      <span style={{width: 7, height: 7, borderRadius: '50%', background: recordingStyle.blue}} />数据交换工具
    </div>
    <div style={{position: 'absolute', left: 124, right: 124, bottom: 96, display: 'flex', alignItems: 'center', gap: 24}}>
      {['接入', '解析', '映射', '预览', '运行'].map((label, index) => <React.Fragment key={label}>
        {index > 0 && <span style={{height: 1, width: 62, background: '#D2D2D7'}} />}
        <span style={{fontSize: 21, fontWeight: step === index ? 650 : 450, color: step === index ? recordingStyle.blue : '#8B929A'}}>{label}</span>
      </React.Fragment>)}
      <span style={{marginLeft: 'auto', fontSize: 18, color: '#8B929A'}}>EDIFACT ORDERS → JSON</span>
    </div>
  </AbsoluteFill>;
};
