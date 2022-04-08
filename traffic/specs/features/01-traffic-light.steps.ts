import { defineFeature, loadFeature } from 'jest-cucumber';
import { TrafficLight } from '../../src/traffic-light';

const feature = loadFeature('traffic/specs/features/01-traffic-light.feature');

jest.setTimeout(6000)
defineFeature(feature, (test) => {
  test('Changing to the red light', ({ given, when, then, and }) => {
    let trafficLight: TrafficLight
    let finish: Promise<void>;
    given('The traffic light is green', () => {
      trafficLight = new TrafficLight(false, false, true)
    });

    when('Changing it to red', () => {
      finish = trafficLight.turnToRed()
    });

    then('Yellow light', () => {
      expect(trafficLight).toMatchObject({green: false, yellow: true, red: false})
    });

    and('After 5s, only the red one is on', async () => {
      await finish;
      expect(trafficLight).toMatchObject({green: false, yellow: false, red: true})
    });
  });

  test('Changing to the green light', ({ given, when, then, and }) => {
    let trafficLight: TrafficLight
    let finish: Promise<void>;
    given('The traffic light is red', () => {
      trafficLight = new TrafficLight(true, false, false)
    });

    when('Changing it to green', () => {
      finish = trafficLight.turnToGreen()
    });

    then('Yellow and red light', () => {
      expect(trafficLight).toMatchObject({green: false, yellow: true, red: true})
    });

    and('After 5s, only the green one is on', async () => {
      await finish;
      expect(trafficLight).toMatchObject({green: true, yellow: false, red: false})
    });
  });
});
