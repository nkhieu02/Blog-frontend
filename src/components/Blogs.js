import Blog from "./Blog";
import BlogForm from "./BlogForm";

const Blogs = ({ user, setUser, blogs, title, author, url, handleOnCreate }) => {
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
            <BlogForm
                handleOnSubmit={handleOnCreate}
                title={title}
                author={author}
                url={url}
            />
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
            )}
        </div>
    )
}


export default Blogs