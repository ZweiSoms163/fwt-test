import arrow_right_light from '../../../assets/arrow_right_light.svg';
import arrow_right_dark from '../../../assets/arrow_right_dark.svg';

interface IconProps {
  isDarkTheme: boolean;
}

const ArrowIconRight: React.FC<IconProps> = ({ isDarkTheme }) => {
  const arrow_right = isDarkTheme ? arrow_right_dark : arrow_right_light;

  return <img src={arrow_right} alt="ArrowIconRight" />;
};
export default ArrowIconRight;
