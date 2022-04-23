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
        x: margin + i * (width + margin),
        y: i * 10,
        rotation: this.degToRad(i * 5)
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
    this.updateItemFocusAfterMovingRight();
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

        let previousPosition = {
          x: children[children.length - 1].x,
          y: children[children.length - 1].y,
          rotation: children[children.length - 1].rotation,
        }

        if (i > 2 && i < children.length - 3) {
          for (let idx = children.length - 1; idx >= 0; idx--) {
            if (idx == children.length - 1) {
              children[idx].patch({
                smooth: {
                  x: 1920,
                  rotation: 0
                }
              });
            } else {
              let currentPosition = {
                x: children[idx].x,
                y: children[idx].y,
                rotation: children[idx].rotation,
              }
              children[idx].patch({
                smooth: {
                  x: previousPosition.x,
                  y: previousPosition.y,
                  rotation: previousPosition.rotation,
                }
              });
              previousPosition = currentPosition;
            }
          }
        }
      }
    }
  }

  updateItemFocusAfterMovingRight() {
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

        let previousPosition = {
          x: children[0].x,
          y: children[0].y,
          rotation: children[0].rotation,
        }

        if (i >= 2 && i < children.length - 4) {
          for (let idx = 0; idx < children.length; idx++) {
            if (idx == 0) {
              children[idx].patch({
                smooth: {
                  x: -300,
                  rotation: 0
                }
              });
            } else {
              let currentPosition = {
                x: children[idx].x,
                y: children[idx].y,
                rotation: children[idx].rotation,
              }
              children[idx].patch({
                smooth: {
                  x: previousPosition.x,
                  y: previousPosition.y,
                  rotation: previousPosition.rotation
                }
              });
              previousPosition = currentPosition;
            }
          }
        }
      }
    }
  }
}