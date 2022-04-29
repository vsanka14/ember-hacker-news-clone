import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class Stories extends Component {
  @service catalogue;

  @service router;

  get isMoreBtnVisible() {
    return this.args.stories.length > 0;
  }

  get visibleStories() {
    return this.args.stories.filter((story) => story.isVisible);
  }

  /**
   * Constant to increment the index of each story item by
   * 1st page: 1, 2nd page: 31, 3rd page: 61 and so on
   */
  get indexIncrementor() {
    return (this.args.page - 1) * 30 + 1;
  }

  get nextPage() {
    return this.args.page + 1;
  }

  get isNoStoryFound() {
    return this.args.stories.length === 0;
  }
}
