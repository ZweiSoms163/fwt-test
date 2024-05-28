import React from 'react';
import ReactPaginate from 'react-paginate';
import styles from './pagination.module.css';

import { useSelector } from 'react-redux';
import { selectCurrentPage } from '../../redux/slice/filtersSlice';
import { useGetPaintingsQuery } from '../../redux/api/api';
import { RootState } from '../../redux/store';
import ArrowIconRight from '../Ui/ArrowIcon/right';
import ArrowIconLeft from '../Ui/ArrowIcon/left';
import { useTheme } from '../../Context/ChangeTheme';

interface PaginationProps {
  pageCount: number;
  onPageChange: (selectedItem: { selected: number }) => void;
}

const Pagination: React.FC<PaginationProps> = ({ onPageChange, pageCount }) => {
  const filtredPaintings = useSelector((state: RootState) => state.paintings.paintings);
  const currentPage = useSelector(selectCurrentPage);
  const { data: Paintings } = useGetPaintingsQuery();
  const paintingsPerPage = 6;
  const isLastPage = currentPage * paintingsPerPage >= (Paintings?.length || 0);
  const shouldHidePagination =
    filtredPaintings && filtredPaintings.length < paintingsPerPage && !isLastPage;

  const { isDarkTheme } = useTheme();
  return (
    <ReactPaginate
      previousLabel={<ArrowIconLeft isDarkTheme={isDarkTheme} />}
      nextLabel={<ArrowIconRight isDarkTheme={isDarkTheme} />}
      previousClassName={styles.prev}
      pageClassName={styles.page}
      nextClassName={styles.next}
      breakLabel={'...'}
      breakClassName={styles.breakMe}
      pageCount={pageCount}
      marginPagesDisplayed={1}
      pageRangeDisplayed={3}
      onPageChange={onPageChange}
      containerClassName={`${styles.pagination} ${shouldHidePagination ? styles.hidden_pagination : ''}`}
      activeClassName={styles.active}
    />
  );
};

export default Pagination;
