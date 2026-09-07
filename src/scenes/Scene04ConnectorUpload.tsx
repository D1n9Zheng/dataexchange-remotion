import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {CONNECTION_LAYOUT, CONNECTION_BEATS} from '../content/connection-layout';
import {ConnectionHub} from '../components/ConnectionHub';
import {ramp, recordingStyle} from '../components/RecordingStage';

const blue = recordingStyle.blue;
const {source, hub, target, region} = CONNECTION_LAYOUT;
const rows = source.centersY;
const sourceX = source.x + source.width;
const hubY = hub.y + hub.height / 2;
const outputX = hub.x + hub.width;
const outputStart = 610;
const lineFade = 24;
const sendDelay = 36;
const clamp = {extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const};

const curvePoint = (p: number, y: number) => ({
  x: (1-p)**3*sourceX + 3*(1-p)**2*p*740 + 3*(1-p)*p*p*730 + p**3*hub.x,
  y: (1-p)**3*y + 3*(1-p)**2*p*y + 3*(1-p)*p*p*hubY + p**3*hubY,
});
const labels = ['SFTP', 'API', '数据库'];

const AccessIcon: React.FC<{kind: number}> = ({kind}) => <svg width="52" height="52" viewBox="0 0 52 52" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
  {kind === 0 ? <><path d="M14 6h17l9 10v30H14z"/><path d="M30 6v12h10M21 28h12M21 35h12"/></> : kind === 1 ? <><path d="m17 15-11 11 11 11M35 15l11 11-11 11M29 10l-6 32"/></> : <><ellipse cx="26" cy="12" rx="17" ry="7"/><path d="M9 12v27c0 9 34 9 34 0V12M9 25c0 9 34 9 34 0"/></>}
</svg>;

/** Shared with S04 so its opening dissolves the actual S03 terminal frame. */
export const Scene04ConnectorUpload: React.FC = () => {
  const frame = useCurrentFrame();
  const focusSftp = ramp(frame, 180, 204) * (1 - ramp(frame, 420, 444));
  const focusData = ramp(frame, CONNECTION_BEATS[1].start, CONNECTION_BEATS[1].start + lineFade);
  const emphasisFor = (i: number) => {
    if (i === 0) return 1 - focusData * 0.8;
    const active = ramp(frame, CONNECTION_BEATS[i].start, CONNECTION_BEATS[i].start + lineFade);
    return 1 - ramp(frame, CONNECTION_BEATS[0].start, CONNECTION_BEATS[0].start + lineFade) * 0.85 * (1 - active);
  };
  const follow = ramp(frame, 670, 825);
  return <AbsoluteFill style={{background: '#FBFBFD', color: recordingStyle.ink, fontFamily: recordingStyle.font}}>
    <div style={{position: 'absolute', left: 120, top: 105, opacity: ramp(frame, 20, 65)}}>
      <div style={{fontSize: 60, fontWeight: 650, letterSpacing: '-0.04em'}}>不同系统，统一连接</div>
    </div>
    <div style={{position: 'absolute', inset: 0, transformOrigin: `${target.x}px ${hubY}px`, transform: `translateX(${-210 * follow}px) scale(${1 + 0.16 * follow})`}}>
      <div style={{position: 'absolute', left: 125, top: region.y, width: 490, height: region.height, borderRadius: 36, background: '#F0F5FB', opacity: focusSftp}} />
      <div style={{position: 'absolute', left: 705, top: region.y, width: 1090, height: region.height, borderRadius: 36, background: '#F0F5FB', opacity: focusSftp}} />
      <div style={{position: 'absolute', left: 170, top: region.labelY, fontSize: 22, color: recordingStyle.muted, opacity: focusSftp}}>外部网络</div>
      <div style={{position: 'absolute', left: 750, top: region.labelY, fontSize: 22, color: recordingStyle.muted, opacity: focusSftp}}>企业网络</div>
      <svg width="1920" height="1080" style={{position: 'absolute', inset: 0}}>
        {rows.map((y, i) => {
          const beat = CONNECTION_BEATS[i];
          const enter = ramp(frame, beat.start, beat.start + lineFade);
          const send = beat.start + sendDelay;
          const p = interpolate(frame, [send, send + beat.travel], [0, 1], clamp);
          const point = curvePoint(p, y);
          const path = `M ${sourceX} ${y} C 740 ${y}, 730 ${hubY}, ${hub.x} ${hubY}`;
          return <g key={y} opacity={enter * emphasisFor(i) * (1 - ramp(frame, 690, 780))}>
            <path d={path} fill="none" stroke={blue} strokeWidth="3" />
            <rect x={point.x-12} y={point.y-9} width={24} height={18} rx={5} fill={blue}
              opacity={ramp(frame,send,send+10)*(1-ramp(frame,send+beat.travel-10,send+beat.travel))}/>
          </g>;
        })}
        <path d={`M${outputX} ${hubY}H${target.x}`} fill="none" stroke={blue} strokeWidth="3"
          opacity={ramp(frame, outputStart, outputStart + lineFade)}/>
        <rect
          x={interpolate(frame, [690, 795], [outputX, target.x], clamp) - 12}
          y={hubY-9} width={24} height={18} rx={5} fill={blue}
          opacity={ramp(frame, 690, 705) * (1 - ramp(frame, 780, 795))}
        />
      </svg>
      {rows.map((y, i) => <div key={y} style={{position:'absolute', left: source.x, top: y-source.height/2, width:source.width, height:source.height, display:'flex', alignItems:'center', gap:25, paddingLeft:30, borderRadius:24, background:'white', border:'1px solid #DCE6F1', color:blue, opacity:ramp(frame,20+i*30,60+i*30)*emphasisFor(i)*(1-ramp(frame,660,720)), transform:`translateX(${(1-ramp(frame,20+i*30,70+i*30))*-25}px)`}}>
        <AccessIcon kind={i}/><span style={{fontSize:34,fontWeight:600}}>{labels[i]}</span>
      </div>)}
      <ConnectionHub />
      <div style={{position:'absolute',left:target.x,top:target.y,width:target.width,height:target.height,borderRadius:24,border:'1px solid #DCE6F1',background:'white',display:'flex',alignItems:'center',justifyContent:'center',fontSize:32,fontWeight:600,opacity:ramp(frame,outputStart,outputStart+lineFade)}}>目标系统</div>
    </div>

  </AbsoluteFill>;

};
