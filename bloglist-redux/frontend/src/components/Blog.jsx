import { useState } from "react"
import {useDispatch, useSelector } from "react-redux"
import { addLikes, deletesBlog } from "../reducers/blogReducer" 
import { setNotification } from "../reducers/notificationReducer"

const Blog = () => {
  const blogs = useSelector(state => {
    const sortedBlogs = [...state.blogs].sort((a,b)=> b.likes - a.likes)
    return sortedBlogs
})
  const [visibleBlogIds, setVisibleBlogIds] = useState([]);

  const toggleVisibility = (id) => {
    setVisibleBlogIds(prevState =>
      prevState.includes(id)
        ? prevState.filter(blogId => blogId !== id)
        : [...prevState, id]
    );
  };

  const dispatch = useDispatch()

  const like = (id) => {
    dispatch(addLikes(id))
    console.log(id)
  }

  const removeBlog = (id, title) => {
    if(window.confirm(`Are you sure you want to delete ${title}`)){
      dispatch(deletesBlog(id))
      dispatch(setNotification(`You deleted${title}`, 4))
      console.log(` ${title} deleted`)

    }

  }
 
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div>
      {blogs.map(blog =>
        <div key={blog.id} style={blogStyle}>
          <div>
            {blog.title} {blog.author}
            <button onClick={() => toggleVisibility(blog.id)}>
              {visibleBlogIds.includes(blog.id) ? 'hide' : 'view'}
            </button>
          </div>
          <div style={{ display: visibleBlogIds.includes(blog.id) ? "" : "none" }} className="whenShown">
            <p>{blog.url}</p>
            <p>{blog.likes} <button onClick={()=> like(blog.id)}>Likes</button></p>
            <p>{blog.user.name}</p>
            { <button onClick={()=>removeBlog(blog.id, blog.title)}>remove</button> }
          </div>
        </div>
      )}
    </div>
  )
}
export default Blog
