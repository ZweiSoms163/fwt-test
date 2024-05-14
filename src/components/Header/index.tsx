import LogoDark from "../../assets/logo_dark-1440.svg";
import Logolight from "../../assets/logo_light-1440.svg";
import DarkIcon from "../../assets/dark_icon.svg";
import LightIcon from "../../assets/light_icon.svg";
import "./style.css";

export default function Header() {
  const darkTheme = true; // Для темы лучше использовать контекст, чтобы не мешать бизнес данные и ui (замечание тех лида )
  return (
    // еще не все с hover и pressed цветом кнопок, потом доделать
    <div className="header">
      <div>
        {darkTheme ? (
          <img src={Logolight} alt="Logolight" />
        ) : (
          <img src={LogoDark} alt="LogoDark" />
        )}
      </div>
      <div className="header-icon">
        {darkTheme ? (
          <img src={LightIcon} alt="LightIcon" />
        ) : (
          <img src={DarkIcon} alt="DarkIcon" />
        )}
      </div>
    </div>
  );
}
