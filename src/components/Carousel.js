import { Lightning } from "@lightningjs/sdk";

export class Carousel extends Lightning.Component {
  static _template() {
    return {
      Background: {
        rect: true,
        w: 1920,
        h: 550,
        color: 0xaa222222
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

  _init() {
    this.index = 0;
  }

  _active() {
    this.updateItemFocus();
  }

  _handleLeft() {
    if (this.index === 0) {
      return;
    }
    this.index--;
    this.updateItemFocus();
  }

  _handleRight() {
    const children = this.tag("Results").children;
    if (this.index === children.length - 1) {
      return;
    }

    this.index++;
    this.updateItemFocus();
  }

  updateItemFocus() {
    const children = this.tag("Results").children;
    for (let i = 0; i < children.length; i++) {
      const item = children[i];
      if (i != this.index) {
        item.patch({
          y: 0
        })
      }
      else {
        item.patch({
          y: 20
        })
      }
    }
  }
}