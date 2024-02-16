import './App.css';
import 'typeface-roboto';
import { toCamelCase } from './utility';
import { useState, useRef, useContext } from 'react';
import Controls from './components/Controls';
import Settings from './components/Settings';
import Wallpaper from './components/Wallpaper';
import { DurationContext } from './contexts/DurationContext';
import DurationContextProvider from './contexts/DurationContext';
import { ThemeContext } from './contexts/ThemeContext';

function NavButton({ active, setActive, text, onReset }) {
  const { durations } = useContext(DurationContext);
  function onClick() {
    const camelCaseText = toCamelCase(text);
    onReset(durations[camelCaseText]);
    setActive(camelCaseText);
  }

  return (
    <button
      onClick={onClick}
      className={`btn-transparent ${
        active === toCamelCase(text) && 'btn-transparent-active'
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
  const [active, setActive] = useState('pomodoro');

  const [timeLeft, setTimeLeft] = useState(1500);
  const timeLeftRef = useRef(null);
  const intervalRef = useRef(null);

  const [theme, setTheme] = useState('coffee');

  function handleReset(time) {
    setIsPlaying(false);
    clearInterval(intervalRef.current);
    setTimeLeft(time);
    timeLeftRef.current = time;
  }

  return (
    <DurationContextProvider>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <Wallpaper>
          <section>
            {isSettingsOpen && (
              <Settings
                setTimeLeft={setTimeLeft}
                setIsSettingsOpen={setIsSettingsOpen}
                active={active}
              />
            )}
            <NavButtons
              onReset={handleReset}
              active={active}
              setActive={setActive}
            />
            <Timer timeLeft={timeLeft} />
            <Controls
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
              setIsSettingsOpen={setIsSettingsOpen}
              active={active}
              intervalRef={intervalRef}
              timeLeftRef={timeLeftRef}
              timeLeft={timeLeft}
              setTimeLeft={setTimeLeft}
            />
          </section>
        </Wallpaper>
      </ThemeContext.Provider>
    </DurationContextProvider>
  );
}

export default App;
