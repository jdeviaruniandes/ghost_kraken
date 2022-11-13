Feature: Admin edit page

@user1 @web
Scenario: Como usuario administrador me logeo e intento editar una pagina
  Given I navigate to ghost admin
  And I login into the administrator
  And I go into "pages"
  And I select last page published
  And I fill the page title with random title
  When I edit the page
  Then I Check page has the random title
