import { createSlice } from '@reduxjs/toolkit';
import { FiltersState } from '../../types';

const initialState = {
  searchQuery: '',
  authorFilter: null,
  locationFilter: null,
  startDate: null,
  endDate: null,
  pageFilter: 1,
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
    setFilters(state, action) {
      const { author, location, startDate, endDate } = action.payload;
      state.authorFilter = author;
      state.locationFilter = location;
      state.startDate = startDate;
      state.endDate = endDate;
    },
    setPage(state, action) {
      state.pageFilter = action.payload;
    },
    applyFilters(state) {
      console.log('Filters applied:', {
        author: state.authorFilter,
        location: state.locationFilter,
        startDate: state.startDate,
        endDate: state.endDate,
      });
    },
    clearFilters(state) {
      state.searchQuery = '';
      state.authorFilter = null;
      state.locationFilter = null;
      state.startDate = null;
      state.endDate = null;
      state.pageFilter = 1;
    },
  },
});

export const selectCurrentPage = (state: { filters: FiltersState }) => state.filters.pageFilter;

export const { setSearchQuery, setFilters, setPage, applyFilters, clearFilters } =
  filtersSlice.actions;

export default filtersSlice.reducer;
