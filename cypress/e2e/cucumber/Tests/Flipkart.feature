Feature: Unbox Assignment to automate flipkart for the given sceanrio.

    Scenario: To test and perform the scenario on flipkart.
    Given I visit flipkart website
    Then I click on the global search module
    And I search for keyword mobile
      | keyword |
      | mobile |
    Then I verify the search results message
    And I added 7th and 8th phone to compare tray
    And I click on the 8th phone name
    And I add the product to cart
    Then I verify the button name change to going to cart and item is added to cart
    And I verify the total amount displayed is the same as was displayed on the products list page
    Then I increase the product quantity by one, and verify the pop-up message of quantity increase
    Then I click on remove option and verify the pop-up displayed
    And I remove the product from the cart
    Then I verify the removal message
    And I verify the empty cart message screen







