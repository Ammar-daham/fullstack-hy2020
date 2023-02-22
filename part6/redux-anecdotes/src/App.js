import { useSelector } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'

const App = () => {
const anecdote = useSelector(state => state) 

  console.log('anecdotes: ',  anecdote)

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <AnecdoteList />
      <br />
      <AnecdoteForm />
    </div>
  )
}

export default App