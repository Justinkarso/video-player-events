import { useAtom } from 'jotai';
import React, { useState, useRef, useEffect } from 'react';
import { playingAtom } from '../../../state/core';
import { GameEvent } from '../../../types';

type TimelineProps = {
  videoRef: React.RefObject<HTMLVideoElement>;
  events?: GameEvent[];
};

const Timeline: React.FC<TimelineProps> = ({ videoRef, events }) => {
  const [wasPaused, setWasPaused] = useAtom(playingAtom);
  const [isScrubbing, setIsScrubbing] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const timelineContainerRef = useRef<HTMLDivElement | null>(null);

  // This function is called every time the video's time is updated.
  const handleVideoProgress = () => {
    const video = videoRef.current;
    const timelineContainer = timelineContainerRef.current;
    if (!video || !timelineContainer) return;

    // Set state to allow isInRange to work
    setCurrentTime(video.currentTime);

    // Update the timeline's progress bar
    const percent = video.currentTime / video.duration;
    timelineContainer.style.setProperty(
      '--progress-position',
      `${percent * 100}%`
    );
  };

  useEffect(() => {
    const handleMouseUp = (e: any) => {
      if (isScrubbing) toggleScrubbing(e);
    };

    document.addEventListener('mouseup', handleMouseUp);
    const video = videoRef.current;
    if (video) {
      video.addEventListener('timeupdate', handleVideoProgress);
      return () => {
        video.removeEventListener('timeupdate', handleVideoProgress);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isScrubbing]);

  // Calculate the percentage of the timeline that the user clicked on
  const calculateTimelinePercent = (
    e: React.MouseEvent<HTMLDivElement>
  ): number => {
    const timelineContainer = timelineContainerRef.current;
    if (!timelineContainer) return 0;

    const rect = timelineContainer.getBoundingClientRect();
    return Math.min(Math.max(0, e.clientX - rect.x), rect.width) / rect.width;
  };

  // This function is called when the user clicks on the timeline.
  const toggleScrubbing = (e: React.MouseEvent<HTMLDivElement>) => {
    const timelineContainer = timelineContainerRef.current;
    const video = videoRef.current;
    if (!timelineContainer || !video) return;

    // Calculate the percentage of the timeline that the user clicked on
    const percent = calculateTimelinePercent(e);

    if (!isScrubbing) {
      setWasPaused(video.paused);
      video.pause();
      setIsScrubbing(true);
    } else {
      // Update the video's position
      video.currentTime = percent * video.duration;

      // Play the video if it was playing before the user started scrubbing
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {})
          .catch((error) => {
            console.error('Error playing video:', error);
          });
      }

      // If the video was paused before the user started scrubbing, pause it again
      if (!wasPaused && video.paused) {
        video.play();
      }

      setIsScrubbing(false);
      setWasPaused(true);
    }

    handleTimelineUpdate(e);
  };

  // This function is called when the user moves their mouse on the timeline.
  const handleTimelineUpdate = (e: React.MouseEvent<HTMLDivElement>) => {
    const timelineContainer = timelineContainerRef.current;
    const video = videoRef.current;
    if (!timelineContainer || !video) return;

    // Calculate the percentage of the timeline that the user clicked on
    const percent = calculateTimelinePercent(e);

    // Update the video's position
    video.currentTime = percent * video.duration;

    // Update the timeline's progress bar
    timelineContainer.style.setProperty(
      '--progress-position',
      `${percent * 100}%`
    );
  };

  // Set the position of the event dot
  const computeDotPosition = (
    eventTime: number,
    videoDuration: number
  ): string => {
    const position = (eventTime / videoDuration) * 100;
    return `${position}%`;
  };

  return (
    <div
      className="timeline-container"
      ref={timelineContainerRef}
      onMouseDown={toggleScrubbing}
      onMouseMove={isScrubbing ? handleTimelineUpdate : undefined}
      data-testid="timeline"
    >
      <div className="timeline">
        <div className="progress-bar"></div>
        <div className="thumb-indicator"></div>

        {events &&
          events.map((event, i) => {
            const video = videoRef.current;
            if (!video) return null;
            const position = computeDotPosition(event.time, video.duration);
            // Check if the event is within 2 seconds of the current time
            const isWithinRange = Math.abs(currentTime - event.time) <= 2;
            return (
              <div
                key={i}
                className="event-dot"
                data-testid="event-dot"
                style={{
                  left: position,
                  // Highlight the event if it is within 2 seconds of the current time
                  backgroundColor: isWithinRange ? '#faad3a' : undefined,
                }}
                onClick={() => {
                  video.currentTime = event.time;
                }}
                title={`${event.type} at ${event.time} seconds`}
              >
                <div className="event-dot-inner">{event.type}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Timeline;
