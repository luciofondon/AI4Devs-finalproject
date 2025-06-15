/// <reference types="cypress" />

const pupitresFixture = [
  {
    id: "PUP001",
    status: "OK",
    busId: "5678",
    printerStatus: "OK",
    modemStatus: "OK",
    qrStatus: "OK",
    rfidStatus: "OK",
    emvStatus: "OK",
    gpsStatus: "OK",
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z"
  },
  {
    id: "PUP002",
    status: "WARNING",
    busId: "9012",
    printerStatus: "WARNING",
    modemStatus: "OK",
    qrStatus: "OK",
    rfidStatus: "WARNING",
    emvStatus: "OK",
    gpsStatus: "OK",
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z"
  },
  {
    id: "PUP003",
    status: "KO",
    busId: "1234",
    printerStatus: "KO",
    modemStatus: "KO",
    qrStatus: "KO",
    rfidStatus: "KO",
    emvStatus: "KO",
    gpsStatus: "KO",
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z"
  }
];

describe('Pupitres Page', () => {
  beforeEach(() => {
    // Interceptar cualquier variante de la URL de pupitres (con o sin query params)
    cy.intercept('GET', /\/api\/v1\/pupitres(\?.*)?$/, (req) => {
      const url = new URL(req.url, window.location.origin);
      const status = url.searchParams.get('status');
      if (!status) {
        req.reply(pupitresFixture);
      } else {
        const filtered = pupitresFixture.filter(p => p.status === status);
        req.reply(filtered);
      }
    }).as('getPupitres');
    cy.intercept('GET', '/api/v1/buses', { fixture: 'buses.json' }).as('getBuses');
    // Interceptar detalle
    cy.intercept('GET', /\/api\/v1\/pupitres\/([A-Z0-9]+)/, (req) => {
      const id = req.url.split('/').pop();
      const pupitre = pupitresFixture.find(p => p.id === id);
      req.reply(pupitre || {});
    }).as('getPupitreDetail');
  });

  it('should display pupitres list with correct status indicators', () => {
    cy.visit('/pupitres');
    cy.get('[data-testid="pupitres-list"]').should('exist');
    cy.get('[data-testid="pupitre-card"]').should('have.length', 3);
    cy.get('[data-testid="pupitre-card"]').first()
      .find('[data-testid="status-badge"]')
      .should('have.class', 'MuiChip-colorSuccess')
      .and('contain', 'OK');
    cy.get('[data-testid="pupitre-card"]').eq(1)
      .find('[data-testid="status-badge"]')
      .should('have.class', 'MuiChip-colorWarning')
      .and('contain', 'WARNING');
    cy.get('[data-testid="pupitre-card"]').last()
      .find('[data-testid="status-badge"]')
      .should('have.class', 'MuiChip-colorError')
      .and('contain', 'KO');
  });

  it('should navigate to pupitre detail', () => {
    cy.visit('/pupitres');
    cy.get('[data-testid="pupitre-card"]').first().click();
    cy.url().should('include', '/pupitres/PUP001');
    cy.get('[data-testid="pupitre-detail"]', { timeout: 10000 }).should('exist');
    cy.get('[data-testid="pupitre-id"]').should('contain', 'PUP001');
    cy.get('[data-testid="pupitre-status"]').should('contain', 'OK');
    cy.get('[data-testid="pupitre-bus-id"]').should('contain', '5678');
  });
}); 