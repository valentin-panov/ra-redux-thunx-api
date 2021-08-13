import { configureStore } from '@reduxjs/toolkit';
import serviceList from '../reducers/SliceServiceList';
import thunk from 'redux-thunk';

const logger = (store) => (next) => (action) => {
  console.log('dispatchin', action);
  console.log('prev_state', store.getState());
  let result = next(action);
  console.log('next_state', store.getState());
  return result;
};

export default configureStore({
  reducer: { serviceList },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk, logger),
});
