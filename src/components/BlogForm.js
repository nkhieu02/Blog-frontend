import { useState } from 'react'
const BlogForm = ({ handleOnSubmit }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleOnCreate = async (event) => {
        event.preventDefault()
        const newObject = {
            title, author, url
        }
        handleOnSubmit(newObject)
        setTitle('')
        setAuthor('')
        setUrl('')
    }
    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={handleOnCreate} >
                <div>
                    title:
                    <input id='titleInput' type='text' name='title' value={title} onChange={({ target }) => setTitle(target.value)} />
                </div>
                <div>
                    author:
                    <input id='authorInput' type='text' name='author' value={author} onChange={({ target }) => setAuthor(target.value)} />
                </div>
                <div>
                    url:
                    <input id='urlInput' type='text' name='url' value={url} onChange={({ target }) => setUrl(target.value)} />
                </div>
                <button id='blogSubmit' type='submit'>Create</button>
            </form>
        </div>
    )
}

export default BlogForm