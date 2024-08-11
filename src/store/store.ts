import { configureStore } from '@reduxjs/toolkit';
import repositoriesReducer from '../features/repositoriesSlice';
import repositoryDetailsReducer from '../features/repositoryDetailsSlice';

const store = configureStore({
  reducer: {
    repositories: repositoriesReducer,
    repositoryDetails: repositoryDetailsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
