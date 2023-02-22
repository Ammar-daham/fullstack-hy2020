import { createSlice } from "@reduxjs/toolkit";

const initialState = ''
const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        displayNotification(state, action) {
            return state = action.payload
        }
    }
})

export const { displayNotification } = notificationSlice.actions
export default notificationSlice.reducer