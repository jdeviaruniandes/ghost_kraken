Feature: Admin change values in profile 

@user1 @web
Scenario: Como usuario administrador me logeo e intento agregar una bio de menos de 200 caracteres
  Given I navigate to ghost admin
  And I login into the administrator
  And I go to my profile
  And I fill the bio with faker with "10" words
  And I save the profile changes
  And I refresh the website
  Then I check the Bio is updated


@user2 @web
Scenario: Como usuario administrador me logeo y cambio el nombre en mi perfil
  Given I navigate to ghost admin
  And I login into the administrator
  And I go to my profile
  And I enter "johnattan devia" to the input with class "user-name"
  And I save the profile changes
  And I go to my profile
  Then I check that the full name is "johnattan devia"


@user3 @web
Scenario: Como usuario administrador me logeo y cambio el nombre en mi perfil pero no guardo cambios
  Given I navigate to ghost admin
  And I login into the administrator
  And I go to my profile
  And I enter "Johnattan Devia" to the input with class "user-name"
  And I refresh the website
  Then I check that the full name is "johnattan devia"  

@user4 @web
Scenario: Como usuario administrador me logeo e intento cambiar la contraseña ingresando una inferior a 10 digitos
  Given I navigate to ghost admin
  And I login into the administrator
  And I go to my profile
  And I fill the input with id selector "#user-password-old" with "1234"
  And I fill the input with id selector "#user-password-new" with "1234"
  And I fill the input with id selector "#user-new-password-verification" with "1234"
  And I try to change password
  Then I check the error message "Password must be at least 10 characters long."

@user5 @web
Scenario: Como usuario administrador me logeo e intento agregar una bio de más de 200 caracteres
  Given I navigate to ghost admin
  And I login into the administrator
  And I go to my profile
  And I fill the bio with faker with "30" words
  And I save the profile changes
  Then I check the error message "Bio is too long"