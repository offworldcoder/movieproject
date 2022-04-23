import { Lightning, Router } from "@lightningjs/sdk";

export class WonkeyCarousel extends Lightning.Component {
  static _template() {
    return {
      Background: {
        rect: true,
        w: 1800,
        h: 500,
        color: 0xaa222222
      },
      Results: {
        y: 250,
        mountY: 0.5,
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

  degToRad(deg) {
    return deg / 180 * Math.PI;
  }

  setupItemPositions() {
    const width = 300;
    const margin = 20;

    this.itemPositions = [];
    for (let i = 0; i < 7; i++) {
      this.itemPositions.push({
        smooth: {
          x: 20 + margin + i * (width + margin),
          y: 0,
          rotation: 0, //this.degToRad(-20 + i * 10)
        }
      })
    }

    const numItemsOnScreen = this.itemPositions.length;
    const numChildren = this.tag("Results").children.length;
    for (let idx = 0; idx < numChildren; idx++) {
      if (idx < numItemsOnScreen) {
        this.tag("Results").children[idx].patch(this.itemPositions[idx]);
      } else {
        this.tag("Results").children[idx].patch({
          x: 1920
        });
      }
    }
  }

  _enable() {
    // this.updateItemFocusAfterMovingRight();
  }

  _handleLeft() {
    if (this.moving || this.index === 0) {
      return;
    }
    this.index--;
    this.updateItemFocusAfterMovingLeft();
  }

  _handleRight() {
    console.log("** _handleRight");
    const children = this.tag("Results").children;
    if (this.moving || this.index === children.length - 1) {
      return;
    }

    console.log("** doing _handleRight");
    this.index++;
    this.updateItemFocusAfterMovingRight();
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

  updateItemFocusAfterMovingLeft() {
    const children = this.tag("Results").children;
    let leftMost = this.index > 2 ? this.index - 2 : 0;
    const max = children.length - 5;
    leftMost = leftMost < max ? leftMost : max;
    const rightMost = leftMost + 6;

    this.highlightCursor();

    console.log(`index ${this.index} leftMost ${leftMost} children.length ${children.length}`);
    if (this.index < 2 || leftMost >= max - 1) {
      return;
    }

    for (let idx = children.length - 1; idx >= 0; idx--) {
      if (idx > rightMost) {
        children[idx].patch({
          smooth: {
            x: 1920,
            rotation: 0
          }
        });
      } else {
        if (idx <= rightMost) {
          children[idx].patch(
            this.itemPositions[idx - leftMost]
          );
        }
      }
    }
  }

  updateItemFocusAfterMovingRight() {
    console.log("* updateItemFocusAfterMovingRight");
    this.highlightCursor();

    const children = this.tag("Results").children;
    let leftMost = this.index > 2 ? this.index - 2 : 0;
    const max = children.length - 5;
    leftMost = leftMost < max ? leftMost : max;
    const rightMost = leftMost + 6;

    console.log(`index ${this.index} leftMost ${leftMost} children.length ${children.length}`);
    if (leftMost == 0 || leftMost >= max) {
      return;
    }

    for (let idx = 0; idx < children.length; idx++) {
      if (idx < leftMost) {
        children[idx].patch({
          smooth: {
            x: -300,
            rotation: 0
          }
        });
      } else {
        if (idx < rightMost) {
          children[idx].patch(
            this.itemPositions[idx - leftMost]
          );
        }
      }
    }
  }

  highlightCursor() {
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
          smooth: { scale: 1.5 },
          zIndex: 2
        })
      }
    }
  }
}