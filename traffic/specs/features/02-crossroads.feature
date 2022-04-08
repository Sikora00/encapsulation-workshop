Feature: Crossroads
  Simple crossroads with traffic lights

  Scenario: Launching traffic lights
    Given Lights are turned off
    When Launching crossroads lights
    Then All lights are red
    And After 5s, one road turns to green

  Scenario: Changing the lights
    Given One road has green lights
    When Changing next road to green
    Then After 5s, the first road has red light
    And Another the perpendicular road has green light

