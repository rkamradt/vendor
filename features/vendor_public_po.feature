Feature: As a public user of the vendor, I need to get submit a purchase order.


    Scenario: Submit a purchase order
    Given that I have logged on to the vendor
    And I have an account in good standing
    When I submit a purchase order
    Then I should receive a tracking number for the purchase order
    
    Scenario: Check on the status of a purchase order
    Given that I have logged on to the vendor
    And I have a tracking number for a purchase order
    When I ask for the status of the purchase order
    Then I should receive the status of the purchase order
    
    Scenario: Cancel a pending purchase order
    Given that I have logged on to the vendor
    And I have a tracking number for a purchase order
    When I ask for the purchase order to be canceled
    Then the purchase order shall be cancelled
    
    Scenario: Get a list of outstanding purchase orders
    Given that I have logged on to the vendor
    When I ask for a list of outstanding purchase orders
    Then I should receive a list of purchase orders
    
    Scenario: Get a list of completed purchase orders
    Given that I have logged on to the vendor
    When I ask for a list of completed purchase orders
    Then I should receive a list of completed purchase orders
