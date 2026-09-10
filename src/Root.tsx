import React from 'react';
import {Composition, Freeze, Series, useCurrentFrame} from 'remotion';
import {Scene01PainPoints} from './scenes/Scene01PainPoints';
import {Scene02Breakthrough} from './scenes/Scene02Breakthrough';
import {Scene03Protocols} from './scenes/Scene03Protocols';
import {Scene04ConnectorUpload} from './scenes/Scene04ConnectorUpload';
import {Scene05ProtocolParse} from './scenes/Scene05ProtocolParse';
import {Scene06AiMapping} from './scenes/Scene06AiMapping';
import {Scene07ResultPreview} from './scenes/Scene07ResultPreview';
import {Scene08ExchangeFlow} from './scenes/Scene08ExchangeFlow';
import {Scene10CapabilitySummary} from './scenes/Scene10CapabilitySummary';
import {Scene11EndingPlate} from './scenes/Scene11EndingPlate';
import {FIRST_ACT_DURATION, FIRST_ACT_TIMING, FULL_DURATION, FULL_TIMING, VIDEO_FPS, RECORDING_ACT_DURATION} from './timeline/timing';
import './styles/global.css';
import {ramp} from './components/RecordingStage';

const SummaryWithTransition: React.FC = () => {
  const frame = useCurrentFrame();
  return <><Scene10CapabilitySummary />{frame < 24 && <div style={{position: 'absolute', inset: 0, opacity: 1-ramp(frame,0,24)}}><Freeze frame={FULL_TIMING.exchangeFlow-1}><Scene08ExchangeFlow /></Freeze></div>}</>;
};

const FirstActPreview: React.FC = () => {
  return (
    <Series>
      <Series.Sequence durationInFrames={FIRST_ACT_TIMING.painPoints}>
        <Scene01PainPoints />
      </Series.Sequence>

      <Series.Sequence durationInFrames={FIRST_ACT_TIMING.dataJourney}>
        <Scene02Breakthrough />
      </Series.Sequence>

      <Series.Sequence durationInFrames={FULL_TIMING.connectorAndUpload}>
        <Scene04ConnectorUpload />
      </Series.Sequence>
    </Series>
  );
};

const RecordingActPreview: React.FC = () => <Series>
  <Series.Sequence durationInFrames={FULL_TIMING.connectorAndUpload}><Scene04ConnectorUpload /></Series.Sequence>
  <Series.Sequence durationInFrames={FULL_TIMING.protocolParse}><Scene05ProtocolParse /></Series.Sequence>
  <Series.Sequence durationInFrames={FULL_TIMING.aiMapping}><Scene06AiMapping /></Series.Sequence>
  <Series.Sequence durationInFrames={FULL_TIMING.resultPreview}><Scene07ResultPreview /></Series.Sequence>
  <Series.Sequence durationInFrames={FULL_TIMING.exchangeFlow}><Scene08ExchangeFlow /></Series.Sequence>
</Series>;

const FullPromoVideo: React.FC = () => {
  return (
    <Series from={-74}>
      <Series.Sequence durationInFrames={FULL_TIMING.painPoints}><Scene01PainPoints /></Series.Sequence>
      <Series.Sequence durationInFrames={FULL_TIMING.dataJourney}><Scene02Breakthrough /></Series.Sequence>
      <Series.Sequence durationInFrames={FULL_TIMING.connectorAndUpload}><Scene04ConnectorUpload /></Series.Sequence>
      <Series.Sequence durationInFrames={FULL_TIMING.protocolParse}><Scene05ProtocolParse /></Series.Sequence>
      <Series.Sequence durationInFrames={FULL_TIMING.aiMapping}><Scene06AiMapping /></Series.Sequence>
      <Series.Sequence durationInFrames={FULL_TIMING.resultPreview}><Scene07ResultPreview /></Series.Sequence>
      <Series.Sequence durationInFrames={FULL_TIMING.exchangeFlow}><Scene08ExchangeFlow /></Series.Sequence>
      <Series.Sequence durationInFrames={FULL_TIMING.capabilitySummary}><SummaryWithTransition /></Series.Sequence>
      <Series.Sequence durationInFrames={FULL_TIMING.ending}><Scene11EndingPlate /></Series.Sequence>
    </Series>
  );
};

export const Root: React.FC = () => {
  return (
    <>
      {/* S06 转换结果直接衔接 S09/S10；S07/S08 不进入主片。全片 72 秒。 */}
      <Composition id="RecordingActPreview" component={RecordingActPreview} durationInFrames={RECORDING_ACT_DURATION} fps={VIDEO_FPS} width={1920} height={1080} />
      <Composition
        id="FullPromoVideo"
        component={FullPromoVideo}
        durationInFrames={FULL_DURATION}
        fps={VIDEO_FPS}
        width={1920}
        height={1080}
      />

      <Composition
        id="FirstActPreview"
        component={FirstActPreview}
        durationInFrames={FIRST_ACT_DURATION}
        fps={VIDEO_FPS}
        width={1920}
        height={1080}
      />

      {/* 🎬 独立分镜 01: 痛点孤岛 (8s, 480 帧) */}
      <Composition
        id="Scene01-PainPoints"
        component={Scene01PainPoints}
        durationInFrames={FIRST_ACT_TIMING.painPoints}
        fps={VIDEO_FPS}
        width={1920}
        height={1080}
      />

      {/* 独立分镜 02：统一链路与产品承接（6 秒，360 帧）。 */}
      <Composition
        id="Scene02-Breakthrough"
        component={Scene02Breakthrough}
        durationInFrames={FIRST_ACT_TIMING.dataJourney}
        fps={VIDEO_FPS}
        width={1920}
        height={1080}
      />

      {/* 独立分镜 03：多种接入方式，连接两端（15 秒）。 */}
      <Composition
        id="Scene03-ConnectorUpload"
        component={Scene04ConnectorUpload}
        durationInFrames={FULL_TIMING.connectorAndUpload}
        fps={VIDEO_FPS}
        width={1920}
        height={1080}
      />

      {/* 保留旧协议库场景作为后续 S04/S09 拆分素材，不进入当前主时间轴。 */}
      <Composition
        id="Legacy-StandardProtocols"
        component={Scene03Protocols}
        durationInFrames={600}
        fps={VIDEO_FPS}
        width={1920}
        height={1080}
      />
    </>
  );
};
