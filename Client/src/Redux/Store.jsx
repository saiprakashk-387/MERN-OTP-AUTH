import { combineReducers, configureStore } from '@reduxjs/toolkit';
import sampleReducer from './Slice';

const rootReducer = combineReducers({
  auth: sampleReducer 
});

const store = configureStore({ reducer: rootReducer });
export default store;