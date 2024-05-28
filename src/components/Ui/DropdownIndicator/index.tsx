import { components } from 'react-select';
import expand_icon_dark from '../../../assets/expand_icon_dark.svg';
import expand_icon_light from '../../../assets/expand_icon_light.svg';
import reversed_expand_icon_dark from '../../../assets/reversed_expand_icon_dark.svg';
import reversed_expand_icon_light from '../../../assets/reversed_expand_icon_light.svg';

import { useTheme } from '../../../Context/ChangeTheme';

const DropdownIndicator = (props: any) => {
  const { isDarkTheme } = useTheme();
  const { selectProps } = props;
  console.log('selectProps ' + props);

  const isOpen = selectProps.menuIsOpen;

  const icon = isOpen
    ? isDarkTheme
      ? reversed_expand_icon_dark
      : reversed_expand_icon_light
    : isDarkTheme
      ? expand_icon_dark
      : expand_icon_light;
  return (
    <components.DropdownIndicator {...props}>
      <img
        src={icon}
        alt="dropdown indicator"
        style={{
          width: '12px',
          height: '7px',
          marginRight: '16px',
          transition: 'transform 0.3s ease',
          backgroundColor: 'inherit',
        }}
      />
    </components.DropdownIndicator>
  );
};

export default DropdownIndicator;



// немного погрешил any, прошу прощения