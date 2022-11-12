import { faker } from "@faker-js/faker";
import { expect } from "chai";

describe("Admin create new post", () => {
  it("Como usuario administrador creo un post con un titulo y descripción", () => {
    const title = faker.name.jobTitle();
    const description = faker.lorem.paragraph();
    cy.intercept("/ghost/api/admin/settings").as("saveSettings");
    cy.goAdminAndLogin();
    cy.visit("http://uniandes.ingenio.com.co:2368/ghost/#/posts/");
    cy.get("a.ember-view.gh-btn.gh-btn-primary.view-actions-top-row")
      .contains("New post")
      .click();
    cy.get("textarea.gh-editor-title").clear().type(title);
    cy.get("article.koenig-editor").clear().type(description);
    cy.get("button.gh-publish-trigger").click();
    cy.get("button.gh-btn.gh-btn-black.gh-btn-large").click();
    cy.get("button.gh-btn.gh-btn-pulse").click();
    let titleUrl = title.replaceAll(" ", "-").toLowerCase();
    cy.visit(`http://uniandes.ingenio.com.co:2368/${titleUrl}/`);
    cy.get("h1.single-title").should("have.text", title);
    cy.get("div.single-content p").should("have.text", description);
  });

  it("Como usuario administrador edito un post publicado", () => {
    const title = faker.name.jobTitle();
    const description = faker.lorem.paragraph();
    cy.intercept("/ghost/api/admin/settings").as("saveSettings");
    cy.goAdminAndLogin();
    cy.visit(
      "http://uniandes.ingenio.com.co:2368/ghost/#/posts?type=published"
    );
    cy.get("h3.gh-content-entry-title").first().click();
    cy.get("textarea.gh-editor-title").clear().type(title);
    cy.get("article.koenig-editor").clear().type(description);
    cy.get("button.gh-editor-save-trigger").click();
    cy.get("span.gh-notification-actions a")
      .invoke("removeAttr", "target")
      .click();
    cy.get("h1.single-title").should("have.text", title);
    cy.get("div.single-content p").should("have.text", description);
  });
});
