/// <reference types="cypress" />

describe('Buses Page', () => {
  beforeEach(() => {
    // Interceptar las llamadas a la API
    cy.intercept('GET', '/api/v1/buses', { fixture: 'buses.json' }).as('getBuses');
    cy.intercept('GET', '/api/v1/pupitres', { fixture: 'pupitres.json' }).as('getPupitres');
    cy.intercept('GET', '/api/v1/validators', { fixture: 'validators.json' }).as('getValidators');
    cy.intercept('GET', '/api/v1/cameras', { fixture: 'cameras.json' }).as('getCameras');
  });

  it('should display buses list and navigate to bus detail', () => {
    cy.visit('/buses');
  });


}); 