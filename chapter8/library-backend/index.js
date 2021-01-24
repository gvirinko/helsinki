const { ApolloServer, gql, UserInputError } = require('apollo-server')
const { v1: uuid } = require('uuid')
require('dotenv').config()
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')

const password = process.env.PASSWORD
const MONGODB_URI = `mongodb+srv://helsinki:${password}@cluster0.rtgef.mongodb.net/library?retryWrites=true&w=majority`
console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book]!
    allAuthors: [Author!]!
  }
  type Book {
    title: String!
    published: String!
    author: Author!
    genres: [String!]!
    id: ID!
  }
  type Author {
    name: String!
    id: ID!
    born: String
    bookCount: Int!
  }
  type Mutation {
    addBook(
      title: String!
      published: String!
      author: String!
      genres: [String!]!
    ): Book!
    editAuthor(
      name: String!
      setBornTo: String!
    ): Author
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: (root, args) => {
      // if (args.author) {
      //   const booksByAuthor = books.filter(book => book.author === args.author)
      //   if (args.genre) {
      //     const booksOfGenre = booksByAuthor.filter(book => book.genres.includes(args.genre))
      //     return booksOfGenre
      //   }
      //   return booksByAuthor
      // }
      // if (args.genre) {
      //   const booksOfGenre = books.filter(book => book.genres.includes(args.genre))
      //   return booksOfGenre
      // }
      return Book.find({}).populate('author', { name: 1, id: 1, born: 1 })
    },
    allAuthors: async () => {
      const authors = await Author.find({})
      const books = await Book.find({}).populate('author', { name: 1, id: 1, born: 1 })

      authors.map(author => {
        const booksNumber = books.filter(book => book.author.name === author.name).length
        author.bookCount = booksNumber
      })
      return authors
    }
  },
  Book: {
    title: (root) => root.title,
    published: (root) => root.published,
    author: (root) => root.author,
    genres: (root) => root.genres,
    id: (root) => root.id
  },
  Author: {
    name: (root) => root.name,
    id: (root) => root.id,
    born: (root) => root.born,
    bookCount: (root) => root.bookCount
  },
  Mutation: {
    addBook: async (root, args) => {
      const author = await Author.findOne({ name: args.author })
      if (author === null) {
        const authorObject = {
          name: args.author,
          id: uuid(),
          born: null,
          bookCount: 1
        }
        const newAuthor = new Author(authorObject)
        newAuthor.save()
        try {
          await newAuthor.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }

        const bookObject = { ...args, id: uuid(), author: newAuthor }
        const book = new Book(bookObject)
        try {
          await book.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
        return book
      }
      const bookObject = { ...args, id: uuid(), author: author}
      const book = new Book(bookObject)
      return book.save()
    },

    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name })
      author.born = args.setBornTo
      return author.save()
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})