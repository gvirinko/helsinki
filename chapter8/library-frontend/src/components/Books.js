import React, { useState } from 'react'
import { useQuery } from '@apollo/client';

import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const [genre, setGenre] = useState('all')
  const result = useQuery(ALL_BOOKS)
  let books = []
  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const allBooksList = result.data.allBooks
  const allGenres = allBooksList.map(book => book.genres)
  const distinctGenres = [...new Set(allGenres.flat(1))]

  if (genre === '' || genre === 'all') {
    books = allBooksList
  } else {
    books = allBooksList.filter(book => book.genres.includes(genre))
  }

  const handleClick = (event) => {
    event.preventDefault()
    setGenre(event.target.value)
  }

  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
        <button
          className={genre === 'all' ? "buttonActive" : null}
          onClick={handleClick}
          value='all'>all genres
        </button>
        {distinctGenres.map((item, index) =>
          <button
            className={item === genre? 'buttonActive': null}
            key={index}
            onClick={handleClick}
            value={item}>{item}
          </button>
        )}
      </div>
    </div>
  )
}

export default Books