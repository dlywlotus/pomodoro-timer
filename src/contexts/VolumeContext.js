import { useState, createContext } from 'react';

export const VolumeContext = createContext(null);

export default function VolumeContextProvider({ children }) {
  const [volume, setVolume] = useState(100);

  return (
    <VolumeContext.Provider value={{ volume, setVolume }}>
      {children}
    </VolumeContext.Provider>
  );
}
