import { faker } from "@faker-js/faker";
import { expect } from "chai";

describe("Admin create new post", () => {
  it("Como usuario administrador creo un Tag con description", () => {
    const title = faker.name.jobTitle();
    const description = faker.name.jobType();
    cy.intercept("/ghost/api/admin/settings").as("saveSettings");
    cy.goAdminAndLogin();
    cy.visit("http://uniandes.ingenio.com.co:2368/ghost/#/tags");
    cy.get("a.ember-view.gh-btn.gh-btn-primary").contains("New tag").click();
    cy.get("#tag-name").clear().type(title);
    cy.get("#tag-description").clear().type(description);

    cy.get("button.gh-btn.gh-btn-primary.gh-btn-icon.ember-view").click();
    cy.wait(5000);

    cy.visit("http://uniandes.ingenio.com.co:2368/ghost/#/tags");

    cy.get("h3.gh-tag-list-name").contains(title).should("exist");
  });

  it("Como usuario administrador edito un tag", () => {
    const title = faker.name.jobTitle();
    const description = faker.name.jobType();
    cy.intercept("/ghost/api/admin/settings").as("saveSettings");
    cy.goAdminAndLogin();
    cy.visit("http://uniandes.ingenio.com.co:2368/ghost/#/tags");
    cy.get("h3.gh-tag-list-name").first().click();
    cy.wait(1000);
    cy.get("#tag-name").clear().type(title);
    cy.get("#tag-description").clear().type(description);

    cy.get("button.gh-btn.gh-btn-primary.gh-btn-icon.ember-view").click();
    cy.wait(5000);

    cy.visit("http://uniandes.ingenio.com.co:2368/ghost/#/tags");

    cy.get("h3.gh-tag-list-name").contains(title).should("exist");
  });

  it("Como usuario administrador creo y borro un tag", () => {
    const title = faker.name.jobTitle();
    const description = faker.name.jobType();

    cy.intercept("/ghost/api/admin/settings").as("saveSettings");
    cy.goAdminAndLogin();
    cy.visit("http://uniandes.ingenio.com.co:2368/ghost/#/tags");
    cy.get("a.ember-view.gh-btn.gh-btn-primary").contains("New tag").click();
    cy.get("#tag-name").clear().type(title);
    cy.get("#tag-description").clear().type(description);

    cy.get("button.gh-btn.gh-btn-primary.gh-btn-icon.ember-view").click();
    cy.wait(5000);

    cy.visit("http://uniandes.ingenio.com.co:2368/ghost/#/tags");

    cy.get("h3.gh-tag-list-name").contains(title).should("exist");

    cy.visit("http://uniandes.ingenio.com.co:2368/ghost/#/tags");
    cy.get("h3.gh-tag-list-name").contains(title).click();
    cy.wait(1000);

    cy.get("button.gh-btn.gh-btn-red.gh-btn-icon").click();
    cy.wait(1000);
    cy.once("uncaught:exception", () => false);
    cy.get("button.gh-btn.gh-btn-red.gh-btn-icon.ember-view").click();
    cy.wait(5000);
    cy.log(title);

    cy.get("h3.gh-tag-list-name").contains(title).should("not.exist");
  });
});
