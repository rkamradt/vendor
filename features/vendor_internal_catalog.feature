Feature: As an vendor administrator I need to maintain a public catalog


    Scenario: I need to add an item to the catalog
    Given That I am logged in as an administrator
    When I add an item to the catalog
    Then the item shall be stored in the catalog
    
    Scenario: I need to add an item to the catalog but is already exists
    Given That I am logged in as an administrator
    When I add an item to the catalog that already exists
    Then an error code should be returned
    
    Scenario: I need to bulk add items to the catalog
    Given That I am logged in as an administrator
    When I add a list of items to the catalog
    Then the items shall be stored in the catalog
    And a list of additions and modifications should be returned
    
    Scenario: I need to modify an item in the catalog
    Given that I am logged in as an administrator
    When I update an item in the catalog
    Then the new item shall be saved in the catalog
    
    Scenario: I need to modify an item in the catalog but it doesnt exist
    Give that I am logged in as an administrator
    When I update an item that is not in the catalog
    Then an error code should be returned
    
    Scenario: I need to delete an item in the catalog
    Given that I am logged in as an administrator
    When I delete an item in the catalog
    Then the item shall be marked as deleted
    
    Scenario: I need to delete an item in the catalog but it doesnt exist
    Given that I am logged in as an administrator
    When I delete an item that is not in the catalog
    Then an error code should be returned