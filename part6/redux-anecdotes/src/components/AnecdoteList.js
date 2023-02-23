import { useDispatch, useSelector } from 'react-redux'
import { setNotification, removeNotification } from '../reducers/notificationReducer'
import { updateAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector((state) =>
    state.filter === 'All'
    ? state.anecdotes.slice().sort((a, b) => b.votes - a.votes)
    : state.anecdotes.filter(anecdote => 
    anecdote.content.toLowerCase().includes(state.filter.toLowerCase())).sort((a, b) => b.votes - a.votes)
    )
    //,
  const vote = (anecdote) => {
    console.log('vote', anecdote.id)
    dispatch(updateAnecdote(anecdote))
    dispatch(setNotification(`you voted '${anecdote.content}'`))
    setTimeout(() => {
        dispatch(removeNotification())
      }, 5000)
  }

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList
