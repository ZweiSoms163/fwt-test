import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPage, setSearchQuery } from '../../redux/slice/filtersSlice';
import { useDebouncedValue } from '../../hooks/useDebouncedValue';
import Gallery from '../Gallery';
import content from './content.module.css';
import filter_icon_dark from '../../assets/filter_icon_dark.svg';
import filter_icon_light from '../../assets/filter_icon_light.svg';
import Filters from '../Filters';
import { useSideMenu } from '../../Context/SideMenuOpen';
import { useTheme } from '../../Context/ChangeTheme';
import Pagination from '../Pagination';
import { useGetPaintingsQuery } from '../../redux/api/api';

export default function Content() {
  const { data: Paintings } = useGetPaintingsQuery();

  const pageCount = Math.ceil((Paintings?.length || 0) / 6);

  const dispatch = useDispatch();
  const { isDarkTheme } = useTheme();
  const [searchName, setSearchName] = useState('');
  const { isSideMenuOpen, toggleSideMenu } = useSideMenu();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchName(value);
  };

  const debouncedSearchName = useDebouncedValue(searchName, 300);
  useEffect(() => {
    dispatch(setSearchQuery(debouncedSearchName));
  }, [dispatch, debouncedSearchName]);
  const handlePageClick = (data: { selected: number }) => {
    dispatch(setPage(data.selected + 1));
  };

  return (
    <>
      <div className={content.wrapper}>
        <div className={content.search}>
          <input
            type="text"
            id="name"
            placeholder="Painting title"
            className={isDarkTheme ? content.inputFieldDark : content.inputFieldLight}
            value={searchName}
            onChange={handleSearchChange}
            autoComplete="off"
          />
        </div>

        <div className={content.filter}>
          <button onClick={() => toggleSideMenu()}>
            <img src={isDarkTheme ? filter_icon_dark : filter_icon_light} alt="filter_icon" />
          </button>
        </div>
      </div>
      {isSideMenuOpen && <Filters />}
      <Gallery />
      <Pagination onPageChange={handlePageClick} pageCount={pageCount} />
    </>
  );
}
