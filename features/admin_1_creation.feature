Feature: Admin create elements in configuration


@user1 @web
Scenario: Como usuario administrador cambio el titulo y lo verifico en la página
  Given I navigate to ghost admin
  And I login into the administrator
  And I go into settings
  And I go into "general" settings
  And I expand the "Title" section
  And I fill the input in the position 1 in the expanded section
  And I save general settings changes
  And I navigate to ghost website
  Then I check that the title has changed

@user2 @web
Scenario: Como usuario administrador crea un elemento del menu en la navegacion principal
  Given I navigate to ghost admin
  And I login into the administrator
  And I go into settings
  And I go into "navigation" settings
  And I add a menu to "https://facebook.com" with label "facebook" as a new element in "primary" navigation
  And I save general settings changes
  And I navigate to ghost website
  Then I check that the menu to "https://facebook.com" has been added
