import { useState, useEffect } from 'react';
import { wallpapers, WALLPAPER_INTERVAL } from '@/config/wallpapers';

export const WallpaperBackground = () => {
  const [currentIndex, setCurrentIndex] = useState(() => 
    Math.floor(Math.random() * wallpapers.length)
  );
  const [isLoaded, setIsLoaded] = useState(false);
  const [nextIndex, setNextIndex] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const next = (currentIndex + 1) % wallpapers.length;
      setNextIndex(next);
      
      // Preload next image
      const img = new Image();
      img.src = wallpapers[next];
      img.onload = () => {
        setTimeout(() => {
          setCurrentIndex(next);
          setNextIndex(null);
        }, 100);
      };
    }, WALLPAPER_INTERVAL);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Current wallpaper */}
      <div
        className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ backgroundImage: `url(${wallpapers[currentIndex]})` }}
      />
      
      {/* Next wallpaper (for crossfade) */}
      {nextIndex !== null && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-0 animate-fade-in"
          style={{ backgroundImage: `url(${wallpapers[nextIndex]})` }}
        />
      )}
      
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-background/85 backdrop-blur-sm" />
      
      {/* Preload first image */}
      <img
        src={wallpapers[currentIndex]}
        alt=""
        className="hidden"
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
};
