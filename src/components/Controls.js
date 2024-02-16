import { useState, useRef, useContext, useEffect } from 'react';
import { DurationContext } from '../contexts/DurationContext';
import { SoundContext } from '../contexts/SoundContext';

export default function Controls({
  isPlaying,
  setIsPlaying,
  setIsSettingsOpen,
  intervalRef,
  timeLeft,
  setTimeLeft,
  activeNav,
}) {
  const startTimeRef = useRef(null);
  const [spinCounter, setSpinCounter] = useState(0);
  const { durations } = useContext(DurationContext);
  const currentDuration = durations[activeNav];
  const { sound } = useContext(SoundContext);

  useEffect(() => {
    if (timeLeft === 0) handleTimerComplete();
  }, [timeLeft]);

  function handleTimerComplete() {
    clearInterval(intervalRef.current);
    setIsPlaying(false);
    new Audio(sound).play();
  }

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
      }, 10);
    }
  }

  function handleReset() {
    setIsPlaying(false);
    clearInterval(intervalRef.current);
    setTimeLeft(currentDuration);
    setSpinCounter(spinCounter + 1);
  }

  return (
    <div className="flex">
      <button
        onClick={handleStartNPause}
        className={`btn btn-start ${isPlaying && 'btn-active'}`}
      >
        {isPlaying ? 'pause' : 'start'}
      </button>
      <button
        onClick={handleReset}
        className="btn-restart"
        style={{ transform: `rotate(${spinCounter * 360}deg)` }}
      >
        <i className="fa-solid fa-arrow-rotate-right"></i>
      </button>
      <button onClick={() => setIsSettingsOpen(true)} className="btn-settings">
        <i className="fa-solid fa-gear"></i>
      </button>
    </div>
  );
}
