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
import { initializeBlogs } from './reducers/blogReducer'
const App = () => {
  const dispatch = useDispatch()

  //const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  //const [message, setMessage] = useState(null)
  const [user, setUser] = useState(null)
 // const [refreshBlog, setRefreshBlog] = useState(false)

  const blogFormRef = useRef()

  useEffect(()=> {
    dispatch(initializeBlogs())
  }, [])
 

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

  /* const deleteBlog = async id => {
    await blogService.remove(id)
    dispatch(setNotification('Blog deleted',4))
  }
 */
 


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
      <p>{user.name} logged in</ p>
      <button onClick={handleLogout}>logOut</button>
      <br></br>
      <br></br>
      <Togglable buttonLabel='create blog' ref={blogFormRef}>
        <BlogForm
        />
      </Togglable>
      <br></br>
      <h2>Blogs</h2>
      <Blog />

    </div>

  )

}



export default App