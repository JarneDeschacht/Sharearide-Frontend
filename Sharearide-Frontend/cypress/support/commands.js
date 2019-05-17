Cypress.Commands.add('login', () => {
  const email = 'imevandaele@gmail.com';
  const password = 'P@ssword1111';

  cy.visit('/account');
  cy.get('[data-cy=login-email]').type(email);
  cy.get('[data-cy=login-password]').type(password);
  cy.get('[data-cy=login-button]').click();

  cy.request({
    method: 'POST',
    url: '/api/account',
    body: {
      email,
      password
    }
  }).then(res => localStorage.setItem('currentUser', JSON.stringify(res.body)));
});
