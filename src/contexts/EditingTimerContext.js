import { createContext, useState } from 'react';

export const EditingTimerContext = createContext(null);

export default function EditingTimerContextProvider({ children }) {
  const [editingTimer, setEditingTimer] = useState('');
  return (
    <EditingTimerContext.Provider value={{ editingTimer, setEditingTimer }}>
      {children}
    </EditingTimerContext.Provider>
  );
}
