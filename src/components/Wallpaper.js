import { ThemeContext } from './ThemeContext';
import { useContext } from 'react';

export default function Wallpaper({ children }) {
  const { theme } = useContext(ThemeContext);
  return (
    <div
      className="background-wallpaper"
      style={{ backgroundImage: `url(images/${theme}.jpg)` }}
    >
      {children}
    </div>
  );
}
