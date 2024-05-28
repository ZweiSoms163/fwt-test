import AddIconDark from '../../../assets/add_icon_dark.svg';
import AddIconLight from '../../../assets/add_icon_light.svg';
import HideIconDark from '../../../assets/hide_icon-dark.svg';
import HideIconLight from '../../../assets/hide_icon_light.svg';
import styles from './toggle_icon.module.css'
interface IconProps {
  isDarkTheme: boolean;
  isOpen: boolean;
}

const ToggleIcon: React.FC<IconProps> = ({ isDarkTheme, isOpen }) => {
  const AddIcon = isDarkTheme ? AddIconDark : AddIconLight;
  const HideIcon = isDarkTheme ? HideIconDark : HideIconLight;

  return <img className={styles.icon} src={isOpen ? HideIcon : AddIcon} alt="toggle_icon" />;
};
export default ToggleIcon;
