import React from 'react';
import {Freeze, OffthreadVideo, staticFile, useCurrentFrame} from 'remotion';
import {ramp, recordingStyle, RecordingStage} from '../components/RecordingStage';
import {FULL_TIMING} from '../timeline/timing';
import {Scene07ResultPreview} from './Scene07ResultPreview';

export const Scene08ExchangeFlow: React.FC = () => {
  const frame = useCurrentFrame();

  // 阶段 1 (任务列表运行态 0~230) -> 阶段 2 (任务详情断点与历史 200~540)
  const toDetail = ramp(frame, 200, 230);

  return (
    <>
      <RecordingStage
        title="统一传输中心，实时查看任务运行情况"
        subtitle={frame < 220 ? '连接器按规则自动调度，业务数据毫秒级流转' : '支持断点续传、任务历史查看'}
        minimal
        step={4}
      >
        {/* 阶段 1：传输任务列表与实时运行态 (0 ~ 230 帧) */}
        {frame < 240 && (
          <div style={{position: 'absolute', inset: 0, opacity: 1 - toDetail}}>
            {/* 实录卡片：任务列表 activate.mp4 */}
            <div
              style={{
                position: 'absolute',
                left: 200,
                top: 240,
                width: 1520,
                height: 380,
                borderRadius: 24,
                overflow: 'hidden',
                background: '#FFFFFF',
                border: '1px solid #DCE6F1',
                boxShadow: '0 24px 65px -32px rgba(0,63,130,0.24)',
              }}
            >
              <OffthreadVideo
                muted
                src={staticFile('edited/activate.mp4')}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'left center',
                }}
              />
            </div>

            {/* 下方状态指示胶囊 */}
            <div
              style={{
                position: 'absolute',
                left: 200,
                top: 650,
                width: 1520,
                display: 'flex',
                gap: 20,
                justifyContent: 'center',
                opacity: ramp(frame, 20, 50),
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '12px 24px',
                  borderRadius: 16,
                  background: '#ECFDF5',
                  border: '1px solid #A7F3D0',
                  color: '#059669',
                  fontSize: 18,
                  fontWeight: 600,
                }}
              >
                <span style={{width: 8, height: 8, borderRadius: '50%', background: '#059669'}} />
                任务状态：运行中
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '12px 24px',
                  borderRadius: 16,
                  background: '#EFF6FF',
                  border: '1px solid #BFDBFE',
                  color: '#0071E3',
                  fontSize: 18,
                  fontWeight: 600,
                }}
              >
                <span>🔄</span>
                调度模式：定时自动拉取
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '12px 24px',
                  borderRadius: 16,
                  background: '#FFFFFF',
                  border: '1px solid #DCE6F1',
                  color: recordingStyle.ink,
                  fontSize: 18,
                  fontWeight: 600,
                }}
              >
                <span>🔗</span>
                接入流转：SFTP-TEST → JDBC-ORDERS
              </div>
            </div>
          </div>
        )}

        {/* 阶段 2：任务详情、断点续传与执行历史 (200 ~ 540 帧) */}
        {frame >= 200 && (
          <div style={{position: 'absolute', inset: 0, opacity: toDetail}}>
            {/* 左侧说明面板 */}
            <div style={{position: 'absolute', left: 160, top: 250, width: 590}}>
              <div
                style={{
                  fontSize: 40,
                  fontWeight: 700,
                  color: recordingStyle.ink,
                  letterSpacing: '-0.03em',
                  lineHeight: 1.2,
                }}
              >
                断点续传 · 任务历史
              </div>

              <div style={{marginTop: 32, display: 'flex', flexDirection: 'column', gap: 20}}>
                <div
                  style={{
                    background: '#FFFFFF',
                    padding: '24px 28px',
                    borderRadius: 22,
                    border: '1px solid #DCE6F1',
                    boxShadow: '0 8px 24px -12px rgba(0,63,130,0.12)',
                    opacity: ramp(frame, 220, 250),
                    transform: `translateY(${(1 - ramp(frame, 220, 250)) * 14}px)`,
                  }}
                >
                  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8}}>
                    <div style={{fontSize: 22, fontWeight: 650, color: '#0071E3'}}>断点续传机制</div>
                    <span style={{fontSize: 14, fontWeight: 700, color: '#0071E3', background: '#0071E315', padding: '4px 12px', borderRadius: 8}}>
                      高可用保障
                    </span>
                  </div>
                  <div style={{fontSize: 16, color: recordingStyle.muted, lineHeight: 1.5}}>
                    传输节点精准记录断点游标，若遇网络抖动或服务重启，原地无缝续传，杜绝重复与遗漏。
                  </div>
                </div>

                <div
                  style={{
                    background: '#FFFFFF',
                    padding: '24px 28px',
                    borderRadius: 22,
                    border: '1px solid #DCE6F1',
                    boxShadow: '0 8px 24px -12px rgba(0,63,130,0.12)',
                    opacity: ramp(frame, 240, 270),
                    transform: `translateY(${(1 - ramp(frame, 240, 270)) * 14}px)`,
                  }}
                >
                  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8}}>
                    <div style={{fontSize: 22, fontWeight: 650, color: '#059669'}}>全量执行历史</div>
                    <span style={{fontSize: 14, fontWeight: 700, color: '#059669', background: '#05966915', padding: '4px 12px', borderRadius: 8}}>
                      100% 可回溯
                    </span>
                  </div>
                  <div style={{fontSize: 16, color: recordingStyle.muted, lineHeight: 1.5}}>
                    单笔任务流转记录全量存档，开始时间、成功与失败批次透明可查，异常一键定位分析。
                  </div>
                </div>
              </div>
            </div>

            {/* 右侧实录卡片：任务详情弹窗 execution.mp4 */}
            <div
              style={{
                position: 'absolute',
                left: 800,
                top: 240,
                width: 960,
                height: 490,
                borderRadius: 24,
                overflow: 'hidden',
                background: '#FFFFFF',
                border: '1px solid #DCE6F1',
                boxShadow: '0 24px 65px -32px rgba(0,63,130,0.24)',
                opacity: ramp(frame, 210, 240),
                transform: `scale(${0.96 + 0.04 * ramp(frame, 210, 240)})`,
              }}
            >
              <OffthreadVideo
                muted
                src={staticFile('edited/execution.mp4')}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                }}
              />
            </div>
          </div>
        )}
      </RecordingStage>

      {/* 场景入场平滑淡入 */}
      {frame < 24 && (
        <div style={{position: 'absolute', inset: 0, opacity: 1 - ramp(frame, 0, 24), pointerEvents: 'none'}}>
          <Freeze frame={FULL_TIMING.resultPreview - 1}>
            <Scene07ResultPreview />
          </Freeze>
        </div>
      )}
    </>
  );
};
