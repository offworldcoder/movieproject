import { Lightning } from "@lightningjs/sdk";

export class NotFound extends Lightning.Component {
  static _template() {
    return {
      Background: {
        rect: true,
        w: 1920,
        h: 1080,
        color: 0xffffff00
      }
    }
  }
}