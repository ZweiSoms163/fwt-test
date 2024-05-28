import gallery from './gallery.module.css';
import {
  useGetAuthorsQuery,
  useGetLocationsQuery,
  useGetFiltersPaintingsQuery,
} from '../../redux/api/api';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { mergePaintingsData } from '../../redux/slice/paintingsSlice';
import { RootState } from '../../redux/store';
import { Paintings } from '../../types';
import arrow_icon from '../../assets/arrow_icon.svg';

export default function Gallery() {
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.filters);

  const {
    data: paintings,
    error: paintingsError,
    isLoading: paintingsLoading,
  } = useGetFiltersPaintingsQuery({
    q: filters.searchQuery,
    authorId: filters.authorFilter ?? undefined,
    locationId: filters.locationFilter ?? undefined,
    created_gte: filters.startDate ?? undefined,
    created_lte: filters.endDate ?? undefined,
    _page: filters.pageFilter ?? undefined,
  });
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

  return (
    <div className={gallery.wrapper}>
      <div className={gallery.container}>
        {paintingsError || authorsError || locationsError ? (
          <div>Oh no, there was an error</div>
        ) : loading || paintingsLoading || authorsLoading || locationsLoading ? (
          <div>Loading...</div>
        ) : combinedData.length === 0 ? (
          <div>
            <h3>No matches for {filters.searchQuery}</h3>
            <p className={gallery.tryAgain}>
              Please try again with a different spelling or keywords.
            </p>
          </div>
        ) : (
          combinedData.map((painting: Paintings) => (
            <div key={painting.id} className={gallery.painting_container}>
              <div className={gallery.painting_info}>
                <span className={gallery.painting_strip}></span>
                <div className={gallery.sideArrow}>
                  <img src={arrow_icon} alt="arrow_icon" />
                </div>
                <div className={gallery.default_info}>
                  <h2 className={gallery.painting_name}>{painting.name}</h2>
                  <p className={gallery.painting_created}>{painting.created}</p>
                </div>

                <div className={gallery.hover_info}>
                  <h2 className={gallery.painting_author}>{painting.authorName}</h2>
                  <p className={gallery.painting_location}>{painting.locationName}</p>
                </div>
              </div>
              <div className={gallery.img_box}>
                <img
                  src={`https://test-front.framework.team/${painting.imageUrl}`}
                  alt={painting.imageUrl}
                  className={gallery.painting_img}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
