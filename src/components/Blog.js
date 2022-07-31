import { useState } from 'react'
import blogService from '../services/blogs'
const Blog = ({ blog, setBlogs, blogs }) => {
  const [viewAll, setViewAll] = useState(false)
  const hidden = { display: viewAll ? 'none' : '' }
  const view = { display: viewAll ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const setToogle = () => {
    setViewAll(!viewAll)
  }
  const updateLikes = (update) => {
    blogService.putData(update)
    const copyOfBlogs = [...blogs]
    copyOfBlogs.find(x => x.id === blog.id).likes = blog.likes + 1
    setBlogs(copyOfBlogs)
  }
  const deleteBlog = (id) => {
    blogService.deleteData(id)
    setBlogs(blogs.filter(x => x.id !== id))
  }
  return (
    <div style={blogStyle} className='blog' >
      <div style={hidden} className='viewabel'>
        <p>{blog.title} {blog.author} <button onClick={setToogle} className="View">view</button></p>
      </div>
      <div style={view} className='notViewable'>
        <p>{blog.title} <button onClick={setToogle}>hide</button></p>
        <p>{blog.author}</p>
        <p className='likes'>{blog.likes} </p>
        <button className='UpVote' onClick={() => updateLikes({ id: blog.id, likes: blog.likes + 1 })}>upVote</button>
        <p>{blog.url}</p>
        <button onClick={() => { if (window.confirm(`Remove blog ${blog.title}`)) { deleteBlog(blog.id) } }}>Delete</button>
      </div>
    </div>
  )
}

export default Blog