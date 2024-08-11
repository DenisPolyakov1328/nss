import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { searchRepositories } from '../services/githubAPI';

interface RepositoriesState {
  data: Array<any>;
  loading: boolean;
  error: string | null;
}

const initialState: RepositoriesState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchRepositories = createAsyncThunk(
  'repositories/fetchRepositories',
  async ({ query, page, perPage, sort, order }: { query: string, page: number, perPage: number, sort: string, order: 'asc' | 'desc' }) => {
    const response = await searchRepositories(query, page, perPage, sort, order);
    return response;
  }
);

const repositoriesSlice = createSlice({
  name: 'repositories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRepositories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRepositories.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.items;
      })
      .addCase(fetchRepositories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch repositories';
      });
  },
});

export default repositoriesSlice.reducer;
