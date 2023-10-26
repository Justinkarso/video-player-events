import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { mutedAtom, playingAtom } from '../state/core';

function useVideoControls(videoRef: React.RefObject<HTMLVideoElement>) {
  const [playing, setPlaying] = useAtom(playingAtom);
  const [opacity, setOpacity] = useState(0);
  const [, setMuted] = useAtom(mutedAtom);

  function handleKeyDown(event: KeyboardEvent) {
    const video = videoRef.current;
    if (!video) return;
    video.focus();

    // Show the controls when a key is pressed
    setOpacity(1);
    setTimeout(() => setOpacity(0), 1000);

    // Switch statement to handle the different key presses
    switch (event.key) {
      case 'ArrowLeft':
        video.currentTime -= 5;
        break;
      case 'ArrowRight':
        video.currentTime += 5;
        break;
      case 'K':
      case 'k':
        if (video.paused) {
          video.play();
          setPlaying(true);
        } else {
          video.pause();
          setPlaying(false);
        }
        break;
      case 'L':
      case 'l':
        if (document.fullscreenElement === video) {
          document.exitFullscreen();
        } else {
          video.requestFullscreen();
        }
        break;
      case 'M':
      case 'm':
        video.muted = !video.muted;
        setMuted(video.muted);
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [videoRef, setPlaying, setMuted]);

  return { playing, setPlaying, opacity };
}

export default useVideoControls;
