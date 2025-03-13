Feature: Inventory Feature
    Background: I access the inventory page with valid credentials
        Given I visit the home page
        When I input username "standard_user" and password "secret_sauce"
        And I clicks on the home page login button
        Then I should navigate to "/inventory.html"

    Scenario Outline: Validate the added/removed items in the cart
        Given I am on the inventory page
        When I add "<item1>" "<item2>" and "<item3>" to the cart
        And I remove "<item2>" from the cart
        * I add "<item4>" to the cart
        Then I should see <count> items in the cart
        And I should see "Remove" button for "<item1>" "<item3>" and "<item4>"
            | item1    | item2      | item3        | item4         | count |
            | Backpack | Bike Light | Bolt T-Shirt | Fleece Jacket | 3     |