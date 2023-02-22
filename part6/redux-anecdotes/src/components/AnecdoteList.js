import { useDispatch, useSelector } from 'react-redux'
import { voteForAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector((state) =>
    state.filter === 'All'
    ? state.anecdotes.slice().sort((a, b) => b.votes - a.votes)
    : state.anecdotes.filter(anecdote => 
    anecdote.content.toLowerCase().includes(state.filter.toLowerCase())).sort((a, b) => b.votes - a.votes)
    )
    //,
  const vote = (id, content) => {
    console.log('vote', id)
    dispatch(voteForAnecdote(id))
    dispatch(setNotification(`you voted '${content}'`))
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
            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList
