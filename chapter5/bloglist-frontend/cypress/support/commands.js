Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3001/api/login', {
    username, password
  }).then(({ body }) => {
    localStorage.setItem('LoggedBloglistAppUser', JSON.stringify(body))
    cy.visit('http://localhost:3000')
  })
})

Cypress.Commands.add('addNewUser', ({ name, username, password }) => {
  const user = {
    name: name,
    username: username,
    password: password
  }
  cy.request('POST', 'http://localhost:3001/api/users/', user)
})

Cypress.Commands.add('addNewBlog', ({ title, author, url }) => {
  const blog = {
    title: title,
    author: author,
    url: url,
  }
  cy.request('POST', 'http://localhost:3001/api/blogs/', blog)

})