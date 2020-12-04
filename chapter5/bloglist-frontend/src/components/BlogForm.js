import React from 'react'

const BlogForm = ({
    title,
    author,
    url,
    handleSubmit,
    handleTitleChange,
    handleAuthorChange,
    handleUrlChange
}) => (
        <form onSubmit={handleSubmit}>
            <h2> Please add new blog:</h2>
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
    )

export default BlogForm