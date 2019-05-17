describe('test joining rides', function () {
  beforeEach(() => {
    cy.login();
  });

  it('test joining a ride adds one in profile', () => {
    cy.server();
    cy.route({
      method: 'GET',
      url: '/api/ride/user/2',
      status: 200,
      response: 'fixture:rides.json'
    });
    cy.route({
      method: 'GET',
      url: '/api/user/2/participatedrides',
      status: 200,
      response: 'fixture:joinRides.json'
    });
    cy.route({
      method: 'POST',
      url: '/api/ride/11/adduser/2',
      status: 200,
      response: 'fixture:copenhagen.json',
    });
    cy.visit('/searchRide');

    cy.get('[data-cy=joinRide]').first().click();

    cy.visit('/profile/participatedRides');

    cy.get('[data-cy=smallRide]').should('have.length', 3);
  });

});
