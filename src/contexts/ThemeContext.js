import { useState, createContext } from 'react';

export const ThemeContext = createContext(null);

export default function ThemeContextProvider({ children }) {
  const [theme, setTheme] = useState('coffee');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
