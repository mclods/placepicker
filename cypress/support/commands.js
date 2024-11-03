// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('getTestId', getTestId);
Cypress.Commands.add(
  'loadAppWithoutLocationAccess',
  loadAppWithoutLocationAccess
);
Cypress.Commands.add('loadAppWithStubbedLocation', loadAppWithStubbedLocation);

function getTestId(data) {
  return cy.get(`[data-testid=${data}]`);
}

function loadAppWithoutLocationAccess() {
  cy.visit('/', {
    onBeforeLoad(win) {
      cy.stub(
        win.navigator.geolocation,
        'getCurrentPosition',
        (success, error) => {
          throw error({ code: 1 });
        }
      );
    },
  });
}

function loadAppWithStubbedLocation() {
  cy.visit('/', {
    onBeforeLoad(win) {
      cy.stub(win.navigator.geolocation, 'getCurrentPosition', (success) => {
        success({ coords: { latitude: 24.7912052, longitude: 84.9973546 } });
      });
    },
  });
}
