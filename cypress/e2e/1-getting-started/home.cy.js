/// <reference types="cypress" />

describe('Home marvell', () => {
          it('Home marvell load', () => {
            cy.visit('/')
            cy.get('.read-the-docs').should('have.text', 'Click on the Vite and React logos to learn more')
          })
 })