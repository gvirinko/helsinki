import React, { useState, useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client';

import BooksTable from './BooksTable'
import { ME, ALL_BOOKS } from '../queries'

const Recommend = (props) => {
  // console.log(props.favGenre)
  // const [favGenre, setFavGenre] = useState('')

  // const resultMe = useQuery(ME, { pollInterval: 2000 })

  // useEffect(() => {
  //   setFavGenre(resultMe.data.me.favoriteGenre)
  // }, [resultMe.data.me.favoriteGenre])

  // if (resultMe.loading) {
  //   return <div>loading...</div>
  // }
  // console.log(resultMe.data.me)
  // setFavGenre(resultMe.data.me.favoriteGenre)

  // const books = useQuery(ALL_BOOKS, {genre: favGenre})

  if (!props.show) {
    return null
  }

  // const books = resultBooks.data.allBooks.filter(book => book.genres.includes(favGenre))
  // console.log(books)

  return (
    <div>
      <h2>Recommendations</h2>
      {/* <p>Books in your favourite genre: <span className='fav_genre'>{favGenre}</span> </p> */}
      {/* <BooksTable books={books} /> */}
    </div>
  )
}

export default Recommend