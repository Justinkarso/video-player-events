import { useAtom } from 'jotai';
import React from 'react';
import { playingAtom } from '../../../state/core';
import Icon from '../../icons';

type PlayPauseButtonProps = {
  videoRef: React.RefObject<HTMLVideoElement>;
};

const PlayPauseButton: React.FC<PlayPauseButtonProps> = ({ videoRef }) => {
  const [playing, setPlaying] = useAtom(playingAtom);

  function handlePlayPause() {
    const video = videoRef.current;
    if (video) {
      if (video.paused) {
        video.play();
        setPlaying(true);
      } else {
        video.pause();
        setPlaying(false);
      }
    }
  }

  return (
    <button className="play" onClick={handlePlayPause}>
      {playing ? (
        <Icon type="pause" className="btn" />
      ) : (
        <Icon type="play" className="btn" />
      )}
    </button>
  );
};

export default React.memo(PlayPauseButton);
