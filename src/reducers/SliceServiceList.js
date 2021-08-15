import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  status: 'idle',
  editItem: null,
  filter: null,
};

const counterSlice = createSlice({
  name: 'serviceList',
  initialState,
  reducers: {
    put(state, action) {
      state.items = action.payload;
    },
    edit(state, action) {
      state.editItem = action.payload;
    },
    reset(state, action) {
      state.editItem = null;
    },
    setFilter(state, action) {
      state.filter = action.payload;
    },
    fetchStart(state, action) {
      state.status = 'pending';
    },
    fetchSuccess(state, action) {
      state.status = 'success';
    },
    fetchError(state, action) {
      console.error(action.payload);
      state.status = 'error';
    },
  },
});

export const {
  put,
  edit,
  reset,
  setFilter,
  fetchStart,
  fetchSuccess,
  fetchError,
} = counterSlice.actions;
export default counterSlice.reducer;
