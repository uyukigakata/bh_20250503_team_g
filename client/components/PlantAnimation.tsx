'use client';
import RiveComponent from '@rive-app/react-canvas';

type Props = {
  streakCount: number;
  isBroken: boolean;
};

const PlantAnimation = ({ streakCount, isBroken }: Props) => {
  let riveFile = "day1.riv"; // ← 初期表示を day1 に変更！

  if (!isBroken) {
    if (streakCount >= 6) {
      // streakCount=6 → day7相当 → Good.riv 表示
      riveFile = "Good.riv";
    } else if (streakCount >= 1) {
      // streakCount=1 → day2.riv, streakCount=2 → day3.riv ...
      riveFile = `day${streakCount + 1}.riv`;
    }
  } else {
    riveFile = "Bad.riv";
  }

  return (
    <div key={riveFile} style={{ width: 300, height: 300, margin: '0 auto' }}>
      <RiveComponent src={`/${riveFile}`} />
    </div>
  );
};

export default PlantAnimation;
