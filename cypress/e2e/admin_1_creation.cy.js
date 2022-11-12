import {faker} from "@faker-js/faker";
import {expect} from "chai";



describe('Como usuario administrador cambio el titulo y lo verifico en la página', () => {
  it('passes', () => {
    const newTitle = faker.lorem.words(2)
    cy.intercept('/ghost/api/admin/settings').as('saveSettings')

    cy.goAdminAndLogin()
    cy.goIntoSettings('general')
    cy.get('.gh-expandable-block').contains('Title').parents('.gh-expandable-block').find('button.gh-btn').click()
    cy.get('.gh-expandable-content input').eq(0).clear().type(newTitle)
    cy.saveSettings()
    cy.wait('@saveSettings')
    cy.goWebsite()

    cy.title().should('eq', newTitle)

  })
})