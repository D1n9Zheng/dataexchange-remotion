import React from 'react';
import {Freeze, Sequence, useCurrentFrame} from 'remotion';
import {ramp, recordingStyle, RecordingStage, RecordingShotLayer} from '../components/RecordingStage';
import type {RecordingShot} from '../components/RecordingStage';
import {Scene04ConnectorUpload} from './Scene04ConnectorUpload';
import {FULL_TIMING} from '../timeline/timing';

export const SCENE04_SHOTS: RecordingShot[] = [
  {clip: 'parse', seconds: 5, sourceSize: [1740, 680], highlight: {x: 0.535, y: 0.08, width: 0.43, height: 0.82, from: 1.5}},
  {clip: 'parse-detail', seconds: 5, layout: 'detail', sourceSize: [780, 510], heading: '报文里的订单，有了结构', lines: ['采购订单号', 'PO-123456']},
];

export const Scene05ProtocolParse: React.FC = () => {
  const frame = useCurrentFrame();
  return <>
    <RecordingStage title="读懂报文，呈现业务结构" minimal step={1}>
      <Sequence from={180} durationInFrames={315}>
        <RecordingShotLayer shot={SCENE04_SHOTS[0]} first />
      </Sequence>
      <Sequence from={480} durationInFrames={300}>
        <RecordingShotLayer shot={SCENE04_SHOTS[1]} first={false} />
      </Sequence>
      {frame < 195 && <div style={{position: 'absolute', inset: '210px 0 0', background: '#FBFBFD', opacity: 1 - ramp(frame, 180, 195)}}>
        <div style={{position: 'absolute', left: 120, top: 65, fontSize: 30, color: recordingStyle.muted, opacity: ramp(frame, 20, 45)}}>内置业务协议与报文模板</div>
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
        <div style={{position: 'absolute', left: 120, top: 610, fontSize: 28, color: recordingStyle.muted, opacity: ramp(frame, 65, 90)}}>专有舱单模板：IFCSUM · CN1101 · PENSUM</div>
      </div>}
    </RecordingStage>
    {frame < 24 && <div style={{position: 'absolute', inset: 0, opacity: 1-ramp(frame,0,24), pointerEvents: 'none'}}>
      <Freeze frame={FULL_TIMING.connectorAndUpload-1}><Scene04ConnectorUpload /></Freeze>
    </div>}
  </>;
};
