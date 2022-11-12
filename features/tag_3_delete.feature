Feature: Editar Tag

    @user1 @web
    Scenario: Como usuario administrador borro un Tag con description
        Given I navigate to ghost admin
        And I login into the administrator
        And I go into "tags"
        And I select existing tag
        When I delete the tag
        And I go into "tags"
        Then I chek tag doest not exists
        
