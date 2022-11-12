Feature: Crear Tag

    @user1 @web
    Scenario: Como usuario administrador creo un Tag con description
        Given I navigate to ghost admin
        And I login into the administrator
        And I go into "tags"
        And I select new tag
        When I fill tag with random name and description
        And I go into "tags"
        Then I chek tag with random name exists and has description
        
