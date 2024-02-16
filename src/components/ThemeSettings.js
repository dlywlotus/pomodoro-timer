import { useContext } from 'react';
import { ThemeContext } from './ThemeContext.js';

export default function ThemeSettings() {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <label>
      Select theme:
      <select
        name="theme"
        value={theme}
        onChange={e => setTheme(e.target.value)}
      >
        <option value="coffee">Coffee</option>
        <option value="leaves">Leaves</option>
        <option value="books">Books</option>
        <option value="sky">Sky</option>
      </select>
    </label>
  );
}
