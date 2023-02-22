import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    message: '',
    show: false
}
const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        setNotification(state, action) {
            return { message: action.payload, show: true}
        },
        removeNotification(state) {
            return { message: '', show: false }
        }
    }
})

export const { setNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer