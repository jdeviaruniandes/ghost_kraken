Feature: Admin create page

@user1 @web
Scenario: Como usuario administrador me logeo e intento crear una pagina, insertar titulo, descripcion, publicar ahora mismo
  Given I navigate to ghost admin
  And I login into the administrator
  And I go into "pages"
  And I select new page
  And I fill the page title with "Kraken Titulo page" and description with "Kraken description page"
  When I select publish
  Then I Check page has title 'Kraken Titulo page' and description 'Kraken description page'

  @user2 @web
Scenario: Como usuario administrador me logeo e intento crear una pagina, insertar titulo, descripcion y cancelar
  Given I navigate to ghost admin
  And I login into the administrator
  And I go into "pages"
  And I select new page
  And I fill the page title with "Kraken Titulo page 2" and description with "Kraken description page 2"
  Then I select pages