import React, {useState} from 'react'
import { useQuery, useMutation } from '@apollo/client';
import Select from 'react-select'

import { ALL_AUTHORS, CHANGE_BIRTHYEAR } from '../queries'

const Authors = (props) => {
  const [born, setBorn] = useState('')
  const [selectedOption, setSelectedOption] = useState(null);


  const result = useQuery(ALL_AUTHORS, {
    pollInterval: 2000
  })

  const [editAuthor] = useMutation(CHANGE_BIRTHYEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  if (!props.show) {
    return null
  }
  if (result.loading) {
    return <div>loading...</div>
  }
  const authors = result.data.allAuthors

  const submit = (event) => {
    event.preventDefault()
    editAuthor({ variables: { name: selectedOption.value, setBornTo: born } })
    setBorn('')
  }

  let options = []
  for (let i = 0; i < authors.length; i++) {
    let option = { value: authors[i].name, label: authors[i].name }
    options = options.concat(option)
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
        <h3>Set birthyear</h3>
      <Select
        defaultValue={selectedOption}
        onChange={setSelectedOption}
          options={options}
          placeholder="Select an author..."
      />
      <input
        value={born}
        onChange={({ target }) => setBorn(target.value)}
      />
      <button type='submit' onClick={submit}>update author</button>
      </div>
    </div>
  )
}

export default Authors
