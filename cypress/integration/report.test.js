/// <reference types="Cypress" />

describe("Report", () => {
  before(() => {
    cy.visit("/report", {
      onBeforeLoad(win) {
        cy.stub(win.console, "error").as("consoleError");
      },
    });
    cy.get("@consoleError").should("not.be.called");
  });

  it("should show entered name and version", () => {
    cy.visit("/about");
    cy.get("button").contains("+ Expand All Sections").click();
    cy.get("#evaluation-product-name").type("Drupal");
    cy.get("#evaluation-product-version").type("9.1");

    cy.get("button").contains("View Report").click();

    cy.get(".validation").should("contain", "Valid!");

    cy.get("#content").should("contain", "Drupal 9.1");
  });

  it("should show entered report date", () => {
    cy.visit("/about");
    cy.get("button").contains("+ Expand All Sections").click();
    cy.get("#evaluation-report-date").type("12/31/2021");

    cy.get("button").contains("View Report").click();

    cy.get(".validation").should("contain", "Valid!");

    cy.get("#content").should("contain", "12/31/2021");
  });

  it("should show selected license", () => {
    cy.visit("/about");
    cy.get("button").contains("+ Expand All Sections").click();
    cy.get("#evaluation-license")
      .type("creative commons")
      .get(".listContainer")
      .contains(
        "Creative Commons Attribution Share Alike 4.0 International (CC-BY-SA-4.0)"
      )
      .click();

    cy.get("button").contains("View Report").click();

    cy.get(".validation").should("contain", "Valid!");

    cy.get("#content").should(
      "contain",
      "This content is licensed under a Creative Commons Attribution Share Alike 4.0 International."
    );
  });

  it("should show entered related OpenACR", () => {
    cy.visit("/about");
    cy.get("button").contains("+ Expand All Sections").click();

    cy.get("button")
      .contains("Add related OpenACR")
      .click()
      .get("#evaluation-related-openacrs-1-url")
      .type(
        "https://ckeditor.com/docs/ckeditor4/latest/guide/dev_section508.html"
      )
      .get("#evaluation-related-openacrs-1-type")
      .select("Secondary");

    cy.get("button").contains("View Report").click();

    cy.get(".validation").should("contain", "Valid!");

    cy.get("#content").should(
      "contain",
      "https://ckeditor.com/docs/ckeditor4/latest/guide/dev_section508.html (secondary)"
    );
  });

  it("should show entered level and notes for component", () => {
    cy.visit("/chapter/success_criteria_level_a");
    cy.get("button").contains("+ Expand All Sections").click();

    cy.get("select[name='evaluation-1.1.1-web-level']").select("Supports");

    cy.get("textarea[id='evaluation-1.1.1-web-notes']").type(
      "Does support non-text content."
    );

    cy.get("a[href='/report#text-equiv-all-editor']").click();

    cy.get("#success_criteria_level_a-editor + table tbody tr")
      .should("be.focused")
      .should("contain", "Web: Supports")
      .should("contain", "Web: Does support non-text content.");
  });
});
