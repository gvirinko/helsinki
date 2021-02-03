import React, { useState } from 'react'
import { useQuery } from '@apollo/client';

import BooksTable from './BooksTable'
import { ME, ALL_BOOKS } from '../queries'

const Recommend = (props) => {

  const resultMe = useQuery(ME)
  const resultBooks = useQuery(ALL_BOOKS)

  if (!props.show) {
    return null
  }
  if (resultMe.loading || resultBooks.loading) {
    return <div>loading...</div>
  }
  const favGenre = resultMe.data.me.favoriteGenre
  const books = resultBooks.data.allBooks.filter(book => book.genres.includes(favGenre))
  console.log(books)

  return (
    <div>
      <h2>Recommendations</h2>
      <p>Books in your favourite genre: <span className='fav_genre'>{favGenre}</span> </p>
      <BooksTable books={books} />
    </div>
  )
}

export default Recommend