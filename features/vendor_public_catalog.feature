Feature: As a public user of the vendor, I need to get a current catalog of components, and details for each component.  I also need to get a change list to update my copy of their catalog.


    Scenario: Read the entire catalog
    Given that I have logged on to the vendor
    When I ask for the current catalog
    Then the current catalog should be returned
    
    Scenario: Read the details of an existing item
    Given that I have lo logged on to the vendor
    When I ask for the details of an existing item
    Then the details of the current item should be returned
    
    Scenario: Read the details of an non-existent item
    Given that I have logged on to the vendor
    When I ask for the details of an non-existent item
    Then an error code should be returned
    
    Scenario: Read the changes since a certain date
    Given that I have logged on to the vendor
    When I ask for the changes since a certain date
    Then I should be return a list of adds, deletes and modfications to the catalog
    
    