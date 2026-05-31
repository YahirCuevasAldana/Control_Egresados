

import { useState, useEffect } from 'react';

export function useResponsive() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { width, height } = windowSize;
  const isMobile = width <= 768;
  const isTablet = width > 768 && width <= 1024;
  const isDesktop = width > 1024;

  let breakpoint = 'mobile';
  if (isTablet) breakpoint = 'tablet';
  if (isDesktop) breakpoint = 'desktop';

  return {
    width,
    height,
    isMobile,
    isTablet,
    isDesktop,
    breakpoint,
  };
}


export function useOrientation() {
  const [orientation, setOrientation] = useState({
    isPortrait: typeof window !== 'undefined' ? window.innerHeight > window.innerWidth : true,
    isLandscape: typeof window !== 'undefined' ? window.innerWidth > window.innerHeight : false,
  });

  useEffect(() => {
    const handleOrientationChange = () => {
      setOrientation({
        isPortrait: window.innerHeight > window.innerWidth,
        isLandscape: window.innerWidth > window.innerHeight,
      });
    };

    window.addEventListener('orientationchange', handleOrientationChange);
    window.addEventListener('resize', handleOrientationChange);

    return () => {
      window.removeEventListener('orientationchange', handleOrientationChange);
      window.removeEventListener('resize', handleOrientationChange);
    };
  }, []);

  return {
    isPortrait: orientation.isPortrait,
    isLandscape: orientation.isLandscape,
    orientation: orientation.isPortrait ? 'portrait' : 'landscape',
  };
}

export function useDeviceSize() {
  const responsive = useResponsive();
  const deviceOrientation = useOrientation();

  return {
    ...responsive,
    ...deviceOrientation,
  };
}
