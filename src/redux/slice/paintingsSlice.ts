// import { createSlice } from '@reduxjs/toolkit';
// import { Paintings, Authors, Locations } from '../../types';

// const initialState = {
//   paintings: [],
// };

// const paintingsSlice = createSlice({
//   name: 'paintings',
//   initialState,
//   reducers: {
//     setPaintings(state, action) {
//       state.paintings = action.payload;
//     },
//     mergePaintingsData(state, action) {
//       const { paintings, authors, locations } = action.payload;
//       state.paintings = paintings.map((painting: Paintings) => {
//         const author = authors.find((author: Authors) => author.id === painting.authorId);
//         const location = locations.find(
//           (location: Locations) => location.id === painting.locationId,
//         );
//         const authorName = author ? author.name : 'Unknown';
//         const locationName = location ? location.location : 'Unknown';
//         const updatedPainting = {
//           ...painting,
//           authorName,
//           locationName,
//         };
//         return updatedPainting;
//       });
//       console.log('Sorted paintings:', state.paintings); // Вывод отсортированного массива
//     },
//   },
// });

// export const { setPaintings, mergePaintingsData } = paintingsSlice.actions;

// export default paintingsSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { Paintings, Authors, Locations } from "../../types";

const initialState = {
  paintings: [],
};

const paintingsSlice = createSlice({
  name: "paintings",
  initialState,
  reducers: {
    setPaintings(state, action) {
      state.paintings = action.payload;
    },
    mergePaintingsData(state, action) {
      const { paintings, authors, locations } = action.payload;
      state.paintings = paintings.map((painting: Paintings) => {
        const author = authors.find(
          (author: Authors) => author.id === painting.authorId,
        );
        const location = locations.find(
          (location: Locations) => location.id === painting.locationId,
        );
        const authorName = author ? author.name : "Unknown";
        const locationName = location ? location.location : "Unknown";
        const updatedPainting = {
          ...painting,
          authorName,
          locationName,
        };
        return updatedPainting;
      });
      console.log("Sorted paintings:", state.paintings);
    },
  },
});

export const { setPaintings, mergePaintingsData } = paintingsSlice.actions;

export default paintingsSlice.reducer;
