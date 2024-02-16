import { useContext } from 'react';
import { capitalise } from '../utility';
import { ActiveModalContext } from '../contexts/ActiveModalContext';
import ActiveModalContextProvider from '../contexts/ActiveModalContext';
import { DurationContext } from '../contexts/DurationContext';
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
      {capitalise(title)}s
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
  active,
  setTimeLeft,
  setIsSettingsOpen,
}) {
  const { durations } = useContext(DurationContext);

  function closeModal() {
    setIsSettingsOpen(false);
  }

  function saveChanges() {
    closeModal();
    setTimeLeft(durations[active]);
  }

  return (
    <ActiveModalContextProvider>
      <div
        className="overlay"
        onClick={e => {
          const modal = e.target.closest('.modal');
          if (!modal) closeModal();
        }}
      >
        <div className="modal">
          <button className="btn-exit" onClick={closeModal}>
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
