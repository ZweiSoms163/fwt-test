import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '../../redux/slice/filtersSlice';
import { useDebouncedValue } from '../../hooks/useDebouncedValue';
import Gallery from '../Gallery';
import content from './content.module.css';
import filter_icon from '../../assets/filter_icon.svg';

export default function Content() {
  const dispatch = useDispatch();
  const [searchName, setSearchName] = useState('');

  const debouncedSearchName = useDebouncedValue(searchName, 300);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchName(value);
  };

  useEffect(() => {
    dispatch(setSearchQuery(debouncedSearchName));
  }, [dispatch, debouncedSearchName]);

  return (
    <>
      <div className={content.wrapper}>
        <div className={content.search}>
          <input
            type="text"
            placeholder="Painting title"
            className={content.inputField}
            value={searchName}
            onChange={handleSearchChange}></input>
        </div>
        <div className={content.filter}>
          <button>
            <img src={filter_icon} alt="filter_icon" />
          </button>
        </div>
      </div>
      <Gallery />
    </>
  );
}

// выше код рабочий, только без вставки компонета test и без его импорта 

// import { useEffect, useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { setSearchQuery } from '../../redux/slice/filtersSlice';
// import { useDebouncedValue } from '../../hooks/useDebouncedValue';
// import Gallery from '../Gallery';
// import content from './content.module.css';
// import filter_icon from '../../assets/filter_icon.svg';


// import Test from '../test';

// export default function Content() {
//   const dispatch = useDispatch();
//   const [searchName, setSearchName] = useState('');

//   const debouncedSearchName = useDebouncedValue(searchName, 300);

//   const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const value = event.target.value;
//     setSearchName(value);
//   };

//   useEffect(() => {
//     dispatch(setSearchQuery(debouncedSearchName));
//   }, [dispatch, debouncedSearchName]);

//   return (
//     <>
//       <div className={content.wrapper}>
//         <div className={content.search}>
//           <input
//             type="text"
//             placeholder="Painting title"
//             className={content.inputField}
//             value={searchName}
//             onChange={handleSearchChange}></input>
//         </div>
//         <div className={content.filter}>
//           <button>
//             <img src={filter_icon} alt="filter_icon" />
//           </button>
//         </div>
//       </div>
//       <Test/>
//       <Gallery />
//     </>
//   );
// }
