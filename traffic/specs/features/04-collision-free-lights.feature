Feature: Collision-free lights

  Scenario: Changing lights from straight
    Given One road has the green light for straight crossing
    When Changing next light to green
    Then After 5s, all lights are red
    And It stays like that for 2s
    And After 5 seconds, the adjacent collision-free light to the left is green


  Scenario: Changing lights from collision-free light to the left
    Given The two opposite left turn lights are green
    When Changing next light to green
    Then After 5s, all lights are red
    And It stays like that for 2s
    And After 5 seconds, the perpendicular headlights are green


