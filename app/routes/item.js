import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ItemRoute extends Route {
  @service catalogue;

  queryParams = {
    id: {
      refreshModel: false,
    },
  };

  async model({ id }) {
    const story = await this.catalogue.fetchItem(id, 'story');
    const comments = await this.catalogue.fetchItemsOnPage(
      story.kids,
      'comment'
    );
    return { story, comments };
  }
}
