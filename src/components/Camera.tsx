import React from 'react';

interface CameraProps {
  children: React.ReactNode;
  scale?: number;
  x?: number;
  y?: number;
  opacity?: number;
}

export const Camera: React.FC<CameraProps> = ({
  children,
  scale = 1,
  x = 0,
  y = 0,
  opacity = 1,
}) => {
  return (
    <div
      className="absolute inset-0"
      style={{
        opacity,
        transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`,
        transformOrigin: '50% 50%',
        willChange: 'transform, opacity',
      }}
    >
      {children}
    </div>
  );
};

