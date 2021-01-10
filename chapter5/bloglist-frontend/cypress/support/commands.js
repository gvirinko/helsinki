Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3001/api/login', {
    username, password
  }).then(({ body }) => {
    localStorage.setItem('LoggedBloglistAppUser', JSON.stringify(body))
    console.log(body)
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

// Cypress.Commands.add('addNewBlog', () => {
//   const blog = {
//     title: 'Pasta',
//     author: 'Jamie',
//     url: 'moo.com',
//     user: '5fd528638e039464edda44a3'
//   }
// const config = {
//   headers: {
//     Authorization: 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1pa2UiLCJpZCI6IjVmYzk0Mjg2OGQ1ODgyMjZlMjkxMWIzOCIsImlhdCI6MTYwNzAyNTUzMX0.aZaRTAu7E-ZviZD5BC98A5gPMNMOw9mHhISGoMDajcE'
//   }
// }

// cy.request('POST', 'http://localhost:3001/api/blogs/', blog, config)


// })