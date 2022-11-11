Feature: Admin delete elements in configurations

@user2 @web
Scenario: Como usuario administrador elimino un elemento del menu en la navegacion principal
  Given I navigate to ghost website
  And I check the last menu item in "primary" navigation
  And I navigate to ghost admin
  And I login into the administrator
  And I go into settings
  And I go into "navigation" settings
  And I remove the last menu item in "primary" navigation
  And I save general settings changes
  And I navigate to ghost website
  Then I check that the last menu item was deleted in the "primary" navigation

