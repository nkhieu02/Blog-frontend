import { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import Noti from './components/Noti'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const userLoged = window.localStorage.getItem('loggedInInfo')
    if (userLoged !== null) {
      const userLogging = JSON.parse(userLoged)
      blogService.setToken(userLogging.token)
      setUser(userLogging)
    }
  }, [])

  useEffect(() => {
    blogService
      .getAll()
      .then(blogs => {
        setBlogs(blogs)
        setMessage(["Data fetched all successfully", null])
        setTimeout(() => {
          setMessage([null, null])
        }, 5000)
      })
      .catch(error => {
        setMessage(
          [null, "Could not fetch data"]
        )
        setTimeout(() => {
          setMessage([null, null])
        }, 5000)
      })
  }, [user])
  const handleOnLogin = async (event) => {
    event.preventDefault();
    try {
      const userLogging = await loginService.login({ username, password })
      console.log(userLogging)
      window.localStorage.setItem(
        'loggedInInfo', JSON.stringify(userLogging)
      )
      blogService.setToken(userLogging.token)
      setUser(userLogging)
      setUsername('')
      setPassword('')
    }
    catch (error) {
      setUsername('')
      setPassword('')
      setMessage(
        [null, "Login Failed"]
      )
      setTimeout(() => {
        setMessage([null, null])
      }, 5000)
    }
  }
  const handleOnCreate = async (event) => {
    event.preventDefault();
    try {
      const newBlog = {
        title, author, url
      }
      const response = await blogService.postData(newBlog)

      setBlogs(blogs.concat(response))
      setTitle('')
      setAuthor('')
      setUrl('')
      setMessage(
        ["Create succeded", null]
      )
      setTimeout(() => {
        setMessage([null, null])
      }, 5000)
    }
    catch (error) {
      setTitle('')
      setAuthor('')
      setUrl('')
      setMessage(
        [null, "Create Failed"]
      )
      setTimeout(() => {
        setMessage([null, null])
      }, 5000)
    }
  }
  const loginForm = () => (
    <form onSubmit={handleOnLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
  const blogForm = () => {
    return (
      <div>
        <Noti message={message} />
        <Blogs
          user={user}
          setUser={setUser}
          blogs={blogs}
          title={{ value: title, method: setTitle }}
          author={{ value: author, method: setAuthor }}
          url={{ value: url, method: setUrl }}
          handleOnCreate={handleOnCreate}
        />
      </div>
    )
  }
  return (
    <div>
      {user === null ? loginForm() : blogForm()}
    </div>
  )
}

export default App
