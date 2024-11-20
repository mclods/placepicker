/// <reference types="Cypress" />

import defaultPlaces from '../fixtures/default-places.json';
import sortedPlaces from '../fixtures/sorted-places.json';

describe('Placepicker Tests', () => {
  before(() => {
    cy.clearLocalStorage();
  });

  it('Load the App', () => {
    // Load App with no location access
    cy.loadAppWithoutLocationAccess();

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
              .should('have.attr', 'alt', defaultPlaces[index].image.alt);
            cy.wrap(placeItem)
              .find('p')
              .should('have.text', defaultPlaces[index].title);
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

  it('Pick places to visit', () => {
    // Select all available places
    cy.getTestId('places-section')
      .eq(1)
      .find('[data-testid="place-list-item"]')
      .each((placeItem) => {
        cy.wrap(placeItem).click();
      });

    // Assert all picked places
    cy.getTestId('places-section')
      .eq(0)
      .then((place) => {
        cy.wrap(place)
          .find('[data-testid="places-section-title"]')
          .should('have.text', "I'd like to visit ...");

        cy.wrap(place)
          .find('[data-testid="places-fallback-text"]')
          .should('not.exist');

        cy.wrap(place)
          .find('[data-testid="place-list-item"]')
          .each((placeItem, index) => {
            cy.wrap(placeItem)
              .find('img')
              .should('have.attr', 'alt', defaultPlaces[index].image.alt);
            cy.wrap(placeItem)
              .find('p')
              .should('have.text', defaultPlaces[index].title);
          });
      });
  });

  it('Delete all picked places', () => {
    // Select a picked place to delete
    cy.getTestId('places-section')
      .eq(0)
      .find('[data-testid="place-list-item"]')
      .eq(0)
      .click();

    // Assert delete confirmation dialog and press No
    cy.getTestId('dialog-title').should('have.text', 'Delete Place');
    cy.getTestId('dialog-message').should(
      'have.text',
      'Are you sure you want to delete this place ?'
    );
    cy.getTestId('yes-btn').should('have.text', 'Yes');
    cy.getTestId('no-btn').should('have.text', 'No').click();
    cy.getTestId('dialog-container').should('not.be.visible');

    // Select all picked places for deletion
    cy.getTestId('places-section')
      .eq(0)
      .find('[data-testid="place-list-item"]')
      .each((placeItem) => {
        cy.wrap(placeItem).click();

        // Confirm deletion by pressing Yes
        cy.getTestId('yes-btn').click();
      });

    // Assert no picked places exist
    cy.getTestId('places-fallback-text').should('exist');
  });

  it('Place picked for deletetion gets auto deleted after 5 seconds', () => {
    cy.clock();

    // Assert no picked places exist
    cy.getTestId('places-fallback-text').should('exist');

    // Select a place
    cy.getTestId('places-section')
      .eq(1)
      .find('[data-testid="place-list-item"]')
      .eq(0)
      .click();

    // Select place for deletion
    cy.getTestId('places-section')
      .eq(0)
      .find('[data-testid="place-list-item"]')
      .eq(0)
      .click();

    cy.getTestId('dialog-container').should('be.visible');
    cy.getTestId('deletion-timeout-progress').should('be.visible');

    // Forward time by 5 seconds
    cy.tick(5000);

    cy.getTestId('dialog-container').should('not.be.visible');

    // Assert no picked places exist
    cy.getTestId('places-fallback-text').should('exist');
  });

  it('Test picked places persist after reload', () => {
    // Select few available places
    const placeIndexes = [4, 10, 16, 7];

    placeIndexes.forEach((placeIndex) => {
      cy.getTestId('places-section')
        .eq(1)
        .find('[data-testid="place-list-item"]')
        .eq(placeIndex)
        .click();
    });

    // Assert selected places before reload
    cy.getTestId('places-section')
      .eq(0)
      .find('[data-testid="place-list-item"]')
      .each((place, index) => {
        cy.wrap(place)
          .find('p')
          .should('have.text', defaultPlaces[placeIndexes[index]].title);
      });

    // Reload App
    cy.loadAppWithoutLocationAccess();

    // Assert selected places persist after reload
    cy.getTestId('places-section')
      .eq(0)
      .find('[data-testid="place-list-item"]')
      .each((place, index) => {
        cy.wrap(place)
          .find('p')
          .should('have.text', defaultPlaces[placeIndexes[index]].title);
      });
  });

  it('Test location based sorting', () => {
    // Load App with stubbed location access
    cy.loadAppWithStubbedLocation();

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
              .should('have.attr', 'alt', sortedPlaces[index].image.alt);
            cy.wrap(placeItem)
              .find('p')
              .should('have.text', sortedPlaces[index].title);
          });
      });
  });
});
