Feature: Admin edit page

@user1 @web
Scenario: Como usuario administrador me logeo e intento editar una pagina
  Given I navigate to ghost admin
  And I login into the administrator
  And I go into "Pages"
  And I select existing page
  When I fill page with random name and description
  And I go into "Pages"
  Then I chek page with random name exists and has description