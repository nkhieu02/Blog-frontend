import loginService from '../services/login'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const LoginForm = ({ username, setUsername, password, setPassword, setMessage, setUser }) => {
    const handleOnLogin = async (event) => {
        event.preventDefault()
        try {
            const userLogging = await loginService.login({ username, password })
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
                [null, 'Login Failed']
            )
            setTimeout(() => {
                setMessage([null, null])
            }, 5000)
        }
    }
    return (
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
}

LoginForm.propTypes = {
    username: PropTypes.string.isRequired,
    setUsername: PropTypes.func.isRequired,
    password: PropTypes.string.isRequired,
    setPassword: PropTypes.func.isRequired,
    setMessage: PropTypes.func.isRequired,
    setUser: PropTypes.func.isRequired
}

export default LoginForm
