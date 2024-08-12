import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { searchRepositories } from '../services/githubAPI';

interface RepositoriesState {
  data: Array<any>;
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalCount: number;
}

const initialState: RepositoriesState = {
  data: [],
  loading: false,
  error: null,
  currentPage: 1,
  totalCount: 0,
};

// Асинхронное действие для поиска репозиториев
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
  reducers: {
    // Редьюсер для обновления текущей страницы
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRepositories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRepositories.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.items;
        state.totalCount = action.payload.total_count;
      })
      .addCase(fetchRepositories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch repositories';
      });
  },
});

// Экспортируем actions и reducer
export const { setPage } = repositoriesSlice.actions;
export default repositoriesSlice.reducer;
