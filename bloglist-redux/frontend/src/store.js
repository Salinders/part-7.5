import { configureStore } from '@reduxjs/toolkit'
import reducer from './reducers/blogReducer'

import notificationReducer from './reducers/notificationReducer'

const store = configureStore({
    reducer: {
     blogs: reducer,
     notifications : notificationReducer
    }

})
store.subscribe(() => { console.log(store.getState()) })


export default store