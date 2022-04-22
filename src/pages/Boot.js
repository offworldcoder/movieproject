import { Lightning, Router, Utils } from "@lightningjs/sdk";

export class Boot extends Lightning.Component {
  static _template() {
    return {
      Background: {
        rect: true,
        w: 1920,
        h: 1080,
        src: Utils.asset('images/background.jpeg')
      }
    }
  }

  _init() {
    Router.navigate('home');
  }
}