Feature: As an administrator I need to process purchase orders


    Scenario: I need to get a list of outstanding shippable items
    Given I am logged on as an shipper
    When I ask for a list of shippable items
    Then I should receive a list of shippable items
    
    Scenario: I need to ship an item of an outstanding purchase order
    Given I am logged on as an shipper
    And I have shipped an item to a client
    When I update the purchse order to with the new status
    Then the new status should be stored
    
    Scenario: I need to close a purchase order
    Given I am logged on as an shipper
    And I have shipped the last item of a purchase order
    When I update the purchase order with the new status
    Then the purchase order shall be marked as closed
    And the new status should be stored