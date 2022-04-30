import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class Comment extends Component {
  @tracked isCollapsed = false;

  @action
  toggleCommentVisibility() {
    this.isCollapsed = !this.isCollapsed;
  }

  get isParentBtnVisible() {
    return this.args.parent && this.args.root;
  }

  get isRootBtnVisible() {
    return this.args.root && this.args.parent !== this.args.root;
  }

  get isPreviousBtnVisible() {
    return this.args.prev && this.args.prev !== this.args.parent;
  }

  get isNextBtnVisible() {
    return this.args.next && !this.isCollapsed;
  }
}
