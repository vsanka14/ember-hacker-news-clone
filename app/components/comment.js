import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class Comment extends Component {
  @tracked isCollapsed = false;

  @action
  toggleCommentVisibility() {
    this.isCollapsed = !this.isCollapsed;
  }

  get isParentLinkVisible() {
    return this.args.parent && this.args.root;
  }

  get isRootLinkVisible() {
    return this.args.root && this.args.parent !== this.args.root;
  }

  get isPreviousLinkVisible() {
    return this.args.prev && this.args.prev !== this.args.parent;
  }

  get isNextLinkVisible() {
    return !!this.args.next && !this.isCollapsed;
  }
}
