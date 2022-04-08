Feature: Traffic Light

  Traffic Light should work this way.

  Scenario: Changing to the red light
    Given The traffic light is green
    When Changing it to red
    Then Yellow light
    And After 5s, only the red one is on

  Scenario: Changing to the green light
    Given The traffic light is red
    When Changing it to green
    Then Yellow and red light
    And After 5s, only the green one is on

