import React, { useState } from 'react'
import { useQuery } from '@apollo/client';

import { ALL_BOOKS } from '../queries'
import BooksTable from './BooksTable'

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
  // console.log(books);

  const handleClick = (event) => {
    event.preventDefault()
    setGenre(event.target.value)
  }

  return (
    <div>
      <h2>books</h2>
      <BooksTable books={books} />
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