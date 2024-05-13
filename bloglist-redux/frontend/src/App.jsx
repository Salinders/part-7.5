import { useDispatch} from 'react-redux'
import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import LoginService from './services/login'
import { setNotification } from './reducers/notificationReducer'
const App = () => {
  const dispatch = useDispatch()

  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  //const [message, setMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [refreshBlog, setRefreshBlog] = useState(false)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs.sort((a, b) => b.likes - a.likes))
    )
  }, [refreshBlog])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await LoginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

    } catch (expection) {
      dispatch(setNotification('Wrong credentials',4))
    }

  }

  const addBlog = (blogObject) => {
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        dispatch(setNotification(`a new blog titled ${returnedBlog.title} by ${returnedBlog.author} was added`,4))

      })
  }

  const deleteBlog = async id => {
    await blogService.remove(id)
    setRefreshBlog(!refreshBlog)
    dispatch(setNotification('Blog deleted',4))
  }

  const addLikes = async (id, blogObject) => {
    await blogService.update(id, blogObject)
    setRefreshBlog(!refreshBlog)

  }


  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }


  if (user === null) {
    return (
      <div>
        <Notification/>
        <LoginForm
          username={username}
          password={password}
          handleUserNameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </div>
    )
  }

  return (
    <div>
      <Notification />
      <p>{user.name} logged in</p>
      <button onClick={handleLogout}>logOut</button>
      <br></br>
      <br></br>
      <Togglable buttonLabel='create blog' ref={blogFormRef}>
        <BlogForm
          createBlog={addBlog}
        />
      </Togglable>
      <br></br>
      <h2>Blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} addLikes={addLikes} deleteBlog={deleteBlog} user={user} />
      )}

    </div>

  )

}



export default App