import React, {
  useState, useEffect
} from 'react'
import { useQuery, useLazyQuery } from '@apollo/client';

import BooksTable from './BooksTable'
import { ME, ALL_BOOKS } from '../queries'

const Recommend = (props) => {
  const [favGenre, setFavGenre] = useState('')
  const resultMe = useQuery(ME, { pollInterval: 2000 })

  const [resultBooks, {loading, data}] = useLazyQuery(ALL_BOOKS, { genre: favGenre })


  useEffect(() => {
    resultBooks()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  if (!props.show) {
    return null
  }

  if (resultMe.loading || loading) {
    return <div>loading...</div>
  }
  if (favGenre === '') {
    setFavGenre(resultMe.data.me.favoriteGenre)
  }

  return (
    <div>
      <h2>Recommendations</h2>
      <p>Books in your favourite genre: <span className='fav_genre'>{favGenre}</span> </p>
      <BooksTable books={data.allBooks.filter(book => book.genres.includes(favGenre))} />
    </div>
  )
}

export default Recommend