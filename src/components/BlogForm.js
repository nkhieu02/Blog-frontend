const BlogForm = ({ handleOnSubmit, title, author, url }) => {
    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={handleOnSubmit} >
                <div>
                    title:
                    <input type='text' name='Title' value={title.value} onChange={({ target }) => title.method(target.value)} />
                </div>
                <div>
                    author:
                    <input type='text' name='Author' value={author.value} onChange={({ target }) => author.method(target.value)} />
                </div>
                <div>
                    url:
                    <input type='text' name='Url' value={url.value} onChange={({ target }) => url.method(target.value)} />
                </div>
                <button type='submit'>Create</button>
            </form>
        </div>
    )
}

export default BlogForm