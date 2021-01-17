import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
import { addNewComment } from '../reducers/commentReducer'
import commentService from '../services/comments'

const Comments = ({ blogId }) => {
  const [comment, setComment] = useState('')
  const comments = useSelector(state => state.comments)
  const commentsToThisBlog = comments.filter(comment => comment.blogId === blogId)
  const dispatch = useDispatch()

  const addComment = async (event) => {
    event.preventDefault()
    const commentObject = {
      text: comment,
      blogId: blogId
    }
    await commentService.create(commentObject)

    dispatch(addNewComment(commentObject))
    setComment('')
  }

  return (
    <div style={{ 'margin-top': '30px' }}>
      <h4>Comments:</h4>
      <Form onSubmit={addComment}>
        <Form.Control
          id='comment'
          type="text"
          value={comment}
          name="Comment"
          onChange={(event) => setComment(event.target.value)} />
        <Button type="submit">Add Comment</Button>
      </Form>
      <ul>
        {commentsToThisBlog.map((blog, index) =>
          <li key={index}>{blog.text}</li>
        )}
      </ul>
    </div>
  )
}

export default Comments