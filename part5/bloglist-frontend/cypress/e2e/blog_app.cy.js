
describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
    const user = {
      name: 'Ammar Daham',
      username: 'amoor',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
  })

  it('login form is shown', function() {
    cy.contains('log in to application')
  })

  describe('Login', function () {
    
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('amoor')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
  
      cy.contains('Ammar Daham logged in')
  
    })

    it('fails with wrong credentials', function() {

      cy.get('#username').type('amoor')
      cy.get('#password').type('sala')
      cy.get('#login-button').click()

      cy.contains('wrong username or password').should('have.css', 'color', 'rgb(255, 0, 0)')
    })


  })

})

