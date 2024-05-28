import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { applyFilters, clearFilters, setFilters } from '../../redux/slice/filtersSlice';
import filters from './filters.module.css';
import Close_icon_dark from '../../assets/close_icon_dark.svg';
import Close_icon_light from '../../assets/close_icon_light.svg';

import SelectMenuAuthor from '../Ui/SelectMenuAuthor';
import SelectMenuLocation from '../Ui/SelectMenuLocation';
import SelectMenuYears from '../Ui/SelectMenuYears';
import { useSideMenu } from '../../Context/SideMenuOpen';
import { useTheme } from '../../Context/ChangeTheme';
import ToggleIcon from '../Ui/ToggleIcon';

export default function Filters() {
  const dispatch = useDispatch();
  const { toggleSideMenu, isSideMenuAnimating, isSideMenuOpen } = useSideMenu();
  const [isArtistsOpen, setArtistsIsOpen] = useState(false);
  const [isLocationsOpen, setLocationsIsOpen] = useState(false);
  const [isYearsOpen, setYearsIsOpen] = useState(false);
  const [localAuthor, setLocalAuthor] = useState(null);
  const [localLocation, setLocalLocation] = useState(null);
  const [localStartDate, setLocalStartDate] = useState<string | null>(null);
  const [localEndDate, setLocalEndDate] = useState<string | null>(null);

  const [resetAuthorFlag, setResetAuthorFlag] = useState(false);
  const [resetLocationFlag, setResetLocationFlag] = useState(false);
  const [resetYearsFlag, setResetYearsFlag] = useState(false);

  const { isDarkTheme } = useTheme();

  const filterRef = useRef(null);

  const toggleArtistsDropdown = () => {
    setArtistsIsOpen(!isArtistsOpen);
  };

  const toggleLocationsDropdown = () => {
    setLocationsIsOpen(!isLocationsOpen);
  };

  const toggleYearsDropdown = () => {
    setYearsIsOpen(!isYearsOpen);
  };

  const handleClickOutside = (event: MouseEvent | TouchEvent) => {
    if (
      filterRef.current &&
      !(filterRef.current as HTMLElement).contains(event.target as Node) &&
      isSideMenuOpen
    ) {
      toggleSideMenu();
    }
  };

  useEffect(() => {
    if (isSideMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSideMenuOpen]);

  const handleShowResults = () => {
    if (localAuthor || localLocation || localStartDate || localEndDate) {
      dispatch(
        setFilters({
          author: localAuthor,
          location: localLocation,
          startDate: localStartDate,
          endDate: localEndDate,
        }),
      );
      dispatch(applyFilters());
    }
  };
  const handleClearFilters = () => {
    setLocalAuthor(null);
    setLocalLocation(null);
    setLocalStartDate(null);
    setLocalEndDate(null);

    setResetAuthorFlag(true);
    setResetLocationFlag(true);
    setResetYearsFlag(true);
    dispatch(clearFilters());
  };

  useEffect(() => {
    if (resetAuthorFlag) {
      setResetAuthorFlag(false);
    }
    if (resetLocationFlag) {
      setResetLocationFlag(false);
    }
    if (resetYearsFlag) {
      setResetYearsFlag(false);
    }
  }, [resetAuthorFlag, resetLocationFlag, resetYearsFlag]);

  return (
    <div
      ref={filterRef}
      className={`${filters.wrapper} ${isSideMenuOpen && !isSideMenuAnimating ? filters.slideInFromRight : filters.slideOutToRight}`}>
      <div>
        <div className={filters.closeIcon_box}>
          <img
            src={isDarkTheme ? Close_icon_dark : Close_icon_light}
            alt="Close_icon"
            onClick={toggleSideMenu}
          />
        </div>

        <div className={filters.container}>
          <div>
            <div className={filters.box} onClick={toggleArtistsDropdown}>
              <h2>Artist</h2>
              <ToggleIcon isDarkTheme={isDarkTheme} isOpen={isArtistsOpen} />
            </div>
            {isArtistsOpen && (
              <SelectMenuAuthor
                setLocalAuthor={setLocalAuthor}
                localAuthor={localAuthor}
                resetFlag={resetAuthorFlag}
              />
            )}
          </div>
          <div>
            <div className={filters.box} onClick={toggleLocationsDropdown}>
              <h2>Location</h2>
              <ToggleIcon isDarkTheme={isDarkTheme} isOpen={isLocationsOpen} />
            </div>
            {isLocationsOpen && (
              <SelectMenuLocation
                setLocalLocation={setLocalLocation}
                resetFlag={resetLocationFlag}
              />
            )}
          </div>
          <div>
            <div className={filters.box} onClick={toggleYearsDropdown}>
              <h2>Years</h2>
              <ToggleIcon isDarkTheme={isDarkTheme} isOpen={isYearsOpen} />
            </div>
            {isYearsOpen && (
              <SelectMenuYears
                setLocalStartDate={setLocalStartDate}
                setLocalEndDate={setLocalEndDate}
                resetFlag={resetYearsFlag}
              />
            )}
          </div>
        </div>
      </div>

      <div className={filters.button_box}>
        <div className={filters.button_container}>
          <button
            onClick={handleShowResults}
            disabled={!localAuthor && !localLocation && !localStartDate && !localEndDate}>
            SHOW THE RESULTS
          </button>
          <button onClick={handleClearFilters}>CLEAR</button>
        </div>
      </div>
    </div>
  );
}
