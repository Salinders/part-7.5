import {createSlice} from '@reduxjs/toolkit'

const notificaitonSlice = createSlice({
    name:'notification',
    initialState:'',
    reducers: {
        showNotification(state, action){
            return action.payload
        },
        hideNotification(state, action){
            return ''
        }
    }
})

export const {showNotification,hideNotification} = notificaitonSlice.actions

export const setNotification = (text, timeout)=> {
    return dispatch => {
        dispatch(showNotification(text))
        setTimeout(()=> {
            dispatch(hideNotification())
        },  timeout *1000 )
    }
}

export default notificaitonSlice.reducer