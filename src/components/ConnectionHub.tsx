import React from 'react';
import {interpolate, interpolateColors} from 'remotion';
import {recordingStyle} from './RecordingStage';

/** Shared product node: S02 ends at exactly the geometry used throughout S03. */
export const ConnectionHub: React.FC<{progress?: number}> = ({progress = 1}) => (
  <div style={{
    position: 'absolute',
    left: interpolate(progress, [0, 1], [795, 885]),
    top: 448,
    width: interpolate(progress, [0, 1], [330, 250]),
    height: 184,
    borderRadius: 30,
    background: `rgb(${Math.round(255 * (1 - progress))}, ${Math.round(255 - 142 * progress)}, ${Math.round(255 - 28 * progress)})`,
    color: interpolateColors(progress, [0, 1], [recordingStyle.ink, '#FFFFFF']),
    border: `2px solid ${recordingStyle.blue}`,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontFamily: recordingStyle.font,
    fontSize: interpolate(progress, [0, 1], [34, 32]),
    fontWeight: 600,
    boxShadow: '0 24px 60px -28px #0071E380',
  }}>数据交换工具</div>
);
