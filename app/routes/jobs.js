import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class JobsRoute extends Route {
  @service catalogue;

  queryParams = {
    page: {
      as: 'p',
      refreshModel: true,
    },
  };

  async model({ page }) {
    const stories = await this.catalogue.fetchStoriesOnPage(page, 'jobs');
    return stories;
  }
}
