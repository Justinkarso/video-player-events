import { useAtom } from 'jotai';
import React, { useEffect } from 'react';
import { mutedAtom, volumeAtom } from '../../../state/core';
import Icon from '../../icons';

type PlayPauseButtonProps = {
  videoRef: React.RefObject<HTMLVideoElement>;
};

const PlayPauseButton: React.FC<PlayPauseButtonProps> = ({ videoRef }) => {
  const [muted, setMuted] = useAtom(mutedAtom);
  const [volume, setVolume] = useAtom(volumeAtom);

  // Set the volume and add the timeupdate event listener on mount
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (video) {
      video.volume = parseFloat(e.currentTarget.value);
      setVolume(video.volume);
      if (video.muted) {
        video.muted = false;
        setMuted(false);
      }
    }
  };

  // Toggle the video's muted state
  const handleVolumeMute = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = !video.muted;
      setMuted(video.muted);
    }
  };

  // Update the muted state when the volume changes
  useEffect(() => {
    volume === 0 ? setMuted(true) : setMuted(false);
  }, [volume]);

  return (
    <div className="volume">
      <button className="mute" onClick={handleVolumeMute}>
        {muted ? <Icon type="mute" /> : <Icon type="unmute" />}
      </button>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={handleVolumeChange}
        className="volume-slider"
      />
    </div>
  );
};

export default PlayPauseButton;
