import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  CircularProgress,
  TablePagination
} from '@mui/material'
import { RootState, AppDispatch } from '../../store/store'
import { fetchRepositoryDetails } from '../../features/repositoryDetailsSlice'
import { fetchRepositories, setPage } from '../../features/repositoriesSlice'
import styles from './RepositoriesTable.module.scss'

const RepositoriesTable: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { data, loading, currentPage, totalCount } = useSelector(
    (state: RootState) => state.repositories
  )

  const handleRowClick = (owner: string, repo: string) => {
    dispatch(fetchRepositoryDetails({ owner, repo }))
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    dispatch(setPage(newPage + 1)) // Redux работает с 1-based нумерацией страниц, MUI использует 0-based
    dispatch(
      fetchRepositories({
        query: 'your-query-here',
        page: newPage + 1,
        perPage: 10,
        sort: 'stars',
        order: 'desc'
      })
    )
  }

  if (loading) {
    return <CircularProgress />
  }

  return (
    <>
      <Table className={styles.table}>
        <TableHead>
          <TableRow>
            <TableCell>Название</TableCell>
            <TableCell>Язык</TableCell>
            <TableCell>Число форков</TableCell>
            <TableCell>Число звезд</TableCell>
            <TableCell>Дата обновления</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((repo) => (
            <TableRow
              className={styles.repository}
              key={repo.id}
              onClick={() => handleRowClick(repo.owner.login, repo.name)}
            >
              <TableCell>{repo.name}</TableCell>
              <TableCell>{repo.language}</TableCell>
              <TableCell>{repo.forks_count}</TableCell>
              <TableCell>{repo.stargazers_count}</TableCell>
              <TableCell>
                {new Date(repo.updated_at).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <TablePagination
        component="div"
        count={totalCount} // Общее количество результатов из API
        rowsPerPage={10}
        page={currentPage - 1} // Преобразуем 1-based нумерацию в 0-based для MUI
        onPageChange={handleChangePage}
      />
    </>
  )
}

export default RepositoriesTable
