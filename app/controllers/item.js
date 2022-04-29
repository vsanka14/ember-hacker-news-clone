import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class ItemController extends Controller {
  @action
  toggleItemVisibility() {
    this.model.story.isVisible = !this.model.story.isVisible;
  }
}
