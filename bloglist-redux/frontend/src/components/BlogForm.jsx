import { useField } from '../hooks/input'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'

const BlogForm = () => {
    const dispatch  = useDispatch()
    const author = useField('text')
    const title = useField('text')
    const url = useField('text')

    const addBlog = async  (event) => {
        event.preventDefault()
        const Blog = {
            title: title.value,
            author: author.value,
            url: url.value,
            likes: 0
        }
        title.reset()
        author.reset()
        url.reset()
        dispatch(createBlog(Blog))
        dispatch(setNotification(`a new blog titled ${Blog.title} by ${Blog.author} was added`,4))
    }
    return (
        <div>
            <h2>Create new blog</h2>
            <form onSubmit={addBlog}>
                <div>
                    title
                    <input
                        {...title}
                    /> <br />
                    author
                    <input
                        {...author}
                    /> <br />
                    url
                    <input
                        {...url}
                    />
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}




export default BlogForm