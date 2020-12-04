import React, { useState } from 'react'

const BlogForm = ({ createBlog
}) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleTitleChange = (event) => { setTitle(event.target.value) }
    const handleAuthorChange = (event) => { setAuthor(event.target.value) }
    const handleUrlChange = (event) => { setUrl(event.target.value) }

    const addBlog = (event) => {
        event.preventDefault()
        createBlog({
            title: title,
            author: author,
            url: url
        })
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <div>
            <h2> Please add new blog:</h2>
            <form onSubmit={addBlog}>
                <div>
                    Title:
           <input
                        type="text"
                        value={title}
                        name="Title"
                        onChange={handleTitleChange}
                    />
                </div>
                <div>
                    Author:
            <input
                        type="text"
                        value={author}
                        name="Author"
                        onChange={handleAuthorChange}
                    />
                </div>
                <div>
                    Url:
            <input
                        type="text"
                        value={url}
                        name="Url"
                        onChange={handleUrlChange}
                    />
                </div>
                <button type="submit">Create</button>
            </form>
        </div>)
}



export default BlogForm