import { useState, useRef, useContext } from 'react';
import { DurationContext } from './DurationContext';

export default function Controls({
  isPlaying,
  setIsPlaying,
  setIsSettingsOpen,
  intervalRef,
  timeLeftRef,
  timeLeft,
  setTimeLeft,
  active,
}) {
  const startTimeRef = useRef(null);
  const { durations } = useContext(DurationContext);
  const currentDuration = durations[active];

  function handleStartNPause() {
    if (isPlaying) {
      setIsPlaying(false);
      clearInterval(intervalRef.current);
    } else {
      setIsPlaying(true);
      startTimeRef.current = Date.now();

      intervalRef.current = setInterval(() => {
        const timeElapsedInSeconds = Math.trunc(
          (Date.now() - startTimeRef.current) / 1000
        );
        setTimeLeft(timeLeft - timeElapsedInSeconds);
        timeLeftRef.current = timeLeft - timeElapsedInSeconds;
        if (timeLeftRef.current === 0) clearInterval(intervalRef.current);
      }, 10);
    }
  }

  function handleReset() {
    setIsPlaying(false);
    clearInterval(intervalRef.current);
    setTimeLeft(currentDuration);
    timeLeftRef.current = currentDuration;
  }

  return (
    <div className="flex">
      <button onClick={handleStartNPause} className="btn-start">
        {isPlaying ? 'pause' : 'start'}
      </button>
      <button onClick={handleReset} className="btn-restart">
        <i className="fa-solid fa-arrow-rotate-right"></i>
      </button>
      <button onClick={() => setIsSettingsOpen(true)} className="btn-settings">
        <i className="fa-solid fa-gear"></i>
      </button>
    </div>
  );
}
