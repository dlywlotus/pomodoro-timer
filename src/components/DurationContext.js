import { createContext, useState } from 'react';

const initialDurations = {
  pomodoro: 1500,
  shortBreak: 300,
  longBreak: 600,
};

export const DurationContext = createContext(null);

export default function DurationContextProvider({ children }) {
  const [durations, setDurations] = useState(initialDurations);
  return (
    <DurationContext.Provider value={{ durations, setDurations }}>
      {children}
    </DurationContext.Provider>
  );
}
