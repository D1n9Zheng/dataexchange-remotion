/** Coordinates in the 1920 × 1080 connection scene. */
export const CONNECTION_LAYOUT = {
  source: {x: 205, width: 305, height: 116, centersY: [370, 540, 710]},
  hub: {x: 885, y: 448, width: 250, height: 184},
  target: {x: 1460, y: 480, width: 260, height: 120},
  region: {y: 240, height: 580, labelY: 260},
} as const;

export const CONNECTION_BEATS = [
  {start: 180, travel: 150},
  {start: 420, travel: 100},
  {start: 465, travel: 100},
] as const;
