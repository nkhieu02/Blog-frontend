import { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import Noti from './components/Noti'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
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
        setMessage(['Data fetched all successfully', null])
        setTimeout(() => {
          setMessage([null, null])
        }, 5000)
      })
      .catch(() => {
        setMessage(
          [null, 'Could not fetch data']
        )
        setTimeout(() => {
          setMessage([null, null])
        }, 5000)
      })
  }, [user])

  const loginForm = () => {
    return (
      <div>
        <Noti message={message} />
        <LoginForm
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          setMessage={setMessage}
          setUser={setUser}
        />
      </div>
    )
  }
  const blogForm = () => {
    return (
      <div>
        <Noti message={message} />
        <Blogs
          user={user}
          setUser={setUser}
          blogs={blogs}
          setBlogs={setBlogs}
          setMessage={setMessage}
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
