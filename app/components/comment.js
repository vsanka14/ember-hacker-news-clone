import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class Comment extends Component {
  @tracked isCollapsed = false;

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
    return !!this.args.next;
  }

  @action
  scrollToComment(id) {
    console.log('called');
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth' });
  }

  @action
  toggleCommentVisibility() {
    console.log('called');
    this.isCollapsed = !this.isCollapsed;
  }
}
