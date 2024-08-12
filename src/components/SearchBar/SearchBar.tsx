import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchRepositories, setPage } from '../../features/repositoriesSlice'
import { TextField, Button } from '@mui/material'
import styles from './SearchBar.module.scss'
import { AppDispatch } from '../../store/store'

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('') // Стейт для хранения запроса
  const dispatch = useDispatch<AppDispatch>()

  const handleSearch = () => {
    // Проверка на пустой запрос
    if (query.trim() === '') return

    // Сброс текущей страницы на первую
    dispatch(setPage(1))

    // Отправка запроса на получение репозиториев
    dispatch(
      fetchRepositories({
        query,
        page: 1, // Первая страница
        perPage: 10, // Количество репозиториев на странице
        sort: 'stars', // Сортировка по звездам
        order: 'desc' // По убыванию
      })
    )
  }

  return (
    <div className={styles.searchBar}>
      <TextField
        label="Введите поисковой запрос"
        variant="filled"
        value={query}
        size="small"
        sx={{
          width: '912px',
          '.MuiFormLabel-root': {
            fontStyle: 'italic'
          }
        }}
        onChange={(e) => setQuery(e.target.value)}
        className={styles.input}
      />
      <Button variant="contained" color="primary" onClick={handleSearch}>
        Искать
      </Button>
    </div>
  )
}

export default SearchBar
