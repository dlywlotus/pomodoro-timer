import { useContext, useEffect, useRef } from 'react';
import { SoundContext } from '../contexts/SoundContext';
import { VolumeContext } from '../contexts/VolumeContext';
import bird from '../audio/bird-sound.wav';
import success from '../audio/success-sound.wav';
import bell from '../audio/bell-sound.wav';
import videogame from '../audio/videogame-sound.wav';

export default function SoundSettings() {
  const { sound, setSound } = useContext(SoundContext);
  const { volume, setVolume } = useContext(VolumeContext);
  const alertSoundRef = useRef(null);
  const soundRef = useRef(sound);

  function onSelectSound(e) {
    setSound(e.target.value);
    soundRef.current = e.target.value;
    alertSoundRef.current?.pause();
    alertSoundRef.current = new Audio(soundRef.current);
    alertSoundRef.current.play();
  }

  function onSetVolume() {
    alertSoundRef.current?.pause();
    alertSoundRef.current = new Audio(sound);
    alertSoundRef.current.volume = volume / 100;
    alertSoundRef.current.play();
  }

  return (
    <div>
      <label>
        Select alert sound:
        <div className="custom-select">
          <select name="sound" value={sound} onChange={onSelectSound}>
            <option value={success}>Success</option>
            <option value={bird}>Bird</option>
            <option value={videogame}>video game</option>
            <option value={bell}>bell</option>
          </select>
          <i className="fa-solid fa-chevron-down icon-dropdown"></i>
        </div>
      </label>
      <label className="alert-vol">
        Alert volume:
        <input
          type="range"
          min={0}
          max={100}
          value={volume}
          onChange={e => setVolume(Number(e.target.value))}
          onMouseUp={onSetVolume}
          onTouchEnd={onSetVolume}
          style={{
            background: `linear-gradient(to right, #fff ${volume}%,  hsl(212, 9%, 67%) ${volume}%)`,
          }}
        />
      </label>
    </div>
  );
}
