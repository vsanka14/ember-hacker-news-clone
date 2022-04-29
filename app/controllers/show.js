import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class ShowController extends Controller {
  @service router;

  /**
   * default value for page query param
   */
  @tracked page = 1;

  constructor() {
    super(...arguments);

    this.router.on('routeDidChange', () => {
      window.scrollTo(0, 0);
    });
  }

  @action
  toggleItemVisibility(id) {
    const story = this.model.find((story) => story.id === id);
    if (!story) return;
    story.isVisible = !story.isVisible;
  }
}
