export class TrafficLight {

  constructor(
    private red: boolean,
    private yellow: boolean,
    private green: boolean
  ) {}

  turnToRed(): Promise<void> {
    this.green = false;
    this.yellow = true;
    return new Promise((resolve) =>
      setTimeout(() => {
        this.yellow = false;
        this.red = true;
        resolve();
      }, 5000)
    );
  }

  turnToGreen(): Promise<void> {
    this.green = false;
    this.yellow = true;
    return new Promise((resolve) =>
      setTimeout(() => {
        this.yellow = false;
        this.red = false;
        this.green = true;
        resolve();
      }, 5000)
    );
  }
}

export interface TrafficLightChangesRecorder {
  record(): void;
}
