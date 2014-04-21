Feature: As an vendor administrator I need to maintain a public catalog



    Scenario: I need to add an item to the catalog
    Given That I am logged in as an administrator
    And that I am on the add item action
    When I add an item to the catalog
    Then the item shall be stored in the catalog
    
    Scenario: I need to add an item to the catalog but is already exists
    Given That I am logged in as an administrator
    And that I am on the add item action
    And the item already exists
    When I add an item to the catalog
    Then an error code should be returned
    
    Scenario: I need to bulk add items to the catalog
    Given That I am logged in as an administrator
    And that I am on the add bulk item action
    When I add a list of items to the catalog
    Then the items shall be stored in the catalog
    And a list of additions and modifications should be returned
    
    Scenario: I need to modify an item in the catalog
    Given That I am logged in as an administrator
    And that I am on the modify item action
    When I update an item in the catalog
    Then the new item shall be saved in the catalog
    
    Scenario: I need to modify an item in the catalog but it doesnt exist
    Given That I am logged in as an administrator
    And that I am on the modify item action
    And the item does not exist
    When I update an item in the catalog
    Then an error code should be returned
    
    Scenario: I need to delete an item in the catalog
    Given That I am logged in as an administrator
    And that I am on the delete item action
    When I delete an item in the catalog
    Then the item shall be marked as deleted
    
    Scenario: I need to delete an item in the catalog but it doesnt exist
    Given That I am logged in as an administrator
    And that I am on the delete item action
    And the item does not exist
    When I delete an item in the catalog
    Then an error code should be returned    
    
