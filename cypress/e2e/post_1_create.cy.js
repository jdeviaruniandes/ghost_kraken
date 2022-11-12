import {faker} from "@faker-js/faker";
import { expect } from "chai";

describe('Admin create new post', () => {

//   it('Como usuario administrador creo un post con un titulo y descripción', () => {
//     const title = faker.name.jobTitle()
//     const description = faker.lorem.paragraph()
//     cy.intercept('/ghost/api/admin/settings').as('saveSettings')
//     cy.goAdminAndLogin()
//     cy.visit('http://uniandes.ingenio.com.co:2368/ghost/#/posts/')
//     cy.get('a.ember-view.gh-btn.gh-btn-primary.view-actions-top-row').contains('New post').click()
//     cy.get('textarea.gh-editor-title').clear().type(title)
//     cy.get('article.koenig-editor').clear().type(description)
//     cy.get('button.gh-publish-trigger').click()
//     cy.get('button.gh-btn.gh-btn-black.gh-btn-large').click()
//     cy.get('button.gh-btn.gh-btn-pulse').click()
//     cy.get('div.gh-post-bookmark-container').click('removeAttr', 'target')
//     let titleUrl = title.replaceAll(" ", "-").toLowerCase()
//     cy.visit(`http://uniandes.ingenio.com.co:2368/${titleUrl}/`)
//     cy.get('h1.single-title').should('have.text', title)
//     cy.get('div.single-content p').should('have.text', description)
//   })

  it('Como usuario administrador edito un post publicado', () => {
    const title = faker.name.jobTitle()
    const description = faker.lorem.paragraph()
    cy.intercept('/ghost/api/admin/settings').as('saveSettings')
    cy.goAdminAndLogin()
    cy.visit('http://uniandes.ingenio.com.co:2368/ghost/#/posts/')
    cy.get('div.gh-contentfilter-type').click()
    cy.get('li.ember-power-select-option').contains('Published posts').click()
    cy.wait(1000)
    cy.get('h3.gh-content-entry-title').first().click()


  })

//   it('Como usuario administrador crea un elemento del menu en la navegacion principal', () => {
//     const newUrl = faker.internet.url()
//     const newLabel = faker.lorem.word()
//     cy.intercept('/ghost/api/admin/settings').as('saveSettings')

//     cy.goAdminAndLogin()
//     cy.goIntoSettings('navigation')

//     cy.get('#settings-navigation .gh-blognav-item:not(.gh-blognav-item--sortable) input[placeholder="Label"]').clear().type(newLabel)
//     cy.get('#settings-navigation .gh-blognav-item:not(.gh-blognav-item--sortable) input:not([placeholder="Label"])').clear().type(newUrl)

//     cy.saveSettings()
//     cy.wait('@saveSettings')
//     cy.goWebsite()
//     cy.get('.nav a[href="'+newUrl+'"]').should(($nav) => {
//       expect($nav).to.have.length(1)
//       expect($nav.first()).to.contain(newLabel)
//     })

//   })

//   it('Como usuario administrador crea un elemento del menu en la navegacion principal', () => {
//     cy.intercept('/ghost/api/admin/settings').as('saveSettings')

//     let lastHref = {};
//     let previewLength = 0;

//     cy.goWebsite()

//     cy.get('#gh-head .nav a').then(($aElement) => {
//       $aElement.each(($innerEl) => {
//         lastHref['el-'+$innerEl] = $aElement.eq($innerEl).attr('href')
//       })
//       previewLength = $aElement.length
//     })
//     cy.goAdminAndLogin()
//     cy.goIntoSettings('navigation')

//     cy.wait(1000)
//     cy.get('#settings-navigation .sortable-objects .draggable-object:last-child button.gh-blognav-delete').click()
//     cy.wait(1000)

//     cy.saveSettings()
//     cy.wait('@saveSettings')
//     cy.goWebsite()
//     cy.get('#gh-head .nav a').should(($aElement) => {
//       expect($aElement).to.have.length(previewLength - 1)

//       $aElement.each(($innerEl) => {
//         expect(lastHref['el-'+$innerEl]).to.eq($aElement.eq($innerEl).attr('href'))
//       })
//     })
//   })


})