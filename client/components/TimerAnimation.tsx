// components/SampleAnimation.tsx
'use client';
import RiveComponent from '@rive-app/react-canvas';

const TimerAnimation = () => {
  return (
    <div style={{ width: 300, height: 300, margin: '0 auto' }}>
      <RiveComponent src="/water.riv" />
    </div>
  );
};

export default TimerAnimation;
