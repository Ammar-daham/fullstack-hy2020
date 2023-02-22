import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'
import { setAnecdotes } from './reducers/anecdoteReducer'
import anecdoteService from './service/anecdotes'

const App = () => {
const anecdote = useSelector(state => state) 

  console.log('anecdotes: ',  anecdote)

const notification = useSelector(state => state.notification.show)  
const dispatch = useDispatch()   

useEffect(() => {
  anecdoteService.getAll().then(anecdotes => dispatch(setAnecdotes(anecdotes)))
}, [dispatch])

  return (
    <div>
      <h2>Anecdotes</h2>
        
      { notification 
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