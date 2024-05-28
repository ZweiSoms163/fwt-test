import arrow_left_dark from '../../../assets/arrow_left_dark.svg';
import arrow_left_light from '../../../assets/arrow_left_light.svg';

interface IconProps {
  isDarkTheme: boolean;
}

const ArrowIconLeft: React.FC<IconProps> = ({ isDarkTheme }) => {
  const arrow_left = isDarkTheme ? arrow_left_dark : arrow_left_light;

  return <img src={arrow_left} alt="ArrowIconLeft" />;
};
export default ArrowIconLeft;
