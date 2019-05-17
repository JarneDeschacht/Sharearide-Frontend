describe('test filter of rides', function () {
  beforeEach(() => {
    cy.login();
  });

  it('test filter of rides', () => {
    cy.server();
    cy.route({
      method: 'GET',
      url: '/api/ride/user/2',
      status: 200,
      response: 'fixture:rides.json'
    });
    cy.visit('/searchRide');

    cy.get('[data-cy=ride]').should('have.length', 8);

    cy.get('[data-cy=filterDestination]').type('ant');
    cy.wait(500);
    cy.get('[data-cy=ride]').should('have.length', 5);
    cy.get('[data-cy=clearfilter]').click();

    cy.get('[data-cy=filterDestination]').type('testtest');
    cy.wait(500);
    cy.get('[data-cy=ride]').should('have.length', 0);
    cy.get('[data-cy=clearfilter]').click();

    cy.get('[data-cy=filterDate]').type("2019-5-18");
    cy.wait(500);
    cy.get('[data-cy=ride]').should('have.length', 1);
    cy.get('[data-cy=clearfilter]').click();
  });
});
