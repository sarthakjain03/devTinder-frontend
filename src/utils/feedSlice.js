import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addFeed: (state, action) => action.payload,
    removeFeed: (state, action) => null,
    removeUserFromFeed: (state, action) => {
      const newArr = state?.filter((feed) => feed?._id !== action.payload);
      return newArr;
    },
  },
});

export const { addFeed, removeFeed, removeUserFromFeed } = feedSlice.actions;

export default feedSlice.reducer;
