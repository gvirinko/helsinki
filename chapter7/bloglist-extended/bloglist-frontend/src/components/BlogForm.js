import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Form, Col } from 'react-bootstrap'

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
      url: url,
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div className='formDiv'>
      <h4> Please add a new blog:</h4>
      <Form onSubmit={addBlog}>
        <Col lg={4}>
          <Form.Group>
            <Form.Label>Title:</Form.Label>
            <Form.Control
              id='title'
              type="text"
              value={title}
              name="Title"
              onChange={handleTitleChange}/>
          </Form.Group>
          <Form.Group>
            <Form.Label>Author:</Form.Label>
            <Form.Control
              id='author'
              type="text"
              value={author}
              name="Author"
              onChange={handleAuthorChange}/>
          </Form.Group>
          <Form.Group>
            <Form.Label>URL:</Form.Label>
            <Form.Control
              id='url'
              type="text"
              value={url}
              name="Url"
              onChange={handleUrlChange}/>
          </Form.Group>
        </Col>
        <Button variant='success' className='create-blog' type="submit">Create</Button>
      </Form>
    </div>)
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm