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
  volumeSetting,
}) {
  const startTimeRef = useRef(null);
  const [spinCounter, setSpinCounter] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const { durations } = useContext(DurationContext);
  const currentDuration = durations[activeNav];
  const { sound } = useContext(SoundContext);

  useEffect(() => {
    if (timeLeft === 0) handleTimerComplete();
  }, [timeLeft]);

  function handleTimerComplete() {
    clearInterval(intervalRef.current);
    setIsPlaying(false);
    let audio = new Audio(sound);
    audio.volume = volumeSetting / 100;
    if (!isMuted) audio.play();
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

  function handleToggleVolume() {
    isMuted > 0 ? setIsMuted(0) : setIsMuted(100);
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
      <button onClick={handleToggleVolume} className="btn-volume">
        {isMuted ? (
          <i className="fa-solid fa-volume-xmark"></i>
        ) : (
          <i className="fa-solid fa-volume-high"></i>
        )}
      </button>
    </div>
  );
}
