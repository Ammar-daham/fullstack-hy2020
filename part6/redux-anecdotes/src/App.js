import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'
import { initializeAnecdotes } from './reducers/anecdoteReducer'


const App = () => {
const anecdote = useSelector(state => state) 

  console.log('anecdotes: ',  anecdote)

const notification = useSelector(state => state.notification.show)  
const dispatch = useDispatch()   

useEffect(() => {
  dispatch(initializeAnecdotes())
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