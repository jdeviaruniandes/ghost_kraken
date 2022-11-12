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

import {faker} from "@faker-js/faker";

Cypress.Commands.add('goIntoSettings', (settings) => {
    cy.get('.gh-nav-bottom a[href="#/settings/"]').click()
    cy.get('.gh-main a[href="#/settings/'+settings+'/"]').click()
})

Cypress.Commands.add('saveSettings', () => {
    cy.get('.view-actions button').click()
})

Cypress.Commands.add('goAdminAndLogin', () => {
    const username = 'jfdeviar@gmail.com'
    const password = 'pt100UNAL--'

    cy.visit('http://uniandes.ingenio.com.co:2368/ghost')
    cy.get('input.email').type(username)
    cy.get('input.password').type(password)
    cy.get('button.login').click() // Click on button
})

Cypress.Commands.add('goWebsite', () => {
    cy.visit('http://uniandes.ingenio.com.co:2368')
})
