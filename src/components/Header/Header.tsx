import React from 'react'
import SearchBar from '../SearchBar/SearchBar'
import styles from './Header.module.scss'

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <SearchBar />
    </header>
  )
}

export default Header
