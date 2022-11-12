Feature: Admin Invitations

    @user1 @web
    Scenario: Como usuario administrador edito un post publicado
        Given I navigate to ghost admin
        And I login into the administrator
        And I go into "posts"
        And I select last post published
        And I fill the post title with random title
        When I edit the post
        Then I Check post has the random title