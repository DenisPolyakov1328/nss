import './App.css'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import RepositoriesTable from './components/RepositoriesTable/RepositoriesTable'
import RepositoryDetails from './components/RepositoryDetails/RepositoryDetails'

function App() {
  return (
    <div className="App">
      <Header />
      <RepositoriesTable />
      <RepositoryDetails />
      <Footer />
    </div>
  )
}

export default App
