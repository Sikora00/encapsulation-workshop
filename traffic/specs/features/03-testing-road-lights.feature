Feature: Testing road lights

  Scenario: Starting with the tests
    Given Traffic light is turned off
    When Running tests
    Then All lights are on

  Scenario: Running tests when light was working
    Given Traffic light is turned to green
    When Running tests
    Then Light is switched to red
    And After 5s, all lights are on

