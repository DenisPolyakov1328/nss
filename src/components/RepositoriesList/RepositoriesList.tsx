import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRepositories } from '../../features/repositoriesSlice';
import { RootState, AppDispatch } from '../../store/store';

const RepositoriesList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector((state: RootState) => state.repositories);

  useEffect(() => {
    dispatch(fetchRepositories({ query: 'react', page: 1, perPage: 10, sort: 'stars', order: 'desc' }));
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <ul>
      {data.map((repo) => (
        <li key={repo.id}>{repo.name}</li>
      ))}
    </ul>
  );
};

export default RepositoriesList;
