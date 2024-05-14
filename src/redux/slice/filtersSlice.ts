// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   searchQuery: '',
//   authorFilter: null,
//   locationFilter: null,
//   startDate: null,
//   endDate: null,
// };

// const filtersSlice = createSlice({
//   name: 'filters',
//   initialState,
//   reducers: {
//     setSearchQuery(state, action) {
//       state.searchQuery = action.payload;
//       console.log(state.searchQuery);
//     },
//     setAuthorFilter(state, action) {
//       state.authorFilter = action.payload;
//     },
//     setLocationFilter(state, action) {
//       state.locationFilter = action.payload;
//     },
//     setStartDate(state, action) {
//       state.startDate = action.payload;
//     },
//     setEndDate(state, action) {
//       state.endDate = action.payload;
//     },
//   },
// });

// export const { setSearchQuery, setAuthorFilter, setLocationFilter, setStartDate, setEndDate } =
//   filtersSlice.actions;

// export default filtersSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

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
      console.log(state.searchQuery);
    },
    setAuthorFilter(state, action) {
      state.authorFilter = action.payload;
    },
    setLocationFilter(state, action) {
      state.locationFilter = action.payload;
    },
    setStartDate(state, action) {
      state.startDate = action.payload;
    },
    setEndDate(state, action) {
      state.endDate = action.payload;
    },
    setPage(state, action) {
      state.pageFilter = action.payload
    }
  },
});

export const { setSearchQuery, setAuthorFilter, setLocationFilter, setStartDate, setEndDate } =
  filtersSlice.actions;

export default filtersSlice.reducer;

// добавил фильтр страницы 
