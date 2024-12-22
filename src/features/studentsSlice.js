import { createSlice } from '@reduxjs/toolkit';
import { fetchAllStudents, createStudent, updateStudent, deleteStudent } from './studentsApi';

const studentsSlice = createSlice({
  name: 'students',
  initialState: {
    list: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch students
      .addCase(fetchAllStudents.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllStudents.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
        state.error = null;
      })
      .addCase(fetchAllStudents.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Create student
      .addCase(createStudent.fulfilled, (state, action) => {
        state.list.unshift(action.payload);
        state.error = null;
      })
      .addCase(createStudent.rejected, (state, action) => {
        state.error = action.payload;
      })
      // Update student
      .addCase(updateStudent.fulfilled, (state, action) => {
        const index = state.list.findIndex((student) => student.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
        state.error = null;
      })
      .addCase(updateStudent.rejected, (state, action) => {
        state.error = action.payload;
      })
      // Delete student
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.list = state.list.filter((student) => student.id !== action.payload);
        state.error = null;
      })
      .addCase(deleteStudent.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearError } = studentsSlice.actions;
export default studentsSlice.reducer;
