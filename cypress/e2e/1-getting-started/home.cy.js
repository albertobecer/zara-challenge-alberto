/// <reference types="cypress" />

describe('Home marvell', () => {
          it('Home marvell load', () => {
            cy.visit('/')
            cy.get('h1').should('have.text', 'Characters')
          })
 })