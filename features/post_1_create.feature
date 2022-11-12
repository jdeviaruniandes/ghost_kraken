Feature: Creacion de posts

    @user1 @web
    Scenario: Como usuario administrador creo un post con un titulo y descripción
        Given I navigate to ghost admin
        And I login into the administrator
        And I go into "posts"
        And I select new post
        And I fill the post title with "Kraken Titulo post" and description with "Kraken description post"
        When I publish the post
        Then I Check post has title 'Kraken Titulo post' and description 'Kraken description post'

