describe('Login test', () => {
  beforeEach(() => {});

  it('loginfail', () => {

  });

  it('logintest', () => {
    cy.login();
  });

  it('login page and username in title and nav', () => {
    //login
    cy.login();
    // username should be in the title balk
    cy.get('[data-cy=usernameNav]').contains("Ime");
    // username should be in the header in the homepage
    cy.get('[data-cy=usernameTitle]').contains("Ime");
  });
});
