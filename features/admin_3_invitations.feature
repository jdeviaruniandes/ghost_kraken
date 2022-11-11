Feature: Admin Invitations

@user1 @web
Scenario: Como usuario administrador invito y elimino la invitación a un usuario
  Given I navigate to ghost admin
  And I login into the administrator
  And I go into settings
  And I go into "staff" settings
  And I open menu invite people
  And I fill the input with id selector "#new-user-email" with "automatizadorkraken@gmail.com"
  And I select the option "Editor" in the invite a new staff modal
  And I send the invitation mail
  And I revoke the invitation
  And I refresh the website
  Then I check that the invitation has been deleted

@user2 @web
Scenario: Como usuario administrador invito a un usuario ya existente
  Given I navigate to ghost admin
  And I login into the administrator
  And I go into settings
  And I go into "staff" settings
  And I open menu invite people
  And I fill the input with id selector "#new-user-email" with "jfdeviar@gmail.com"
  And I select the option "Administrator" in the invite a new staff modal
  And I send the invitation mail
  Then I see an error saying "A user with that email address already exists" in the ".response" field
