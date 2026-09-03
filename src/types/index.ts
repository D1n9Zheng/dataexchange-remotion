export interface NodeItem {
  id: string;
  label: string;
  format: string;
  sub: string;
  icon: string;
  color: string;
  x: number; // percentage 0 - 100
  y: number; // percentage 0 - 100
}

export interface ConnectionItem {
  fromId: string;
  toId: string;
  curvature: number;
  failAtFrame: number;
}

export interface AlertBadgeItem {
  frame: number;
  text: string;
  x: number;
  y: number;
}

export interface ProtocolItem {
  name: string;
  cn: string;
  tag: string;
  color: string;
  bg: string;
}

export interface MetricItem {
  title: string;
  sub: string;
  icon: string;
  color: string;
  bg: string;
}
