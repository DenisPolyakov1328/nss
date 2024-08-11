import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getRepositoryDetails } from '../services/githubAPI';

interface RepositoryDetailsState {
  data: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: RepositoryDetailsState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchRepositoryDetails = createAsyncThunk(
  'repositoryDetails/fetchRepositoryDetails',
  async ({ owner, repo }: { owner: string, repo: string }) => {
    const response = await getRepositoryDetails(owner, repo);
    return response;
  }
);

const repositoryDetailsSlice = createSlice({
  name: 'repositoryDetails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRepositoryDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRepositoryDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchRepositoryDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch repository details';
      });
  },
});

export default repositoryDetailsSlice.reducer;
