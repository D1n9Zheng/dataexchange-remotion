import React from 'react';
import {Composition, Series} from 'remotion';
import {Scene01PainPoints} from './scenes/Scene01PainPoints';
import {Scene02Breakthrough} from './scenes/Scene02Breakthrough';
import {Scene03Protocols} from './scenes/Scene03Protocols';
import {Scene04ConnectorUpload} from './scenes/Scene04ConnectorUpload';
import {Scene05ProtocolParse} from './scenes/Scene05ProtocolParse';
import {Scene06AiMapping} from './scenes/Scene06AiMapping';
import {Scene07ResultPreview} from './scenes/Scene07ResultPreview';
import {Scene08ExchangeFlow} from './scenes/Scene08ExchangeFlow';
import {Scene09Monitoring} from './scenes/Scene09Monitoring';
import {Scene10CapabilitySummary} from './scenes/Scene10CapabilitySummary';
import {Scene11EndingPlate} from './scenes/Scene11EndingPlate';
import {FIRST_ACT_DURATION, FIRST_ACT_TIMING, FULL_DURATION, FULL_TIMING, VIDEO_FPS} from './timeline/timing';
import './styles/global.css';

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

const FullPromoVideo: React.FC = () => {
  return (
    <Series>
      <Series.Sequence durationInFrames={FULL_TIMING.painPoints}><Scene01PainPoints /></Series.Sequence>
      <Series.Sequence durationInFrames={FULL_TIMING.dataJourney}><Scene02Breakthrough /></Series.Sequence>
      <Series.Sequence durationInFrames={FULL_TIMING.connectorAndUpload}><Scene04ConnectorUpload /></Series.Sequence>
      <Series.Sequence durationInFrames={FULL_TIMING.protocolParse}><Scene05ProtocolParse /></Series.Sequence>
      <Series.Sequence durationInFrames={FULL_TIMING.aiMapping}><Scene06AiMapping /></Series.Sequence>
      <Series.Sequence durationInFrames={FULL_TIMING.resultPreview}><Scene07ResultPreview /></Series.Sequence>
      <Series.Sequence durationInFrames={FULL_TIMING.exchangeFlow}><Scene08ExchangeFlow /></Series.Sequence>
      <Series.Sequence durationInFrames={FULL_TIMING.monitoring}><Scene09Monitoring /></Series.Sequence>
      <Series.Sequence durationInFrames={FULL_TIMING.capabilitySummary}><Scene10CapabilitySummary /></Series.Sequence>
      <Series.Sequence durationInFrames={FULL_TIMING.ending}><Scene11EndingPlate /></Series.Sequence>
    </Series>
  );
};

export const Root: React.FC = () => {
  return (
    <>
      {/* V1 完整 88 秒结构版；S03/S04/S06/S08 后续可替换为真实录屏。 */}
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

      {/* 独立分镜 03：连接器配置与样例接入。 */}
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
