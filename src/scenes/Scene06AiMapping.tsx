import React from 'react';
import {Freeze, OffthreadVideo, staticFile, useCurrentFrame} from 'remotion';
import {ramp, recordingStyle, RecordingStage} from '../components/RecordingStage';
import {FULL_TIMING} from '../timeline/timing';
import {Scene05ProtocolParse} from './Scene05ProtocolParse';

// R04: source paths are under $.message.purchaseOrder; target paths are root fields.
const mappings = [
  {label: '订单编号', source: 'documentNumber', target: 'document_number', rule: '字段对应'},
  {label: '交货日期', source: 'deliveryDate', target: 'delivery_date', rule: '日期类型 · 可调整'},
  {label: '收货方名称', source: 'deliveryParty.name', target: 'delivery_party_name', rule: '提取名称'},
];

export const Scene06AiMapping: React.FC = () => {
  const frame = useCurrentFrame();
  const proof = ramp(frame, 480, 510);
  return <>
    <RecordingStage title="AI 辅助映射，让不同字段表达同一业务" minimal step={2}>
      <div style={{position:'absolute',inset:0,opacity:1-proof}}>
        <div style={{position:'absolute',left:160,top:260,fontSize:28,color:recordingStyle.muted,opacity:ramp(frame,24,54)}}>源端业务字段</div>
        <div style={{position:'absolute',left:1200,top:260,fontSize:28,color:recordingStyle.muted,opacity:ramp(frame,40,70)}}>目标端字段</div>
        <div style={{position:'absolute',left:800,top:260,width:320,textAlign:'center',fontSize:28,color:recordingStyle.blue,opacity:ramp(frame,160,190)}}>AI 映射建议</div>
        {mappings.map((mapping,i)=>{
          const y=335+i*180;
          const entry=ramp(frame,35+i*28,70+i*28);
          const connect=ramp(frame,180+i*60,215+i*60);
          return <React.Fragment key={mapping.target}>
            <svg width="1920" height="1080" style={{position:'absolute',inset:0,opacity:connect}}>
              <path d={`M720 ${y+66}H1200`} stroke={recordingStyle.blue} strokeWidth="3"/>
              <path d={`m1186 ${y+57} 14 9-14 9`} stroke={recordingStyle.blue} strokeWidth="3" fill="none"/>
            </svg>
            {[false,true].map(target=><div key={String(target)} style={{position:'absolute',left:target?1200:160,top:y,width:560,height:132,padding:'22px 28px',border:'1px solid #DCE6F1',borderRadius:24,background:target?'#F0F5FB':'#FFFFFF',opacity:entry,transform:`translateX(${(target?30:-30)*(1-entry)}px)`}}>
              <div style={{fontSize:23,color:recordingStyle.muted,marginBottom:12}}>{mapping.label}</div>
              <div style={{fontSize:32,fontWeight:550,color:target?recordingStyle.blue:recordingStyle.ink}}>{target?mapping.target:mapping.source}</div>
            </div>)}
            <div style={{position:'absolute',left:790,top:y+40,width:340,padding:'8px 0',background:'#FBFBFD',textAlign:'center',fontSize:24,color:recordingStyle.blue,opacity:connect}}>{mapping.rule}</div>
          </React.Fragment>;
        })}
      </div>
      {frame >= 480 && <div style={{position:'absolute',inset:0,opacity:proof}}>
        <div style={{position:'absolute',left:240,top:285,fontSize:34,fontWeight:550,color:recordingStyle.ink}}>规则清晰可见，关键配置由你掌握</div>
        <div style={{position:'absolute',left:240,top:390,width:1440,height:325,overflow:'hidden',border:'1px solid #DCE6F1',borderRadius:24,boxShadow:'0 24px 65px -32px rgba(0,63,130,0.24)'}}>
          <Freeze frame={60}><OffthreadVideo muted src={staticFile('edited/date-confirmed.mp4')} style={{position:'absolute',left:0,top:-270*1440/1020,width:1440,height:690*1440/1020,maxWidth:'none'}}/></Freeze>
        </div>
      </div>}
    </RecordingStage>
    {frame < 24 && <div style={{position:'absolute',inset:0,opacity:1-ramp(frame,0,24)}}><Freeze frame={FULL_TIMING.protocolParse-1}><Scene05ProtocolParse /></Freeze></div>}
  </>;
};
