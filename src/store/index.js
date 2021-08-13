import { configureStore } from '@reduxjs/toolkit';
import serviceList from '../reducers/SliceServiceList';

const logger = (store) => (next) => (action) => {
  console.log('dispatchin', action);
  console.log('prev_state', store.getState());
  let result = next(action);
  console.log('next_state', store.getState());
  return result;
};

export default configureStore({
  reducer: { serviceList },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
