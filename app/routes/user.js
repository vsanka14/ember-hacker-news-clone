import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class UserRoute extends Route {
  @service catalogue;

  queryParams = {
    id: {
      refreshModel: false,
    },
  };

  async model({ id }) {
    const user = await this.catalogue.fetchItem(id, 'user');
    return user;
  }
}
