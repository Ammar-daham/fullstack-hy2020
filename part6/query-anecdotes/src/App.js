import { useMutation, useQueryClient, useQuery } from "react-query"

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes } from './request'
import { updateAnecdote } from './request'

const App = () => {

  const queryClient = useQueryClient()

  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    }
  })

  const handleVote = (anecdote) => {
    console.log('anecdote: ', anecdote)
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
  }

  // const anecdotes = [
  //   {
  //     "content": "If it hurts, do it more often",
  //     "id": "47145",
  //     "votes": 0
  //   },
  // ]

  const result = useQuery('anecdotes', getAnecdotes, 
  {
    retry: 1
  }
  )
  console.log('result: ', result)


  if ( result.isError ) {
    return <div>anecdote service not available due to problems in the server</div>
  } else if ( result.isLoading ) {
    return <div>is loading...</div>
  }


  return (
    <div>
     
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {result.data.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
