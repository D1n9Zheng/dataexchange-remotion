export const VIDEO_FPS = 60;

export const secondsToFrames = (seconds: number) =>
  Math.round(seconds * VIDEO_FPS);

export const FIRST_ACT_TIMING = {
  painPoints: secondsToFrames(8),
  dataJourney: secondsToFrames(6),
} as const;

export const FULL_TIMING = {
  ...FIRST_ACT_TIMING,
  connectorAndUpload: secondsToFrames(15),
  protocolParse: secondsToFrames(11),
  aiMapping: secondsToFrames(12),
  resultPreview: secondsToFrames(10),
  exchangeFlow: secondsToFrames(9),
  monitoring: secondsToFrames(9),
  capabilitySummary: secondsToFrames(7),
  ending: secondsToFrames(5),
} as const;

export const FIRST_ACT_DURATION =
  FIRST_ACT_TIMING.painPoints +
  FIRST_ACT_TIMING.dataJourney +
  FULL_TIMING.connectorAndUpload;

export const FULL_DURATION = Object.values(FULL_TIMING).reduce(
  (total, duration) => total + duration,
  0
);

export const RECORDING_ACT_DURATION =
  FULL_TIMING.connectorAndUpload + FULL_TIMING.protocolParse +
  FULL_TIMING.aiMapping + FULL_TIMING.resultPreview + FULL_TIMING.exchangeFlow;
