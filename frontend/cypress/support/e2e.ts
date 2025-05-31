/// <reference types="cypress" />
// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

import '@testing-library/cypress/add-commands';

// Comandos personalizados
Cypress.Commands.add('login', (email: string, password: string) => {
  cy.visit('/login');
  cy.get('input[name="email"]').type(email);
  cy.get('input[name="password"]').type(password);
  cy.get('button[type="submit"]').click();
});

Cypress.Commands.add('checkDeviceStatus', (deviceType: string, deviceId: string, expectedStatus: string) => {
  cy.get(`[data-testid="${deviceType}-${deviceId}"]`)
    .find('[data-testid="status-chip"]')
    .should('have.text', expectedStatus);
});

// Tipos para TypeScript
declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<void>;
      checkDeviceStatus(deviceType: string, deviceId: string, expectedStatus: string): Chainable<void>;
    }
  }
}