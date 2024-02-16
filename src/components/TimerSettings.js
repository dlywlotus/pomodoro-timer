import { useContext } from 'react';
import { DurationContext } from './DurationContext';

export default function TimerSettings() {
  function changePomodoro(e) {
    setDurations({ ...durations, pomodoro: Number(e.target.value) * 60 });
  }
  function changeShortBreak(e) {
    setDurations({ ...durations, shortBreak: Number(e.target.value) * 60 });
  }
  function changeLongBreak(e) {
    setDurations({ ...durations, longBreak: Number(e.target.value) * 60 });
  }

  const { durations, setDurations } = useContext(DurationContext);

  return (
    <div className="timers-setting-page">
      <div className="timer-setting">
        <div>Pomodoro</div>
        <input
          type="number"
          value={durations['pomodoro'] / 60}
          onChange={changePomodoro}
        />
        <span>minutes</span>
      </div>
      <div className="timer-setting">
        <div>Short Break</div>
        <input
          type="number"
          value={durations['shortBreak'] / 60}
          onChange={changeShortBreak}
        />
        <span>minutes</span>
      </div>
      <div className="timer-setting">
        <div>Long Break</div>
        <input
          type="number"
          value={durations['longBreak'] / 60}
          onChange={changeLongBreak}
        />
        <span>minutes</span>
      </div>
    </div>
  );
}
