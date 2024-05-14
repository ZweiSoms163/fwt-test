// import gallery from './gallery.module.css';
// import {
//   useGetPaintingsQuery,
//   useGetAuthorsQuery,
//   useGetLocationsQuery,
// } from '../../redux/api/api';
// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { mergePaintingsData } from '../../redux/slice/paintingsSlice';
// import { RootState } from '../../redux/store';
// import { Paintings } from '../../types';

// export default function Gallery() {
//   const dispatch = useDispatch();
//   const filters = useSelector((state: RootState) => state.filters);

//   const {
//     data: paintings,
//     error: paintingsError,
//     isLoading: paintingsLoading,
//   } = useGetPaintingsQuery(filters.searchQuery);

//   const { data: authors, error: authorsError, isLoading: authorsLoading } = useGetAuthorsQuery();
//   const {
//     data: locations,
//     error: locationsError,
//     isLoading: locationsLoading,
//   } = useGetLocationsQuery();

//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (
//       !paintingsLoading &&
//       !authorsLoading &&
//       !locationsLoading &&
//       paintings &&
//       authors &&
//       locations
//     ) {
//       dispatch(mergePaintingsData({ paintings, authors, locations }));
//       setLoading(false);
//     }
//   }, [dispatch, paintings, authors, locations, paintingsLoading, authorsLoading, locationsLoading]);

//   const combinedData = useSelector((state: RootState) => state.paintings.paintings);

//   const filteredData = combinedData;

//   return (
//     <div className={gallery.wrapper}>
//       <div className={gallery.container}>
//         {paintingsError || authorsError || locationsError ? (
//           <div>Oh no, there was an error</div>
//         ) : loading || paintingsLoading || authorsLoading || locationsLoading ? (
//           <div>Loading...</div>
//         ) : (
//           filteredData.map((painting: Paintings) => (
//             <div key={painting.id} className={gallery.painting_container}>
//               <div className={gallery.painting_info}>
//                 <h2 className={gallery.painting_name}>{painting.name}</h2>
//                 <p className={gallery.painting_created}>{painting.created}</p>
//               </div>

//               <div className={gallery.painting_image}>
//                 <img
//                   src={`https://test-front.framework.team/${painting.imageUrl}`}
//                   alt={painting.imageUrl}
//                   style={{ width: '392px', height: '260px' }}
//                 />
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }

// выше код фильтрует только по 1 параметру (поиск по имени)

import gallery from './gallery.module.css';
import {
  useGetPaintingsQuery,
  useGetAuthorsQuery,
  useGetLocationsQuery,
} from '../../redux/api/api';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { mergePaintingsData } from '../../redux/slice/paintingsSlice';
import { RootState } from '../../redux/store';
import { Paintings } from '../../types';

export default function Gallery() {
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.filters);

  const {
    data: paintings,
    error: paintingsError,
    isLoading: paintingsLoading,
  } = useGetPaintingsQuery({
    q: filters.searchQuery,
    authorId: filters.authorFilter ?? undefined,
    locationId: filters.locationFilter ?? undefined,
    created_gte: filters.startDate ?? undefined,
    created_lte: filters.endDate ?? undefined,
    _page: filters.pageFilter,
  });
  // все параметры для фильтрации на сервере, но потом еще раз пройтись
  //  код выполняет всю фильтрацию, но фильтрует автора и локацию не по имени, а по id
  // также после завершеения кода подумать над тем, чтобы не было ререндеров и возможно обернуть что то в usecallback и usememo
  // не забыть про то, что смена темы должна происходить через useContext,а не через redux 
  // также можно подумать над тем, чтобы пробелы не учитывались в inpute (добавить в debounce правило)
  // также обязательно в случае ошибки с сервера все схлопываться не должно (тестить это)
  const { data: authors, error: authorsError, isLoading: authorsLoading } = useGetAuthorsQuery();
  const {
    data: locations,
    error: locationsError,
    isLoading: locationsLoading,
  } = useGetLocationsQuery();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (
      !paintingsLoading &&
      !authorsLoading &&
      !locationsLoading &&
      paintings &&
      authors &&
      locations
    ) {
      dispatch(mergePaintingsData({ paintings, authors, locations }));
      setLoading(false);
    }
  }, [dispatch, paintings, authors, locations, paintingsLoading, authorsLoading, locationsLoading]);

  const combinedData = useSelector((state: RootState) => state.paintings.paintings);

  const filteredData = combinedData;

  return (
    <div className={gallery.wrapper}>
      <div className={gallery.container}>
        {paintingsError || authorsError || locationsError ? (
          <div>Oh no, there was an error</div>
        ) : loading || paintingsLoading || authorsLoading || locationsLoading ? (
          <div>Loading...</div>
        ) : (
          filteredData.map((painting: Paintings) => (
            <div key={painting.id} className={gallery.painting_container}>
              <div className={gallery.painting_info}>
                <h2 className={gallery.painting_name}>{painting.name}</h2>
                <p className={gallery.painting_created}>{painting.created}</p>
              </div>

              <div className={gallery.painting_image}>
                <img
                  src={`https://test-front.framework.team/${painting.imageUrl}`}
                  alt={painting.imageUrl}
                  style={{ width: '392px', height: '260px' }}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
