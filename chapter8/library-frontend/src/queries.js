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
  allBooks  {
    title
    author
    published
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
    author
    genres
    id
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