Feature: Login Feature
    As a user
    I want to be able to Login
    So I could access the other features

    Scenario: Login with standard user
        Given I visit the home page
        When I input username "standard_user" and password "secret_sauce"
        And I clicks on the home page login button
        Then I should navigate to "/inventory.html"

    Scenario: Login with locked out user
        Given I visit the home page
        When I input username "standard_user" and password "secret_sauce"
        And I clicks on the home page login button
        Then I should see an error message on the login button and should not navigate to the "/inventory.html"