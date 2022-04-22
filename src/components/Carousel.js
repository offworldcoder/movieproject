import { Lightning } from "@lightningjs/sdk";

export class Carousel extends Lightning.Component {
  static _template() {
    return {
      Background: {
        rect: true,
        w: 1920,
        h: 1080,
        color: 0xff222222
      },
      Results: {
        rect: true,
        color: 0xff111111,
        flex: {
          direction: 'row',
          padding: 20,
        },
        children: this.bindProp('movies')
      }
    }
  }
}