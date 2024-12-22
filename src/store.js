import { configureStore } from '@reduxjs/toolkit';
import studentsReducer from './features/studentsSlice'; // Ensure the correct import

const store = configureStore({
  reducer: {
    students: studentsReducer,
  },
});

export default store;