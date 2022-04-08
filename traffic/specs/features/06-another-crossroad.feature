Feature: Another Crossroad organization
  Another crossroad changes lights in different order

  Scenario: Changing the lights
    Given There is a crossroad with straight and to the left lights
    And One road has green lights fro straight crossing
    When Changing next lights to green
    Then After 5s, the first road has red light
    And After next 5s, the perpendicular road has a green light for a left turn

