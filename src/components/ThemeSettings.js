import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext.js';

export default function ThemeSettings() {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <label>
      Select theme:
      <div className="custom-select">
        <select
          name="theme"
          value={theme}
          onChange={e => setTheme(e.target.value)}
        >
          <option value="coffee">Coffee</option>
          <option value="leaves">Leaves</option>
          <option value="clouds">Clouds</option>
          <option value="books">Books</option>
        </select>
        <i className="fa-solid fa-chevron-down icon-dropdown"></i>
      </div>
    </label>
  );
}
