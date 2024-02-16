import { createContext, useState } from 'react';

export const ActiveModalContext = createContext(null);

export default function ActiveModalContextProvider({ children }) {
  const [activeModal, setActiveModal] = useState('timer');
  return (
    <ActiveModalContext.Provider value={{ activeModal, setActiveModal }}>
      {children}
    </ActiveModalContext.Provider>
  );
}
