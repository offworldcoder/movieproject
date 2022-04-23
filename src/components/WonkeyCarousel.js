import { Lightning, Router } from "@lightningjs/sdk";

export class WonkeyCarousel extends Lightning.Component {
  static _template() {
    return {
      Background: {
        rect: true,
        w: 1920,
        h: 500,
        color: 0xaa222222
      },
      Results: {
        y: 200,
        mountY: 0.5,
        children: this.bindProp('movies')
      }
    }
  }

  _init() {
    this.index = 3;
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
    this.itemPositions = [];
    for (let i = 0; i < 7; i++) {
      const angle = -180 + i * (180 / 6);
      const x = (1600 / 2) + (1200 / 2) * Math.cos(this.degToRad(angle));
      const y = 350 * Math.sin(this.degToRad(angle));
      const duration = 0.2;
      this.itemPositions.push({
        smooth: {
          x: [x, { duration: duration }],
          y: [y, { duration: duration }],
          rotation: [this.degToRad(-30 + i * 10), { duration: duration }]
        }
      })
    }

    const numItemsOnScreen = this.itemPositions.length;
    const numChildren = this.tag("Results").children.length;
    for (let idx = 0; idx < numChildren; idx++) {
      if (idx < numItemsOnScreen) {
        this.tag("Results").children[idx].patch(this.itemPositions[idx]);
      } else {
        this.tag("Results").children[idx].patch(this.itemPositions[this.itemPositions.length - 1]);
      }
    }
  }

  _handleLeft() {
    if (this.moving || this.index === 0) {
      return;
    }
    this.index--;
    this.updateItemFocusAfterMovingLeft();
  }

  _handleRight() {
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
    Router.navigate(`details/${movieId}`);
  }

  updateItemFocusAfterMovingLeft() {
    const children = this.tag("Results").children;
    const max = children.length - 5;
    let { leftMost, rightMost } = this.getLeftRightBoundaries(this.index, max);

    this.highlightCursor();

    if (this.index < 2 || leftMost >= max - 1) {
      return;
    }

    for (let idx = children.length - 1; idx >= 0; idx--) {
      if (idx > rightMost) {
        children[idx].patch(
          this.itemPositions[this.itemPositions.length - 1]
        );
      } else {
        if (idx - leftMost > -1) {
          console.log(`idx ${idx} leftMost ${leftMost} idx - leftMost ${idx - leftMost}`);
          children[idx].patch(
            this.itemPositions[idx - leftMost]
          );
        }
      }
    }
  }

  getLeftRightBoundaries(index, max) {
    let leftMost = index > 3 ? index - 3 : 0;
    leftMost = leftMost < max ? leftMost : max;
    const rightMost = leftMost + 6;
    return { leftMost, rightMost };
  }

  updateItemFocusAfterMovingRight() {
    this.highlightCursor();

    const children = this.tag("Results").children;
    const max = children.length - 5;
    let { leftMost, rightMost } = this.getLeftRightBoundaries(this.index, max);

    if (leftMost == 0 || leftMost >= max - 1) {
      return;
    }

    for (let idx = 0; idx < children.length; idx++) {
      if (idx < leftMost) {
        children[idx].patch(
          this.itemPositions[0]
        );
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
        const z = i < this.index ? this.index : children.length - i;
        item.patch({
          smooth: { scale: 1.0 },
          zIndex: z,
        })
      }
      else {
        item.patch({
          smooth: { scale: 1.5 },
          zIndex: 100,
        })
      }
    }
  }
}