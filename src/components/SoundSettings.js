import { useContext, useEffect, useRef } from 'react';
import { SoundContext } from '../contexts/SoundContext';
import bird from '../audio/bird-sound.wav';
import success from '../audio/success-sound.wav';
import bell from '../audio/bell-sound.wav';
import videogame from '../audio/videogame-sound.wav';

export default function SoundSettings() {
  const isChangingRef = useRef(false);
  const { sound, setSound } = useContext(SoundContext);

  useEffect(() => {
    if (!isChangingRef.current) return;
    const alertSound = new Audio(sound);
    console.log('ehllo');
    alertSound.play();
    isChangingRef.current = false;
    return () => {
      setTimeout(() => {
        alertSound.pause();
      }, 150);
    };
  }, [sound]);

  function onChange(e) {
    setSound(e.target.value);
    isChangingRef.current = true;
  }

  return (
    <label>
      Select alert sound:
      <select name="sound" value={sound} onChange={onChange}>
        <option value={success}>Success</option>
        <option value={bird}>Bird</option>
        <option value={videogame}>video game</option>
        <option value={bell}>bell</option>
      </select>
    </label>
  );
}
