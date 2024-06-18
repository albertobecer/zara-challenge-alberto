/// <reference types="cypress" />

describe('Marvel Character Page', () => {
          beforeEach(() => {
                    cy.intercept('GET', '**/v1/public/characters/1017100*', {
                              statusCode: 200,
                              body: {
                                        data: {
                                                  results: [
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
                    }).as('getCharacter');

                    cy.intercept('GET', '**/v1/public/characters/1017100/comics*', {
                              statusCode: 200,
                              body: {
                                        data: {
                                                  results: [
                                                            {
                                                                      title: "Avengers: The Initiative (2007 - 2010)",
                                                                      thumbnail: {
                                                                                path: "http://i.annihil.us/u/prod/marvel/i/mg/5/a0/514a2ed3302f5",
                                                                                extension: "jpg"
                                                                      }
                                                            },
                                                            {
                                                                      title: "Deadpool (1997 - 2002)",
                                                                      thumbnail: {
                                                                                path: "http://i.annihil.us/u/prod/marvel/i/mg/7/03/5130f646465e3",
                                                                                extension: "jpg"
                                                                      }
                                                            },
                                                            {
                                                                      title: "Marvel Premiere (1972 - 1981)",
                                                                      thumbnail: {
                                                                                path: "http://i.annihil.us/u/prod/marvel/i/mg/4/40/5a98437953d4e",
                                                                                extension: "jpg"
                                                                      }
                                                            }
                                                  ]
                                        }
                              }
                    }).as('getComics');

                    cy.on('uncaught:exception', (err, runnable) => {
                              console.log('Caught exception:', err.message);
                              return false;
                    });

                    cy.visit('/character/1017100');
          });

          it('renders Marvel logo', () => {
                    cy.get('img[alt="Marvel logo"]').should('have.attr', 'src', '/marvel.svg');
          });

          it('toggles theme between light and dark mode', () => {
                    const darkModeButton = 'button[aria-label="Use Dark Mode"]';
                    const lightModeButton = 'button[aria-label="Use Light Mode"]';

                    cy.get(darkModeButton).should('have.class', 'show');
                    cy.get(lightModeButton).should('have.class', 'hidden');

                    cy.get(darkModeButton).click();
                    cy.get(darkModeButton).should('have.class', 'hidden');
                    cy.get(lightModeButton).should('have.class', 'show');

                    cy.get(lightModeButton).click();
                    cy.get(darkModeButton).should('have.class', 'show');
                    cy.get(lightModeButton).should('have.class', 'hidden');
          });

          it('displays the number of favorites', () => {
                    cy.get('button[aria-label="Use Favorites"]').within(() => {
                              cy.get('p').should('have.text', '0');
                    });
          });

          it('loads and displays the character', () => {
                    cy.wait('@getCharacter');
                    cy.get('#character').within(() => {
                              cy.get('img').should('have.attr', 'src', 'http://i.annihil.us/u/prod/marvel/i/mg/c/e0/535fecbbb9784.jpg');
                              cy.get('h2').should('have.text', 'A-Bomb (HAS)');
                    });
          });
});
