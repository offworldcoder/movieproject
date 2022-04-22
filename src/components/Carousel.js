import { Lightning } from "@lightningjs/sdk";

export class Carousel extends Lightning.Component {
  static _template() {
    return {
      Background: {
        w: 500,
        h: 800,
        color: 0xff222222
      },
      Results: {
        rect: true,
        color: 0xff111111,
        flex: {
          direction: 'column',
          padding: 20,
        },
        children: this.bindProp('movies')
      }
    }
  }
}