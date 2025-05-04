'use client'; 

import RiveComponent from '@rive-app/react-canvas';

const PlantAnimation = () => {
  return (
    <div style={{ width: 300, height: 300, margin: '0 auto' }}>
      <RiveComponent src="/Bad.riv" />
    </div>
  );
};

export default PlantAnimation;

