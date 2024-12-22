import { createAsyncThunk } from '@reduxjs/toolkit';
import * as studentsAPI from '../api/students';

export const fetchAllStudents = createAsyncThunk(
  'students/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await studentsAPI.fetchStudents();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createStudent = createAsyncThunk(
  'students/create',
  async (student, { rejectWithValue }) => {
    try {
      return await studentsAPI.addStudent(student);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateStudent = createAsyncThunk(
  'students/update',
  async ({ id, updates }, { rejectWithValue }) => {
    try {
      return await studentsAPI.updateStudent(id, updates);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteStudent = createAsyncThunk(
  'students/delete',
  async (id, { rejectWithValue }) => {
    try {
      await studentsAPI.deleteStudent(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
