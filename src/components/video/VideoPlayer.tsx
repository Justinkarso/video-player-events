import React, { useEffect, useRef, useState } from 'react';
import { useAtom } from 'jotai';

import { sourceAtom, volumeAtom } from '../../state/core';
import PlayPauseButton from './controls/PlayPauseButton';
import VolumeElement from './controls/VolumeElement';
import Timeline from './controls/Timeline';
import useVideoControls from '../../hooks/useVideoControls';
import Notification from './Notification';
import Marquee from './Marquee';
import { Data } from '../../types';

type VideoComponentProps = {
  data: Data;
};

const VideoComponent: React.FC<VideoComponentProps> = ({ data }) => {
  const [volume] = useAtom(volumeAtom);
  const [source] = useAtom(sourceAtom);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const recentlyAdded = useRef(new Set<number>());
  const [notifications, setNotifications] = useState<any[]>([]);
  const [showEndOverlay, setShowEndOverlay] = useState(false);
  const { playing, setPlaying, opacity } = useVideoControls(videoRef);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Set the volume and add the timeupdate event listener on mount
    video.volume = volume;
    video.addEventListener('timeupdate', handleTimeUpdate);

    // Cleanup
    return () => video.removeEventListener('timeupdate', handleTimeUpdate);
  }, []);

  /*
    This function is called every time the video's time is updated.
    Here we check if there are any events that should be shown at the current time.
    If there are, we add them to the notifications array.
    If the event is of type "endGame", we reset the game.
    If the current time is greater than the last event's time, we pause the video and reset the game.
  */
  function handleTimeUpdate() {
    const currentTime = videoRef.current?.currentTime || 0;

    // Clear the recentlyAdded set when the video starts from the beginning
    if (currentTime === 0) recentlyAdded.current.clear();

    if (!data.events) return;

    // Find the event that should be shown at the current time
    const eventToShow = data.events.find(
      (event: { time: number }) => Math.abs(event.time - currentTime) < 1
    );

    // If the current time is greater than the last event's time, we pause the video and reset the game
    if (currentTime > data.events[data.events.length - 1].time) {
      pauseVideo();
      resetGame();
      return;
    }

    if (eventToShow) {
      // If the event is of type "endGame", we reset the game
      if (eventToShow.type === 'endGame') {
        resetGame();
        return;
      }

      // If the event is not of type "endGame", we add it to the notifications array
      if (!recentlyAdded.current.has(eventToShow.time)) {
        recentlyAdded.current.add(eventToShow.time);
        setNotifications((prev) => [
          ...prev,
          { ...eventToShow, id: Date.now() },
        ]);
      }
    }
  }

  /*
    This function is called when the user clicks on the video.
    If the video is paused, we play it.
    If the video is playing, we pause it.
  */
  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    setPlaying(!playing);
    video.paused ? video.play() : video.pause();
  };

  /*
    Helper function to pause the video and set the playing state to false.
    To avoid unnecessary code duplication.
  */
  const pauseVideo = () => {
    videoRef.current?.pause();
    setPlaying(false);
  };

  /*
    This function is called when the user clicks on the restart button.
    We reset the video, clear the notifications array and hide the end overlay.
  */
  const restartGame = () => {
    const video = videoRef.current;
    if (!video) return;

    video.load();
    video.muted = false;
    video.play();
    setPlaying(true);

    setNotifications([]);
    recentlyAdded.current.clear();
    setShowEndOverlay(false);
  };

  /*
    This function is called when the handleTimeUpdate function finds an event of type "endGame".
    We pause the video and mute it.
    We also show the end overlay.
  */
  const resetGame = () => {
    pauseVideo();
    videoRef.current!.muted = true;
    setShowEndOverlay(true);
  };

  /*
    This function is passed to the Notification component.
    It is called when the event should be removed from the screen.
    We remove the notification from the notifications array and from the recentlyAdded set.
  */
  const removeNotification = (time: number) => {
    setNotifications((prev) => prev.filter((n) => n.time !== time));
    recentlyAdded.current.delete(time);
  };

  if (!data) return null;

  return (
    <section className="video-container">
      <div className="video-controls" style={{ opacity }}>
        <Timeline videoRef={videoRef} events={data.events ?? []} />
        <div className="controls" data-testid="controls">
          <PlayPauseButton videoRef={videoRef} />
          <VolumeElement videoRef={videoRef} />
        </div>
      </div>
      <video
        data-testid="video-player"
        ref={videoRef}
        src={source}
        onClick={togglePlayback}
      />
      <div className="notification-container">
        {notifications.map((notification) => (
          <Notification
            key={notification.id}
            notification={notification}
            onRemove={removeNotification}
          />
        ))}
      </div>
      {showEndOverlay && (
        <div className="end-overlay">
          <h2>The game has ended.</h2>
          <p>Click to restart.</p>
          <button className="start-restart-button" onClick={restartGame}>
            Restart
          </button>
        </div>
      )}

      {data.ticker && <Marquee />}
    </section>
  );
};

export default VideoComponent;
