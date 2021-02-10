import React, { useState, useEffect } from 'react'
import { useLazyQuery, useSubscription } from '@apollo/client';

import { ALL_BOOKS, BOOK_ADDED } from '../queries'
import BooksTable from './BooksTable'

const Books = (props) => {
  const [genre, setGenre] = useState('all')
  const [getBooks, { loading, data }] = useLazyQuery(ALL_BOOKS)

  useEffect(() => {
    getBooks()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log(`A book with title '${subscriptionData.data.bookAdded.title}' has just been added.`)
    }
  })

  if (!props.show) {
    return null
  }

  if (loading) {
    return <div>loading...</div>
  }

  let books = data.allBooks
  const allGenres = books.map(book => book.genres)
  const distinctGenres = [...new Set(allGenres.flat(1))]

  if (genre !== '' && genre !== 'all') {
    books = books.filter(book => book.genres.includes(genre))
  }

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