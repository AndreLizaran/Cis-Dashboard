// Modules
import { ReactNode, useEffect, useState } from 'react'

// Classes
import { fadeIn, fadeInUp } from '../../classes';

type Props = {
  animation?: 'fadeInUp' | 'fadeIn';
  children: ReactNode
}

export default function AnimationContainer({ animation = 'fadeIn', children }:Props) {

  const [animationScreen, setAnimationScreen] = useState<string>('');

  useEffect(() => {
    switch(animation) {
      case 'fadeIn':
        setAnimationScreen(fadeIn);
        break;
      case 'fadeInUp':
        setAnimationScreen(fadeInUp);
        break;
      default:
        setAnimationScreen(fadeIn);
        break;
    }
  });

  return <div className={`flex flex-col gap-6 ${animationScreen}`}>{children}</div>
}
