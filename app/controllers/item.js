import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class ItemController extends Controller {
  get isJobItem() {
    return this.model.item.type === 'job';
  }

  @action
  toggleItemVisibility() {
    this.model.item.isVisible = !this.model.item.isVisible;
  }
}
