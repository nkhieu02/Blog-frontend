import Blog from './Blog'
import BlogForm from './BlogForm'
import blogService from '../services/blogs'
import Toggle from './ToggleViewable'

const Blogs = ({ user, setUser, blogs, setBlogs, setMessage }) => {

    const compareFunction = (blogA, blogB) => (
        blogB.likes - blogA.likes
    )
    const handleOnCreate = async (newBlog) => {
        try {
            const response = await blogService.postData(newBlog)
            setBlogs(blogs.concat(response))
            setMessage(
                ['Create succeded', null]
            )
            setTimeout(() => {
                setMessage([null, null])
            }, 5000)
        }
        catch (error) {
            setMessage(
                [null, 'Create Failed']
            )
            setTimeout(() => {
                setMessage([null, null])
            }, 5000)
        }
    }

    return (
        <div>
            <h2>Blogs</h2>
            <div>
                {`${user.name} logged in `}
                <button onClick={() => {
                    window.localStorage.removeItem('loggedInInfo')
                    setUser(null)
                }}>logout
                </button>
            </div>
            <Toggle buttonLabel={'Create new blog'}>
                <BlogForm
                    handleOnSubmit={handleOnCreate}
                />
            </Toggle>

            {blogs.sort(compareFunction).map(blog =>
                <Blog key={blog.id} blog={blog} setBlogs={setBlogs} blogs={blogs} />
            )}
        </div>
    )
}


export default Blogs