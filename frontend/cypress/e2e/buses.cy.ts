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
    
    // Esperar a que se carguen los datos
    cy.wait(['@getBuses', '@getPupitres', '@getValidators', '@getCameras']);

    // Verificar que se muestra la lista de buses
    cy.get('[data-testid="buses-list"]').should('be.visible');
    
    // Verificar que se muestra al menos un bus
    cy.get('[data-testid="bus-card"]').should('have.length.at.least', 1);

    // Hacer clic en el primer bus
    cy.get('[data-testid="bus-card"]').first().click();

    // Verificar que se navega a la página de detalle
    cy.url().should('include', '/buses/');
    
    // Verificar que se muestra la información del bus
    cy.get('[data-testid="bus-detail"]').should('be.visible');
    
    // Verificar que se muestran los dispositivos asociados
    cy.get('[data-testid="bus-devices"]').should('be.visible');
  });

  it('should filter buses by status', () => {
    cy.visit('/buses');
    
    // Esperar a que se carguen los datos
    cy.wait(['@getBuses', '@getPupitres', '@getValidators', '@getCameras']);

    // Filtrar por estado OK
    cy.get('[data-testid="status-filter"]').click();
    cy.get('[data-testid="status-option-OK"]').click();

    // Verificar que solo se muestran buses con estado OK
    cy.get('[data-testid="bus-card"]').each(($card) => {
      cy.wrap($card).find('[data-testid="status-chip"]').should('have.text', 'OK');
    });
  });

  it('should show bus devices correctly', () => {
    // Interceptar la llamada a la API del bus específico
    cy.intercept('GET', '/api/v1/buses/*', { fixture: 'bus-detail.json' }).as('getBusDetail');

    cy.visit('/buses/1');
    
    // Esperar a que se carguen los datos
    cy.wait(['@getBusDetail', '@getPupitres', '@getValidators', '@getCameras']);

    // Verificar que se muestran los dispositivos asociados
    cy.get('[data-testid="bus-devices"]').should('be.visible');
    
    // Verificar que se muestran los pupitres
    cy.get('[data-testid="pupitres-section"]').should('be.visible');
    
    // Verificar que se muestran las validadoras
    cy.get('[data-testid="validators-section"]').should('be.visible');
    
    // Verificar que se muestran las cámaras
    cy.get('[data-testid="cameras-section"]').should('be.visible');
  });
}); 