import { useState } from "react"
const Blog = ({ blog, deleteBlog, user, addLikes }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const showDelete = blog.user.name === user.name ? true : false
  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlog(blog.id)
    }
  }

  const handleLikes = () => {
    const blogObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1
    }

    addLikes(blog.id, blogObject)
  }
  /*  console.log("Blog User ID:", blog.user.name);
   console.log("Current User ID:", user.name);
   console.log("Show Delete:", showDelete); */



  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible} className='wehenHidden'>
        {blog.title}  {blog.author}
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible} className='whenShown'>
        <p>{blog.title}{blog.author}
          <button onClick={toggleVisibility}>hide</button></p>
        <p>{blog.url}</p>
        <p>{blog.likes} <button onClick={handleLikes}>likes</button></p>
        <p>{blog.user.name}</p>
        {showDelete && <button onClick={handleDelete}>remove</button>}
      </div>
    </div>
  )


}




export default Blog