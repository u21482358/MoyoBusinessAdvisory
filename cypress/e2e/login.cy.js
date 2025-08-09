describe('Enter Login details', () => {
  it('Visits the Angular app', () => {
    cy.visit('localhost:4200');
    cy.get('[data-testid=username]').type('u21482358@tuks.co.za');
    cy.get('[data-testid=password]').type('123456');
    cy.get('[data-testid=login]').click();
    });
  });
