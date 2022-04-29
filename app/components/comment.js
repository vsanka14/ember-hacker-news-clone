import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class Comment extends Component {
  @tracked isCollapsed = false;

  @action
  toggleCommentVisibility() {
    this.isCollapsed = !this.isCollapsed;
  }
}
