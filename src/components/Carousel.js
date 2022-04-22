import { Lightning, Router } from "@lightningjs/sdk";

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
    this.moving = false;

    this.tag("Results").transition('x').on('start', () => {
      this.moving = true;
    });

    this.tag("Results").transition('x').on('finish', () => {
      this.moving = false;
    });
  }

  _enable() {
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

  _handleEnter() {
    if (this.moving) {
      return;
    }

    const children = this.tag("Results").children;
    const movieId = children[this.index].movieId;
    console.log(`_handleEnter movieId ${movieId}`);

    Router.navigate(`details/${movieId}`);
  }

  updateItemFocus() {
    const children = this.tag("Results").children;
    for (let i = 0; i < children.length; i++) {
      const item = children[i];
      if (i != this.index) {
        item.patch({
          smooth: { scale: 1.0 },
          zIndex: 1,
        })
      }
      else {
        item.patch({
          smooth: { scale: 1.2 },
          zIndex: 2
        })
        if (i >= 2 && i < children.length - 3) {
          let newCarouselPosition = -(i - 2) * (item.w + 20);
          if (i == children.length - 4) {
            newCarouselPosition -= 40;
          }

          this.tag("Results").patch({
            smooth: {
              x: [newCarouselPosition, { duration: 0.5 }]
            }
          })
        }
      }
    }
  }
}