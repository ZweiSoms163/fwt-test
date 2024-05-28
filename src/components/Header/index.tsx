import LogoDark from '../../assets/logo_dark-1440.svg';
import Logolight from '../../assets/logo_light-1440.svg';
import DarkIcon from '../../assets/dark_icon.svg';
import LightIcon from '../../assets/light_icon.svg';
import { useTheme } from '../../Context/ChangeTheme';
import styles from './header.module.css';

export default function Header() {
  const { isDarkTheme, toggleTheme } = useTheme();

  return (
    <div className={styles.header}>
      <>
        {isDarkTheme ? (
          <img src={Logolight} alt="Logolight" className={styles.logo_icon} />
        ) : (
          <img src={LogoDark} alt="LogoDark" className={styles.logo_icon} />
        )}
      </>
      <div className={styles.header_icon} onClick={toggleTheme}>
        {isDarkTheme ? (
          <img src={LightIcon} alt="LightIcon" />
        ) : (
          <img src={DarkIcon} alt="DarkIcon" />
        )}
      </div>
    </div>
  );
}
