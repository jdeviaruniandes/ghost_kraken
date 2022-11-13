Feature: Admin add newsletter

@user1 @web
Scenario: Como usuario administrador me logeo e intento agregar boletin, indicar nombre, decripción y crear
  Given I navigate to ghost admin
  And I login into the administrator
  And I go into settings
  And I go into "Email newsletter" settings
  And I select Add newsletter
  And I fill the input with id selector "#newsletter-title" with "Boletin 1"
  And I fill the input with id selector "#newsletter-description" with "Descripcion 1"
  And I select Create

  @user2 @web
Scenario: Como usuario administrador me logeo e intento agregar boletin, indicar nombre, decripción y cancelar
  Given I navigate to ghost admin
  And I login into the administrator
  And I go into settings
  And I go into "Email newsletter" settings
  And I select Add newsletter
  And I fill the input with id selector "#newsletter-title" with "Boletin 1"
  And I fill the input with id selector "#newsletter-description" with "Descripcion 1"
  And I select Cancel