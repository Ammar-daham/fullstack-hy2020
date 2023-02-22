import { useSelector } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'

const App = () => {
const anecdote = useSelector(state => state) 

  console.log('anecdotes: ',  anecdote)

const notification = useSelector(state => state.notification)          

  return (
    <div>
      <h2>Anecdotes</h2>
        
      { notification.show 
        ?  <Notification />
        : <Filter />
      }
      <AnecdoteList />
      <br />
      <AnecdoteForm />
    </div>
  )
}

export default App