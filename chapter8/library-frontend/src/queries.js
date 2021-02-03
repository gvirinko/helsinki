import { gql } from '@apollo/client';

export const ALL_AUTHORS = gql`
query {
  allAuthors  {
    name
    born
    bookCount
  }
}
`

export const ALL_BOOKS = gql`
query {
	allBooks {
		title
    published
    genres
    author {
      name
    }
  }
}
`

export const CREATE_BOOK = gql`
mutation createBook ($title: String!, $published: String!, $author: String!, $genres: [String!]!) {
  addBook(
    title: $title,
    published: $published,
    author: $author,
    genres: $genres
  ) {
    title
    published
        author {
      name
      id
      born
    }
  }
}`

export const CHANGE_BIRTHYEAR = gql`
mutation changeBirthyear ($name: String!, $setBornTo: String!) {
  editAuthor(
    name: $name,
    setBornTo: $setBornTo
  ) {
  name
  born
  }
}`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`
