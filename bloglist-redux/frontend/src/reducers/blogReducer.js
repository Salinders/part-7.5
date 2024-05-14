import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers :{
        addLike(state, action){
            const id = action.payload.id
            const modifiedBlog = action.payload
            return state.map(blog=> blog.id !== id ? blog : modifiedBlog )

        },
        appendBlog(state, action){
            state.push(action.payload)
        },
        setBlogs(state, action){
            return action.payload
        },
        deleteBlog(state, action){
            const id = action.payload.id
            return state.filter(blog=> blog.id !== id)
        }
    },

})

export const {addLike, appendBlog, setBlogs, deleteBlog} = blogSlice.actions

export const initializeBlogs = () => {
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
export const addLikes = id => {
    return async dispatch => {
        const newBlog = await blogService.updateLikes(id)
        dispatch(addLike(newBlog))
    }
}
export const deletesBlog = id => {
    return async dispatch => {
        const blogToBeDeleted = await blogService.remove(id)
        dispatch(deleteBlog(blogToBeDeleted))
    }
}

export default blogSlice.reducer