// components/SampleAnimation.tsx
'use client';
import RiveComponent from '@rive-app/react-canvas';

const PlantAnimation2 = () => {
  return (
    <div style={{ width: 300, height: 300, margin: '0 auto' }}>
      <RiveComponent src="/day2.riv" />
    </div>
  );
};

export default PlantAnimation2;
