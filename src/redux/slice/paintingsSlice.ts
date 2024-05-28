// import { createSlice } from "@reduxjs/toolkit";
// import { Paintings, Authors, Locations } from "../../types";

// const initialState = {
//   paintings: [],
// };

// const paintingsSlice = createSlice({
//   name: "paintings",
//   initialState,
//   reducers: {
//     setPaintings(state, action) {
//       state.paintings = action.payload;
//     },
//     mergePaintingsData(state, action) {
//       const { paintings, authors, locations } = action.payload;
//       state.paintings = paintings.map((painting: Paintings) => {
//         const author = authors.find(
//           (author: Authors) => author.id === painting.authorId,
//         );
//         const location = locations.find(
//           (location: Locations) => location.id === painting.locationId,
//         );
//         const authorName = author ? author.name : "Unknown";
//         const locationName = location ? location.location : "Unknown";
//         const updatedPainting = {
//           ...painting,
//           authorName,
//           locationName,
//         };
//         return updatedPainting;
//       });
//     },
//   },
// });

// export const { setPaintings, mergePaintingsData } = paintingsSlice.actions;

// export default paintingsSlice.reducer;

// сверху без типизации 

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Paintings, Authors, Locations } from '../../types';

interface PaintingsState {
  paintings: Paintings[];
}

const initialState: PaintingsState = {
  paintings: [],
};

const paintingsSlice = createSlice({
  name: 'paintings',
  initialState,
  reducers: {
    setPaintings(state, action: PayloadAction<Paintings[]>) {
      state.paintings = action.payload;
    },
    mergePaintingsData(
      state,
      action: PayloadAction<{ paintings: Paintings[]; authors: Authors[]; locations: Locations[] }>,
    ) {
      const { paintings, authors, locations } = action.payload;
      state.paintings = paintings.map((painting) => {
        const author = authors.find((author) => author.id === painting.authorId);
        const location = locations.find((location) => location.id === painting.locationId);
        const authorName = author ? author.name : 'Unknown';
        const locationName = location ? location.location : 'Unknown';
        const updatedPainting = {
          ...painting,
          authorName,
          locationName,
        };
        return updatedPainting;
      });
    },
  },
});

export const { setPaintings, mergePaintingsData } = paintingsSlice.actions;

export default paintingsSlice.reducer;
