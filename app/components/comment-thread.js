import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class CommentThread extends Component {
  @tracked focusedId;

  @action
  bringToFocus(id) {
    this.focusedId = id;
  }
}
