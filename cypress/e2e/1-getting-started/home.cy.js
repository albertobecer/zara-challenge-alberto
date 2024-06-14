/// <reference types="cypress" />

describe('Marvel Characters Page', () => {
          beforeEach(() => {
              // Intercepta la llamada API para simular la respuesta
              cy.intercept('GET', '**/v1/public/characters*', {
                  statusCode: 200,
                  body: {
                      data: {
                          results: [
                              { id: 1011334, name: "3-D Man" },
                              { id: 1017100, name: "A-Bomb (HAS)" }
                          ]
                      }
                  }
              }).as('getCharacters');
              cy.visit('/');
          });
      

          it('loads and displays characters', () => {
              cy.wait('@getCharacters');
              cy.get('div>ul li', { timeout: 1000 }).should('have.length', 2);
          });
      
          it('allows marking a character as favorite', () => {
              cy.wait('@getCharacters');
              cy.get('div>ul li:first', { timeout: 1000 }).within(() => {
                  cy.contains('Favorite').click();
                  cy.contains('Unfavorite');
              });
          });
      
          it('filters characters by favorites', () => {
              cy.wait('@getCharacters');
              cy.get('div>ul li:first', { timeout: 1000 }).within(() => {
                  cy.contains('Favorite').click();
              });
              cy.get('input[type="checkbox"]').check({ force: true });
              cy.get('div>ul li', { timeout: 10000 }).should('have.length', 1);
          });
      });