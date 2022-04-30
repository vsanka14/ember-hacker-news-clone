import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class CommentThread extends Component {
  @action
  bringToFocus(id) {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth' });
  }
}
