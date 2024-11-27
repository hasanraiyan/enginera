import { useSpring } from 'framer-motion';
import { useScroll } from 'react-use';

export const useParallax = (strength: number = 100) => {
  const { y } = useScroll();
  
  const springConfig = {
    stiffness: 400,
    damping: 90,
    mass: 2
  };

  const yOffset = useSpring(y, springConfig);
  const parallaxY = strength ? yOffset.get() * -0.1 : 0;

  return {
    transform: `translateY(${parallaxY}px)`
  };
};