describe('Enter Login details', () => {
  it('Visits the Angular app', () => {
    cy.visit('localhost:4200');
    cy.get('[data-testid=username]').type("hello");
    cy.get('[data-testid=password]').type("hello");
    cy.get('[data-testid=login]').click();
    });
  });
