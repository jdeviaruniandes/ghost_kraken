import {faker} from "@faker-js/faker";

describe('Admin create elements in configuration', () => {

  it('Como usuario administrador me logeo e intento agregar boletin, indicar nombre, decripción y crear', () => {
    const title = faker.name.jobTitle();
    const description = faker.lorem.paragraph();
    cy.goAdminAndLogin()
    cy.get('li a[href="#/settings/newsletters/"]').click()
    cy.get('li a[href="#/settings/newsletters/new"]').click()
    cy.get('#newsletter-title').type(title);
    cy.get("textarea.gh-input").type(description);
    cy.get('button.gh-btn-primary').click()

  })

  it('Como usuario administrador me logeo e intento agregar boletin, indicar nombre, decripción y cancelar', () => {
    const title = faker.name.jobTitle();
    const description = faker.lorem.paragraph();
    cy.goAdminAndLogin()
    cy.get('li a[href="#/settings/newsletters/"]').click()
    cy.get('li a[href="#/settings/newsletters/new"]').click()
    cy.get('#newsletter-title').type(title);
    cy.get("textarea.gh-input").type(description);
    cy.get('button.gh-btn').click()

  })

})