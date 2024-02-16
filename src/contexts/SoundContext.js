import { createContext, useState } from 'react';
import success from '../audio/success-sound.wav';

export const SoundContext = createContext(null);

export default function SoundContextProvider({ children }) {
  const [sound, setSound] = useState(success);

  return (
    <SoundContext.Provider value={{ sound, setSound }}>
      {children}
    </SoundContext.Provider>
  );
}
