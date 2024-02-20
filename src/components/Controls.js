import { useState, useRef, useContext } from 'react';
import { DurationContext } from '../contexts/DurationContext';
import { SoundContext } from '../contexts/SoundContext';
import { VolumeContext } from '../contexts/VolumeContext';
import { ThemeContext } from '../contexts/ThemeContext';

export default function Controls({
  isPlaying,
  setIsPlaying,
  setIsSettingsOpen,
  intervalRef,
  timeLeft,
  setTimeLeft,
  activeNav,
  initialSettingsRef,
}) {
  const startTimeRef = useRef(null);
  const [spinCounter, setSpinCounter] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const { durations } = useContext(DurationContext);
  const currentDuration = durations[activeNav];
  const { theme } = useContext(ThemeContext);
  const { sound } = useContext(SoundContext);
  const { volume } = useContext(VolumeContext);

  const timeLeftRef = useRef(0);

  function handleTimerComplete() {
    clearInterval(intervalRef.current);
    setIsPlaying(false);
    setTimeLeft(currentDuration);
    let audio = new Audio(sound);
    audio.volume = volume / 100;
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
        timeLeftRef.current = timeLeft - timeElapsedInSeconds;
        if (timeLeftRef.current === 0) handleTimerComplete();
        console.log(timeLeftRef);
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

  function onSettings() {
    setIsSettingsOpen(true);
    initialSettingsRef.current = { durations, theme, sound, volume };
  }

  return (
    <div className="flex">
      <button
        onClick={handleStartNPause}
        className={`btn btn-start ${isPlaying && 'btn-start-active'}`}
      >
        {isPlaying ? 'pause' : 'start'}
      </button>
      <button
        onClick={handleReset}
        className="btn-icon"
        style={{ transform: `rotate(${spinCounter * 360}deg)` }}
      >
        <i className="fa-solid fa-arrow-rotate-right"></i>
      </button>
      <button onClick={onSettings} className="btn-icon">
        <i className="fa-solid fa-gear"></i>
      </button>
      <button onClick={handleToggleVolume} className="btn-icon btn-volume">
        {isMuted ? (
          <i className="fa-solid fa-volume-xmark"></i>
        ) : (
          <i className="fa-solid fa-volume-high"></i>
        )}
      </button>
    </div>
  );
}
