Feature: Spanish crossroads
  For Spainsh crossroads delay is smaller

  Scenario: Changing the lights
    Given One road has green lights
    When Changing another road to green
    Then After 4s, the first road has red light
    And Another the perpendicular road has green light

