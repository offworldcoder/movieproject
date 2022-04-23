import { Lightning, Utils } from "@lightningjs/sdk";

export class CarouselItem extends Lightning.Component {
  static _template() {
    return {
      movieId: this.bindProp("movideId"),
      flexItem: { margin: 10 },
      w: 300,
      h: 455,
      color: 0xff000000,
      rect: true,
      Filler: {
        rect: true,
        x: 2,
        y: 2,
        w: 296,
        h: 451,
        color: 0xffaaaaaa,
      },
      Image: {
        x: 20,
        y: 20,
        w: 254,
        h: 381,
        src: this.bindProp('imageUrl')
      },
      Title: {
        x: 150,
        y: 410,
        mountX: 0.5,
        text: {
          fontSize: 25,
          text: this.bindProp('title')
        }
      }
    }
  }
}