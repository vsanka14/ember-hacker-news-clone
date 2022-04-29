import Component from '@glimmer/component';

export default class StoryItem extends Component {
  get isNoCommentsOnStory() {
    return this.args.descendants === 0;
  }
}
