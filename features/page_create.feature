Feature: Admin create page

@user1 @web
Scenario: Como usuario administrador me logeo e intento crear una pagina, insertar titulo, descripcion, publicar ahora mismo
  Given I navigate to ghost admin
  And I login into the administrator
  And I go into "Pages"
  And I select New page
  When I fill page with random name and description
  And I select Publish

  @user2 @web
Scenario: Como usuario administrador me logeo e intento crear una pagina, insertar titulo, descripcion y cancelar
  Given I navigate to ghost admin
  And I login into the administrator
  And I go into "Pages"
  And I select New page
  When I fill page with random name and description
  And I select Pages