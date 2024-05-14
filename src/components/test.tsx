import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setAuthorFilter,
  setLocationFilter,
  setSearchQuery,
  setStartDate,
  setEndDate,
} from '../redux/slice/filtersSlice';
import { RootState } from '../redux/store/index';

/* сейчас я получаю объединенный массив (из 3 в 1 ) и фильтрацию по authorId и locationId, а должен делать по их имени(authorName) и названию (locationName)
потом удалить, просто для теста создал 
*/
const Test = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.filters);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    dispatch(setSearchQuery(value));
  };

  const handleAuthorFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    dispatch(setAuthorFilter(value));
  };

  const handleLocationFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    dispatch(setLocationFilter(value));
  };

  const handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    dispatch(setStartDate(value));
  };

  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    dispatch(setEndDate(value));
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search Name"
        value={filters.searchQuery}
        onChange={handleSearchChange}
      />
      <input
        type="text"
        placeholder="Author Filter"
        value={filters.authorFilter ?? ''}
        onChange={handleAuthorFilterChange}
      />
      <input
        type="text"
        placeholder="Location Filter"
        value={filters.locationFilter ?? ''}
        onChange={handleLocationFilterChange}
      />
      <input
        type="date"
        placeholder="Start Date"
        value={filters.startDate ?? ''}
        onChange={handleStartDateChange}
      />
      <input
        type="date"
        placeholder="End Date"
        value={filters.endDate ?? ''}
        onChange={handleEndDateChange}
      />
    </div>
  );
};

export default Test;
