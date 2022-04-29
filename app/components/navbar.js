import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class Navbar extends Component {
  @service router;

  get currentRouteName() {
    return this.router.currentRouteName;
  }
}
