import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {ConnectionHub} from '../components/ConnectionHub';
import {ramp, recordingStyle} from '../components/RecordingStage';

const blue = recordingStyle.blue;
const rows = [370, 540, 710];
const labels = ['SFTP', 'API', '数据库'];

const AccessIcon: React.FC<{kind: number}> = ({kind}) => <svg width="52" height="52" viewBox="0 0 52 52" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
  {kind === 0 ? <><path d="M14 6h17l9 10v30H14z"/><path d="M30 6v12h10M21 28h12M21 35h12"/></> : kind === 1 ? <><path d="m17 15-11 11 11 11M35 15l11 11-11 11M29 10l-6 32"/></> : <><ellipse cx="26" cy="12" rx="17" ry="7"/><path d="M9 12v27c0 9 34 9 34 0V12M9 25c0 9 34 9 34 0"/></>}
</svg>;

/** Shared with S04 so its opening dissolves the actual S03 terminal frame. */
export const Scene04ConnectorUpload: React.FC = () => {
  const frame = useCurrentFrame();
  const focusSftp = ramp(frame, 165, 205) * (1 - ramp(frame, 395, 435));
  const focusData = ramp(frame, 405, 450);
  const follow = ramp(frame, 670, 825);
  return <AbsoluteFill style={{background: '#FBFBFD', color: recordingStyle.ink, fontFamily: recordingStyle.font}}>
    <div style={{position: 'absolute', left: 120, top: 105, opacity: ramp(frame, 20, 65)}}>
      <div style={{fontSize: 60, fontWeight: 650, letterSpacing: '-0.04em'}}>不同系统，统一连接</div>
    </div>
    <div style={{position: 'absolute', inset: 0, transformOrigin: '1460px 540px', transform: `translateX(${-210 * follow}px) scale(${1 + 0.16 * follow})`}}>
      <div style={{position: 'absolute', left: 125, top: 280, width: 490, height: 540, borderRadius: 36, background: '#F0F5FB', opacity: focusSftp}} />
      <div style={{position: 'absolute', left: 705, top: 280, width: 1090, height: 540, borderRadius: 36, background: '#F0F5FB', opacity: focusSftp}} />
      <div style={{position: 'absolute', left: 170, top: 300, fontSize: 22, color: recordingStyle.muted, opacity: focusSftp}}>外部网络</div>
      <div style={{position: 'absolute', left: 750, top: 300, fontSize: 22, color: recordingStyle.muted, opacity: focusSftp}}>企业网络</div>
      <svg width="1920" height="1080" style={{position: 'absolute', inset: 0}}>
        {rows.map((y, i) => {
          const start = i === 0 ? 180 : 420 + (i - 1) * 45;
          const enter = ramp(frame, start, start + 80);
          const emphasis = i === 0 ? 1 - focusData * 0.8 : 1 - focusSftp * 0.85;
          const path = `M 510 ${y} C 740 ${y}, 730 540, 885 540`;
          return <g key={y} opacity={enter * emphasis * (1 - ramp(frame, 690, 780))}>

            <path d={path} pathLength="1" fill="none" stroke={blue} strokeWidth="3" strokeDasharray="1" strokeDashoffset={1 - enter} />
            {(i === 0 ? [265] : [510 + (i - 1) * 45]).map((start) => {
              const travel = i === 0 ? 150 : 100;
              const p = interpolate(frame, [start, start + travel], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
              const x = (1-p)**3*510 + 3*(1-p)**2*p*740 + 3*(1-p)*p*p*730 + p**3*885;
              const cy = (1-p)**3*y + 3*(1-p)**2*p*y + 3*(1-p)*p*p*540 + p**3*540;
              return <rect key={start} x={x-12} y={cy-9} width={24} height={18} rx={5} fill={blue} opacity={ramp(frame,start,start+10)*(1-ramp(frame,start+travel-10,start+travel))}/>;
            })}
          </g>;
        })}
        <path d="M1135 540H1460" pathLength="1" fill="none" stroke={blue} strokeWidth="3" strokeDasharray="1" strokeDashoffset={1-ramp(frame,610,690)}/>
        <rect
          x={interpolate(frame, [690, 795], [1135, 1460], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}) - 12}
          y={531} width={24} height={18} rx={5} fill={blue}
          opacity={ramp(frame, 690, 705) * (1 - ramp(frame, 780, 795))}
        />
      </svg>
      {rows.map((y, i) => <div key={y} style={{position:'absolute', left: 205, top: y-58, width:305, height:116, display:'flex', alignItems:'center', gap:25, paddingLeft:30, borderRadius:24, background:'white', border:'1px solid #DCE6F1', color:blue, opacity:ramp(frame,20+i*30,60+i*30)*(i===0 ? 1-focusData*0.75 : 1-focusSftp*0.85)*(1-ramp(frame,660,720)), transform:`translateX(${(1-ramp(frame,20+i*30,70+i*30))*-25}px)`}}>
        <AccessIcon kind={i}/><span style={{fontSize:34,fontWeight:600}}>{labels[i]}</span>
      </div>)}
      <ConnectionHub />
      <div style={{position:'absolute',left:1460,top:480,width:260,height:120,borderRadius:24,border:'1px solid #DCE6F1',background:'white',display:'flex',alignItems:'center',justifyContent:'center',fontSize:32,fontWeight:600,opacity:ramp(frame,610,660)}}>目标系统</div>
    </div>

  </AbsoluteFill>;

};
