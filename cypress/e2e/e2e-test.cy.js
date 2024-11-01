/// <reference types="Cypress" />

import fixture from '../fixtures/example.json';

describe('Placepicker Tests', () => {
  it('Load the App', () => {
    cy.visit('/');

    cy.getTestId('company-logo').should('exist');
    cy.getTestId('company-title').should('have.text', 'Placepicker');
    cy.getTestId('company-subtitle').should(
      'have.text',
      'Create your personal collection of places you would like to visit or you have visited.'
    );
  });

  it('Assert list of wishlisted places', () => {
    cy.getTestId('places-section')
      .eq(0)
      .then((place) => {
        cy.wrap(place)
          .find('[data-testid="places-section-title"]')
          .should('have.text', "I'd like to visit ...");
        cy.wrap(place)
          .find('[data-testid="places-fallback-text"]')
          .should(
            'have.text',
            'Select the places you would like to visit below.'
          );
      });
  });

  it('Assert list of available places', () => {
    cy.getTestId('places-section')
      .eq(1)
      .then((place) => {
        cy.wrap(place)
          .find('[data-testid="places-section-title"]')
          .should('have.text', 'Available Places');

        cy.wrap(place)
          .find('[data-testid="place-list-item"]')
          .each((placeItem, index) => {
            cy.wrap(placeItem)
              .find('img')
              .should('have.attr', 'alt', fixture[index].image.alt);
            cy.wrap(placeItem)
              .find('p')
              .should('have.text', fixture[index].title);
          });
      });
  });

  it('Assert footer', () => {
    const currentYear = new Date().getFullYear();

    cy.getTestId('company-copyright-text').should(
      'have.text',
      `© ${currentYear} Placepicker`
    );
  });
});
