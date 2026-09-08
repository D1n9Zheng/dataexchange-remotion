import React from 'react';
import {ParsedOrderReveal} from '../components/ParsedOrderReveal';
import {Freeze, Sequence, useCurrentFrame} from 'remotion';
import {ramp, recordingStyle, RecordingStage, RecordingShotLayer} from '../components/RecordingStage';
import type {RecordingShot} from '../components/RecordingStage';
import {Scene04ConnectorUpload} from './Scene04ConnectorUpload';
import {FULL_TIMING} from '../timeline/timing';

export const SCENE04_SHOTS: RecordingShot[] = [
  {clip: 'parse', seconds: 5, sourceSize: [1740, 680], highlight: {x: 874 / 1740, y: 14 / 680, width: 848 / 1740, height: 666 / 680, from: 1.5}},
];

export const Scene05ProtocolParse: React.FC = () => {
  const frame = useCurrentFrame();
  return <>
    <RecordingStage title="内置 EDIFACT、X12 等多种主流业务协议" minimal step={1}>
      <Sequence from={180} durationInFrames={315}>
        <RecordingShotLayer shot={SCENE04_SHOTS[0]} first />
      </Sequence>
      <Sequence from={480} durationInFrames={300}>
        <ParsedOrderReveal shot={SCENE04_SHOTS[0]} />
      </Sequence>
      {frame < 195 && <div style={{position: 'absolute', inset: '210px 0 0', background: '#FBFBFD', opacity: 1 - ramp(frame, 180, 195)}}>
        <div style={{position: 'absolute', left: 120, right: 120, top: 150, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24}}>
          {[
            {name: 'EDIFACT', examples: 'ORDERS · DESADV · INVOIC'},
            {name: 'X12', examples: '850 · 855 · 856 · 810'},
            {name: 'SAP IDoc', examples: 'ORDERS · ORDRSP · DESADV'},
            {name: '海关报文', examples: 'CUSDEC · CUSRES · CUSCAR'},
          ].map(({name, examples}, i) => <div key={name} style={{height: 190, padding: '30px 40px', borderRadius: 28, background: '#F0F5FB', opacity: ramp(frame, 30 + i * 8, 55 + i * 8), transform: `translateY(${14 * (1-ramp(frame,30+i*8,55+i*8))}px)`}}>
            <div style={{color: recordingStyle.blue, fontSize: 56, fontWeight: 600, lineHeight: 1.2}}>{name}</div>
            <div style={{marginTop: 18, fontSize: 25, color: recordingStyle.muted}}>{examples}</div>
          </div>)}
        </div>
      </div>}
    </RecordingStage>
    {frame < 24 && <div style={{position: 'absolute', inset: 0, opacity: 1-ramp(frame,0,24), pointerEvents: 'none'}}>
      <Freeze frame={FULL_TIMING.connectorAndUpload-1}><Scene04ConnectorUpload /></Freeze>
    </div>}
  </>;
};
