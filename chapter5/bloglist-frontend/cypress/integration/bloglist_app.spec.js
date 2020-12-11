describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Please log in to application')
    cy.contains('login')
  })

  describe('Login', function () {
    beforeEach(function () {
      cy.addNewUser({ name: 'Mike Tyson', username: 'mike', password: 'mike' })
    })

    it('succeeds with correct credentials', function () {
      cy.get('#username').type('mike')
      cy.get('#password').type('mike')
      cy.get('.login-button').click()

      cy.contains('Logged in successfully')
      cy.contains('Mike Tyson logged in')
      cy.contains('Logout')
      cy.contains('Blogs:')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('mike')
      cy.get('#password').type('wrong')
      cy.get('.login-button').click()

      cy.contains('Wrong username or password')
      cy.contains('Please log in to application')
      cy.get('#username').should('exist')
      cy.get('#password').should('exist')
      cy.get('.login-button').should('exist')
      cy.get('.error-message').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe.only('When logged in', function () {
    beforeEach(function () {
      cy.addNewUser({ name: 'Mike Tyson', username: 'mike', password: 'mike' })
      cy.login({ name: 'Mike Tyson', username: 'mike', password: 'mike' })
      cy.contains('logged in')
    })

    it('A blog can be created', function () {
      cy.contains('New Blog').click()
      cy.contains('Please add a new blog')
      cy.get('#title').type('Spaghetti')
      cy.get('#author').type('Jamie Oliver')
      cy.get('#url').type('oliver.com')
      cy.get('.create-blog').click()
      cy.contains('A new blog has been added')
      cy.contains('Spaghetti - Jamie Oliver')
    })

    it.only('User can like a blog', function () {
      cy.contains('New Blog').click()
      cy.get('#title').type('Spaghetti')
      cy.get('#author').type('Jamie Oliver')
      cy.get('#url').type('oliver.com')
      cy.get('.create-blog').click()
      cy.contains('Spaghetti')
        .parent()
        .find('.view-hide-button')
        .click()
      cy.contains('Spaghetti')
        .get('.likesNumber')
        .contains('0')
        .parent()
        .find('.like-button')
        .click()
        .parent()
        .get('.likesNumber')
        .contains('1')
    })
  })

})