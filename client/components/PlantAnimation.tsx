'use client';
import RiveComponent from '@rive-app/react-canvas';

type Props = {
  streakCount: number;
  isBroken: boolean;
};

const PlantAnimation = ({ streakCount, isBroken }: Props) => {
  let riveFile = "Bad.riv";

  if (!isBroken) {
    if (streakCount >= 7) {
      riveFile = "Good.riv";
    } else if (streakCount >= 1 && streakCount <= 6) {
      riveFile = `day${streakCount}.riv`;
    }
  }

  return (
    <div style={{ width: 300, height: 300, margin: '0 auto' }}>
      <RiveComponent src={`/${riveFile}`} />
    </div>
  );
};

export default PlantAnimation;
