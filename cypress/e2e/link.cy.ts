describe('Url Shortener', () => {
  it('Successfully shorten a URL', () => {
    cy.visit('http://localhost:8080');
    cy.get(`input[name="url"]`).type('https://www.example.com');
    cy.get('button').click();
    cy.get('a').should('have.text').contains('http://localhost:3000');
  })
})