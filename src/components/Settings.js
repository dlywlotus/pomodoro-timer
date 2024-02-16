import { useContext, useEffect, useRef } from 'react';
import { capitalise } from '../utility';
import ActiveModalContextProvider from '../contexts/ActiveModalContext';
import { ActiveModalContext } from '../contexts/ActiveModalContext';
import { DurationContext } from '../contexts/DurationContext';
import { ThemeContext } from '../contexts/ThemeContext.js';
import ThemeSettings from './ThemeSettings';
import TimerSettings from './TimerSettings';
import SoundSettings from './SoundSettings';

function NavLink({ title }) {
  const { activeModal, setActiveModal } = useContext(ActiveModalContext);
  return (
    <li
      className={activeModal === title ? 'active-modal' : ''}
      onClick={() => setActiveModal(title)}
    >
      {capitalise(title)}
    </li>
  );
}

function SettingsNav() {
  return (
    <nav>
      <ul className="modal-sidebar">
        <NavLink title={'theme'} />
        <NavLink title={'timer'} />
        <NavLink title={'sound'} />
      </ul>
    </nav>
  );
}

function SettingsDisplay({ children }) {
  const { activeModal } = useContext(ActiveModalContext);
  return (
    <div className="settings-display">
      {activeModal === 'theme' && <ThemeSettings />}
      {activeModal === 'sound' && <SoundSettings />}
      {activeModal === 'timer' && <TimerSettings />}
      {children}
    </div>
  );
}

export default function SettingsModal({
  activeNav,
  setTimeLeft,
  isSettingsOpen,
  setIsSettingsOpen,
}) {
  const { durations, setDurations } = useContext(DurationContext);
  const { theme, setTheme } = useContext(ThemeContext);
  const initialSettingsRef = useRef(null);

  useEffect(() => {
    initialSettingsRef.current = { durations, theme };
  }, [isSettingsOpen]);

  function exitModal() {
    setIsSettingsOpen(false);
    setTheme(initialSettingsRef.current.theme);
    setDurations(initialSettingsRef.current.durations);
  }

  function saveChanges() {
    setIsSettingsOpen(false);
    setTimeLeft(durations[activeNav]);
  }

  return (
    <ActiveModalContextProvider>
      <div
        className={`overlay ${isSettingsOpen && 'overlay-active'}`}
        onClick={e => {
          if (!e.target.closest('.modal')) exitModal();
        }}
      >
        <div className={`modal ${isSettingsOpen && 'modal-active'}`}>
          <button className="btn-exit" onClick={exitModal}>
            <i className="fa-solid fa-xmark"></i>
          </button>
          <SettingsNav />
          <SettingsDisplay>
            <button onClick={saveChanges} className="btn-save">
              Save changes
            </button>
          </SettingsDisplay>
        </div>
      </div>
    </ActiveModalContextProvider>
  );
}
