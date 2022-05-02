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
    const item = await this.catalogue.fetchItem(id);
    const comments = await this.catalogue.fetchComments(item.kids);
    console.log({ item });
    return { item, comments };
  }
}
