import { useContext } from 'react';
import { toTitleCase } from '../utility';
import { DurationContext } from '../contexts/DurationContext';
import { EditingTimerContext } from '../contexts/EditingTimerContext';

function TimerSetting({ type }) {
  const { durations, setDurations } = useContext(DurationContext);
  const { editingTimer, setEditingTimer } = useContext(EditingTimerContext);

  function EditTimerSetting(e, type) {
    if (e.target.value > 0)
      setDurations({ ...durations, [type]: Number(e.target.value) * 60 });
  }

  function handleArrowClick(e) {
    if (durations[type] / 60 === 1) return;
    const id = e.target.closest('button').id;
    id === 'up'
      ? setDurations({ ...durations, [type]: durations[type] + 60 })
      : setDurations({ ...durations, [type]: durations[type] - 60 });
  }

  return (
    <div className="timer-setting">
      <div>{toTitleCase(type)}</div>
      <input
        type="number"
        value={durations[type] / 60}
        onChange={e => EditTimerSetting(e, type)}
        onClick={() => setEditingTimer(type)}
      />
      <span>minutes</span>
      {editingTimer === type && (
        <div className="arrow-btns" onClick={handleArrowClick}>
          <button className="btn-arrow-up" id="up">
            <i className="fa-solid fa-chevron-up"></i>
          </button>
          <button className="btn-arrow-down" id="down">
            <i className="fa-solid fa-chevron-down"></i>
          </button>
        </div>
      )}
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
