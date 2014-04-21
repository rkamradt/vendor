Feature: As an administrator I need to process purchase orders

    Background:
    Given That I am logged in as an administrator


    Scenario: I need to get a list of outstanding purchase orders
    When I ask for a list of purchase orders
    Then I should receive a list of outstanding purchase orders
    
    Scenario: I need to ship an item of an outstanding purchase order
    And I have shipped an item to a client
    When I update the purchse order to with the new status
    Then the new status should be stored
    
    Scenario: I need to close a purchase order
    And I have shipped the last item of a purchase order
    When I update the purchase order with the new status
    Then the purchase order shall be marked as closed
    And the new status should be stored