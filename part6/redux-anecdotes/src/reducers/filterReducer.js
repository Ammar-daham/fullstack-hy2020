import { createSlice } from "@reduxjs/toolkit"

const initialState = 'All'

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        filter(state, action) {
            console.log('oldState', JSON.parse(JSON.stringify(state)))
            state = action.payload 
            console.log('newState', JSON.parse(JSON.stringify(state)))
            return state
        } 
    }

})

export const { filter } = filterSlice.actions
export default filterSlice.reducer