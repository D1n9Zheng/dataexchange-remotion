import React from 'react';
import {Freeze, OffthreadVideo, Sequence, staticFile, useCurrentFrame} from 'remotion';
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

  // Phase 1 -> Phase 2 (第 300 帧切换至映射列表概览)
  const toProof = ramp(frame, 300, 330);

  // Phase 2 -> Phase 3 (第 480 帧平滑切入抽屉字段转换实际操作)
  const toReview = ramp(frame, 480, 510);

  return <>
    <RecordingStage
      title="AI 辅助映射，让不同字段表达同一业务"
      subtitle={frame < 495 ? "规则清晰可见，关键配置由你掌握" : "按业务需求定制转换规则，灵活掌控每一处细节"}
      minimal
      step={2}
    >
      {/* 阶段 1：抽象动效连线 (0 ~ 330 帧) */}
      {frame < 330 && (
        <div style={{position: 'absolute', inset: 0, opacity: 1 - toProof}}>
          <div style={{position: 'absolute', left: 160, top: 260, fontSize: 28, color: recordingStyle.muted, opacity: ramp(frame, 24, 54)}}>源端业务字段</div>
          <div style={{position: 'absolute', left: 1200, top: 260, fontSize: 28, color: recordingStyle.muted, opacity: ramp(frame, 40, 70)}}>目标端字段</div>
          <div style={{position: 'absolute', left: 800, top: 260, width: 320, textAlign: 'center', fontSize: 28, color: recordingStyle.blue, opacity: ramp(frame, 120, 150)}}>AI 映射建议</div>
          {mappings.map((mapping, i) => {
            const y = 335 + i * 180;
            const entry = ramp(frame, 25 + i * 22, 55 + i * 22);
            const connect = ramp(frame, 120 + i * 45, 155 + i * 45);
            return <React.Fragment key={mapping.target}>
              <svg width="1920" height="1080" style={{position: 'absolute', inset: 0, opacity: connect}}>
                <path d={`M720 ${y + 66}H1200`} stroke={recordingStyle.blue} strokeWidth="3" />
                <path d={`m1186 ${y + 57} 14 9-14 9`} stroke={recordingStyle.blue} strokeWidth="3" fill="none" />
              </svg>
              {[false, true].map(target => (
                <div key={String(target)} style={{position: 'absolute', left: target ? 1200 : 160, top: y, width: 560, height: 132, padding: '22px 28px', border: '1px solid #DCE6F1', borderRadius: 24, background: target ? '#F0F5FB' : '#FFFFFF', opacity: entry, transform: `translateX(${(target ? 30 : -30) * (1 - entry)}px)`}}>
                  <div style={{fontSize: 23, color: recordingStyle.muted, marginBottom: 12}}>{mapping.label}</div>
                  <div style={{fontSize: 32, fontWeight: 550, color: target ? recordingStyle.blue : recordingStyle.ink}}>{target ? mapping.target : mapping.source}</div>
                </div>
              ))}
              <div style={{position: 'absolute', left: 790, top: y + 40, width: 340, padding: '8px 0', background: '#FBFBFD', textAlign: 'center', fontSize: 24, color: recordingStyle.blue, opacity: connect}}>{mapping.rule}</div>
            </React.Fragment>;
          })}
        </div>
      )}

      {/* 阶段 2：映射清单概览 (Image 1: 300 ~ 510 帧) */}
      {frame >= 300 && frame < 510 && (
        <div style={{position: 'absolute', inset: 0, opacity: toProof * (1 - toReview)}}>
          <div style={{position: 'absolute', left: 240, top: 285, fontSize: 34, fontWeight: 550, color: recordingStyle.ink}}>
            规则清晰可见，关键配置由你掌握
          </div>
          <div style={{position: 'absolute', left: 240, top: 390, width: 1440, height: 325, overflow: 'hidden', border: '1px solid #DCE6F1', borderRadius: 24, boxShadow: '0 24px 65px -32px rgba(0,63,130,0.24)'}}>
            <Freeze frame={60}>
              <OffthreadVideo muted src={staticFile('edited/date-confirmed.mp4')} style={{position: 'absolute', left: 0, top: -270 * 1440 / 1020, width: 1440, height: 690 * 1440 / 1020, maxWidth: 'none'}} />
            </Freeze>
          </div>
        </div>
      )}

      {/* 阶段 3：实际操作字段转换部分 (Image 2: 480 帧起，右侧抽屉实录 + 左侧要点) */}
      {frame >= 480 && (
        <div style={{position: 'absolute', inset: 0, opacity: toReview}}>
          {/* 左侧说明面板 */}
          <div style={{position: 'absolute', left: 160, top: 270, width: 700}}>
            <div style={{fontSize: 44, fontWeight: 700, color: recordingStyle.ink, letterSpacing: '-0.03em', lineHeight: 1.2}}>
              支持自定义转换规则
            </div>

            <div style={{marginTop: 34, display: 'flex', flexDirection: 'column', gap: 12}}>
              {[
                {step: '01', title: '读取源值', desc: '$.message.purchaseOrder.deliveryDate', color: '#0071e3'},
                {step: '02', title: '类型转换', desc: '转成标准 日期-DATE 格式', color: '#059669'},
                {step: '03', title: '确认保存', desc: '规则即刻生效，人机协同闭环', color: '#2563eb'},
              ].map((item, idx) => (
                <React.Fragment key={item.step}>
                  {idx > 0 && (
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 20,
                        margin: '-2px 0',
                        opacity: ramp(frame, 500 + idx * 16, 530 + idx * 16),
                      }}
                    >
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0071E3" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{opacity: 0.65}}>
                        <path d="M12 4v14M6 12l6 6 6-6" />
                      </svg>
                    </div>
                  )}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 22,
                      background: '#FFFFFF',
                      padding: '22px 28px',
                      borderRadius: 22,
                      border: '1px solid #DCE6F1',
                      boxShadow: '0 8px 24px -12px rgba(0,63,130,0.12)',
                      opacity: ramp(frame, 510 + idx * 16, 540 + idx * 16),
                    }}
                  >
                    <span style={{fontFamily: 'monospace', fontSize: 18, fontWeight: 700, color: item.color, background: `${item.color}15`, padding: '6px 14px', borderRadius: 10}}>
                      {item.step}
                    </span>
                    <div>
                      <div style={{fontSize: 22, fontWeight: 650, color: recordingStyle.ink}}>{item.title}</div>
                      <div style={{fontSize: 16, color: recordingStyle.muted, marginTop: 4, fontFamily: idx === 0 ? 'monospace' : undefined}}>{item.desc}</div>
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* 右侧实录卡片：抽屉操作 date-review.mp4 */}
          <div style={{position: 'absolute', left: 960, top: 220, width: 760, height: 740, overflow: 'hidden', borderRadius: 28, border: '1px solid #DCE6F1', background: '#FFFFFF', boxShadow: '0 24px 65px -32px rgba(0,63,130,0.24)'}}>
            <Sequence from={480} durationInFrames={480}>
              <OffthreadVideo
                muted
                src={staticFile('edited/date-review.mp4')}
                style={{
                  position: 'absolute',
                  left: 20,
                  top: 20,
                  width: 720,
                  height: 700,
                  objectFit: 'contain',
                }}
              />
            </Sequence>
          </div>
        </div>
      )}
    </RecordingStage>

    {frame < 24 && <div style={{position: 'absolute', inset: 0, opacity: 1 - ramp(frame, 0, 24), pointerEvents: 'none'}}><Freeze frame={FULL_TIMING.protocolParse - 1}><Scene05ProtocolParse /></Freeze></div>}
  </>;
};
