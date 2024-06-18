/// <reference types="cypress" />

describe('Marvel Characters Page', () => {
          beforeEach(() => {
                    cy.intercept('GET', '**/v1/public/characters*', {
                              statusCode: 200,
                              body: {
                                        data: {
                                                  results: [
                                                            {
                                                                      id: 1011334,
                                                                      name: "3-D Man",
                                                                      thumbnail: {
                                                                                path: "http://i.annihil.us/u/prod/marvel/i/mg/c/e0/535fecbbb9784",
                                                                                extension: "jpg"
                                                                      }
                                                            },
                                                            {
                                                                      id: 1017100,
                                                                      name: "A-Bomb (HAS)",
                                                                      thumbnail: {
                                                                                path: "http://i.annihil.us/u/prod/marvel/i/mg/c/e0/535fecbbb9784",
                                                                                extension: "jpg"
                                                                      }
                                                            }
                                                  ]
                                        }
                              }
                    }).as('getCharacters');

                    cy.on('uncaught:exception', (err, runnable) => {
                              console.log('Caught exception:', err.message);
                              return false;
                    });

                    cy.visit('/');
          });

          it('loads and displays characters', () => {
                    cy.wait('@getCharacters');
                    cy.get('ul li', { timeout: 10000 }).should('have.length', 2);
          });

          it('allows marking a character as favorite', () => {
                    cy.wait('@getCharacters');
                    cy.get('ul li:first', { timeout: 10000 }).within(() => {
                              cy.get('button').click();
                    });
          });

          it('filters characters by favorites', () => {
                    cy.wait('@getCharacters');
                    cy.get('ul li:first', { timeout: 10000 }).within(() => {
                              cy.get('button').click();
                    });
                    cy.get('button[aria-label="Use Favorites"]').click();
                    cy.get('ul li', { timeout: 10000 }).should('have.length', 1);
          });
});
