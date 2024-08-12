// src/components/RepositoryDetails/RepositoryDetails.tsx
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { CircularProgress, Card, CardContent, Typography } from '@mui/material'
import styles from './RepositoryDetails.module.scss'

const RepositoryDetails: React.FC = () => {
  const { data, loading } = useSelector(
    (state: RootState) => state.repositoryDetails
  )

  if (loading) {
    return <CircularProgress />
  }

  if (!data) {
    return <div>Выберите репозиторий</div>
  }

  return (
    <Card className={styles.detailsCard}>
      <CardContent>
        <Typography variant="h5">{data.name}</Typography>
        <Typography variant="body1">{data.description}</Typography>
        <Typography variant="body2">
          License: {data.license?.name || 'No license'}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default RepositoryDetails
