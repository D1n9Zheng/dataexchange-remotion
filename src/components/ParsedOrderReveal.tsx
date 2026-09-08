import React from 'react';
import {Freeze, OffthreadVideo, staticFile, useCurrentFrame} from 'remotion';
import {ramp, recordingStyle, RecordingShotLayer} from './RecordingStage';
import type {RecordingShot} from './RecordingStage';

/** Business illustration using values visible in R03; not a simulated product UI. */
export const ParsedOrderReveal: React.FC<{shot: RecordingShot}> = ({shot}) => {
  const frame = useCurrentFrame();
  const move = ramp(frame, 0, 60);
  // Same fit and terminal zoom as the preceding wide recording shot.
  const scale = Math.min(1644 / 1740, 644 / 680) * 1.025;
  const width = 848 * scale;
  const height = 666 * scale;
  const left = 960 - 1740 * scale / 2 + 874 * scale;
  const top = 594 - 680 * scale / 2 + 14 * scale;
  return <>
    <div style={{opacity: 1-ramp(frame,0,60)}}>
      <Freeze frame={299}><RecordingShotLayer shot={shot} first /></Freeze>
    </div>
    <div style={{position:'absolute',left:left+(450-left)*move,top:top+(270-top)*move,width:width+(1020-width)*move,height:height+(640-height)*move,borderRadius:28,overflow:'hidden',opacity:1-ramp(frame,60,115),background:'#F7FAFD',border:'1px solid #DCE6F1'}}>
      <Freeze frame={299}><OffthreadVideo muted src={staticFile('edited/parse.mp4')} style={{position:'absolute',width:`${1740/848*100}%`,height:`${680/666*100}%`,maxWidth:'none',left:`${-874/848*100}%`,top:`${-14/666*100}%`}}/></Freeze>
    </div>
    <div style={{position:'absolute',left:450,top:270,width:1020,height:640,padding:'42px 52px',borderRadius:28,background:'#FFFFFF',border:'1px solid #DCE6F1',boxShadow:'0 24px 65px -32px rgba(0,63,130,0.24)',opacity:ramp(frame,60,100)}}>
      <div style={{fontSize:40,fontWeight:600,color:recordingStyle.blue,marginBottom:30}}>采购订单</div>
      {[
        ['订单编号', 'PO-123456'],
        ['交货日期', '20240915'],
        ['商品明细', 'Organic Cotton T-Shirt'],
      ].map(([label,value],i)=><div key={label} style={{padding:'18px 0',borderTop:'1px solid #E3EAF2',opacity:ramp(frame,65+i*30,95+i*30),transform:`translateY(${12*(1-ramp(frame,65+i*30,95+i*30))}px)`}}>
        <div style={{fontSize:23,color:recordingStyle.muted,marginBottom:8}}>{label}</div>
        <div style={{fontSize:34,fontWeight:550,color:recordingStyle.ink}}>{value}</div>
        {i===2 && <div style={{fontSize:24,color:recordingStyle.muted,marginTop:8}}>数量：100</div>}
      </div>)}
    </div>
  </>;
};
