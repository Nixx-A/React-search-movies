// import failedResponseMovies from './mock/movieFailed'
import './App.css'
import { useMovies } from './hooks/useMovies.js'
import { Movies } from './Components/Movies'
import { useState, useCallback } from 'react'
import { useSearch } from './hooks/useSearch'
import debounce from 'just-debounce-it'

  function App () {
    const [sort, setSort] = useState(false)
    const { search, updateSearch, error } = useSearch()
    const { movies, loading, getMovies } = useMovies({ search, sort })


  const debouncedGetMovies = useCallback(
    debounce(search => {
      console.log('search', search)
      getMovies({ search })
    }, 300)
    , [getMovies]
  )

  
  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies({ search })
  }
    /*    const data = new window.FormData(e.target)
    const query = data.get('query')
    console.log(query) */

    const handleSort = () => {
      setSort(!sort)
    }

    const handleChange = (event) => {
      const newSearch = event.target.value
      updateSearch(newSearch)
      debouncedGetMovies(newSearch)
    }
  return (
    <div className='page'>

      <header>
        <h1 className='title'>Movies Searcher</h1>
        <form onSubmit={handleSubmit} className='form'>
          <input onChange={handleChange} value={search} name='query' placeholder='Avengers, Matrix...' />
          <input type='checkbox' onChange={handleSort} checked={sort} />
          <button>Submit</button>
        </form>
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      </header>

      <main className='grid-container'>
        {
          loading ? <p>Loading...</p> : <Movies movies={movies} />
        }
      </main>
    </div>
  )
}

export default App
