Feature: Iniciar una conversación

@user1 @web
Scenario: Como primer usuario voy al administrador y hago login
  Given I navigate to ghost admin
  Then I login into the administrator
  Then I go into settings
  Then I go into general settings
  Then I expand the "Title" section
  Then I fill the input in the position 1 in the expanded section
  Then I save general settings changes
  Then I navigate to ghost website
  Then I check that the title has changed

