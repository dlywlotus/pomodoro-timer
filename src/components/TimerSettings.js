import { useContext } from 'react';
import { DurationContext } from '../contexts/DurationContext';

function TimerSetting({ type }) {
  const { durations, setDurations } = useContext(DurationContext);

  function EditTimerSetting(e, type) {
    setDurations({ ...durations, [type]: Number(e.target.value) * 60 });
  }

  return (
    <div className="timer-setting">
      <div>Pomodoro</div>
      <input
        type="number"
        value={durations[type] / 60}
        onChange={e => EditTimerSetting(e, type)}
      />
      <span>minutes</span>
    </div>
  );
}

export default function AllTimerSettings() {
  return (
    <div className="timers-setting-page">
      <TimerSetting type={'pomodoro'} />
      <TimerSetting type={'shortBreak'} />
      <TimerSetting type={'longBreak'} />
    </div>
  );
}
