Feature: Admin add newsletter

@user1 @web
Scenario: Como usuario administrador me logeo e intento agregar boletin, indicar nombre, decripción y crear
  Given I navigate to ghost admin
  And I login into the administrator
  And I go into settings
  And I go into "email newsletter" settings
  And I select add newsletter
  And I fill the input with id selector name "#newsletter-title" with "Boletin 1"
  And I fill the input with id selector description "#newsletter-description" with "Descripcion 1"
  Then I select create
  

  @user2 @web
Scenario: Como usuario administrador me logeo e intento agregar boletin, indicar nombre, decripción y cancelar
  Given I navigate to ghost admin
  And I login into the administrator
  And I go into settings
  And I go into "email newsletter" settings
  And I select add newsletter
  And I fill the input with id selector name "#newsletter-title" with "Boletin 2"
  And I fill the input with id selector description "#newsletter-description" with "Descripcion 2"
  Then I select cancel