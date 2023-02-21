
const filterReducer = (state = 'ALL', action) => {
    switch (action.type) {
        case 'SET_FILTER':
            return action.payload
        default:
            return state
    }

}



export const filter = (filteredAnecdote) => {
    return {
      type: 'SET_FILTER',
      payload: filteredAnecdote
    }
  }


  export default filterReducer