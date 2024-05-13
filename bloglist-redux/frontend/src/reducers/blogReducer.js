import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers :{
        addVote(state, action){
            const id = action.payload.id
            const modifiedBlog = action.payload
            return state.map(blog=> blog.id !== id ? blog : modifiedBlog )

        },
        appendBlog(state, action){
            state.push(action.payload)
        },
        setBlogs(state, action){
            return action.payload
        }
    },

})

export const {addVote, appendBlog, setBlogs} = blogSlice.actions

export const initializieAnecdotes = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch(setBlogs(blogs))
    }
}
export const createBlog = content => {
    return async dispatch => {
        const newBlog = await blogService.create(content)
        dispatch(appendBlog(newBlog))

    }
}
export const addVotes = id => {
    return async dispatch => {
        const newBlog = await blogService.update(id)
        dispatch(addVote(newBlog))
    }
}

export default blogSlice.reducer