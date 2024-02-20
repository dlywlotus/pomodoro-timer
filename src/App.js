import './App.css';
import 'typeface-roboto';
import { toCamelCase } from './utility';
import { useState, useRef, useContext } from 'react';
import Controls from './components/Controls';
import Settings from './components/Settings';
import Wallpaper from './components/Wallpaper';
import { DurationContext } from './contexts/DurationContext';
import DurationContextProvider from './contexts/DurationContext';
import ThemeContextProvider from './contexts/ThemeContext';
import SoundContextProvider from './contexts/SoundContext';
import VolumeContextProvider from './contexts/VolumeContext';
import EditingTimerContextProvider from './contexts/EditingTimerContext';

function NavButton({ activeNav, setActiveNav, text, onReset }) {
  const { durations } = useContext(DurationContext);
  function onClick() {
    const camelCaseText = toCamelCase(text);
    onReset(durations[camelCaseText]);
    setActiveNav(camelCaseText);
  }

  return (
    <button
      onClick={onClick}
      className={`btn btn-nav ${
        activeNav === toCamelCase(text) && 'btn-nav-active'
      }`}
    >
      {text}
    </button>
  );
}

function NavButtons(props) {
  return (
    <div className="flex">
      <NavButton text={'pomodoro'} {...props} />
      <NavButton text={'short break'} {...props} />
      <NavButton text={'long break'} {...props} />
    </div>
  );
}

function Timer({ timeLeft }) {
  const min = String(Math.trunc(timeLeft / 60));
  const sec = String(timeLeft % 60);
  const minutes = min.length < 2 ? '0' + min : min;
  const seconds = sec.length < 2 ? '0' + sec : sec;
  return (
    <h1 className="timer center">
      {minutes}:{seconds}
    </h1>
  );
}

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('pomodoro');

  const [timeLeft, setTimeLeft] = useState(1500);
  const timeLeftRef = useRef(null);
  const intervalRef = useRef(null);
  const initialSettingsRef = useRef(null);

  function handleReset(time) {
    setIsPlaying(false);
    clearInterval(intervalRef.current);
    setTimeLeft(time);
    timeLeftRef.current = time;
  }

  return (
    <DurationContextProvider>
      <ThemeContextProvider>
        <SoundContextProvider>
          <VolumeContextProvider>
            <Wallpaper>
              <section draggable="false">
                <EditingTimerContextProvider>
                  <Settings
                    setTimeLeft={setTimeLeft}
                    isSettingsOpen={isSettingsOpen}
                    setIsSettingsOpen={setIsSettingsOpen}
                    activeNav={activeNav}
                    initialSettingsRef={initialSettingsRef}
                  />
                </EditingTimerContextProvider>
                <NavButtons
                  onReset={handleReset}
                  activeNav={activeNav}
                  setActiveNav={setActiveNav}
                />
                <Timer timeLeft={timeLeft} />
                <Controls
                  isPlaying={isPlaying}
                  setIsPlaying={setIsPlaying}
                  setIsSettingsOpen={setIsSettingsOpen}
                  activeNav={activeNav}
                  intervalRef={intervalRef}
                  timeLeftRef={timeLeftRef}
                  timeLeft={timeLeft}
                  setTimeLeft={setTimeLeft}
                  initialSettingsRef={initialSettingsRef}
                />
              </section>
            </Wallpaper>
          </VolumeContextProvider>
        </SoundContextProvider>
      </ThemeContextProvider>
    </DurationContextProvider>
  );
}

export default App;
