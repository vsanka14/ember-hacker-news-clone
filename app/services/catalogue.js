import Service from '@ember/service';
import Story from 'hacker-news-clone/models/story';
import Comment from 'hacker-news-clone/models/comment';
import User from 'hacker-news-clone/models/user';
import fetch from 'fetch';

const baseURL = 'https://hacker-news.firebaseio.com/v0';

const ITEM_TYPES = {
  story: 'item',
  comment: 'item',
  user: 'user',
};

const STORY_TYPES = {
  top: 'topstories',
  newest: 'newstories',
  best: 'beststories',
  ask: 'askstories',
  show: 'showstories',
  jobs: 'jobstories',
};

export default class CatalogueService extends Service {
  /**
   * Returns object for a HN item like story, comment etc
   * @param {number} id: item id
   * @param {string} type: "story" | "comment"
   * @returns {Promise} Promise resolving to a HN item
   */
  async fetchItem(id, type) {
    try {
      const url = `${baseURL}/${ITEM_TYPES[type]}/${id}.json`;
      const response = await fetch(url);
      const json = await response.json();
      switch (type) {
        case 'story':
          return new Story(json);
        case 'comment':
          if (!json.text) return;
          json.replies = await this.fetchItemsOnPage(json.kids, type);
          json.numberOfComments = this.getCommentsCount(json);
          return new Comment(json);
        case 'user':
          return new User(json);
        default:
          console.error(`Could not fetch item for invalid type ${type}`);
          return;
      }
    } catch (err) {
      console.error(
        `Could not fetch API response for ${id} of type ${type}`,
        err
      );
    }
  }

  /**
   * Returns the number of comments on a comment thread
   * @param {Object} comment: object of model type Comment
   * @returns {number} total number of comments
   */
  getCommentsCount(comment) {
    if (!comment.replies) return 0;

    let count = 1;
    for (const reply of comment.replies) {
      count += this.getCommentsCount(reply);
    }
    return count;
  }

  /**
   * Returns the ids of the stories that have to be rendered on a page
   * @param {number} page: the page query param
   * @param {array} topStories: array of top story item ids
   * @returns {Array} array of ids
   */
  getIdsForStoriesOnPage(page, topStories) {
    const lastItemIndex = page * 30;
    const startItemIndex = lastItemIndex - 30;
    const storyIds = topStories.slice(startItemIndex, lastItemIndex);
    return storyIds;
  }

  /**
   * Returns an array of HN items based on the type for a page
   * @param {Array} ids: item ids
   * @param {string} type: "story" | "comment"
   * @returns {Promise} Promise resolving to an array of HN items
   */
  async fetchItemsOnPage(ids, type) {
    const items = [];

    if (!ids) return items;

    for (const id of ids) {
      const item = await this.fetchItem(id, type);
      if (item) items.push(item);
    }
    return items;
  }

  /**
   * Returns story ids for a particular type from HN API
   * @param {string} type: 'top' | 'newest' | 'ask' | 'show'
   * @returns {Promise} Promise resolving to array of story ids
   */
  async fetchStories(type) {
    try {
      const response = await fetch(`${baseURL}/${STORY_TYPES[type]}.json`);
      const json = await response.json();
      return json;
    } catch (err) {
      console.error(
        `Could not fetch API response for /${STORY_TYPES[type].json}`,
        err
      );
      throw err;
    }
  }

  /**
   * Returns top story items for a page
   * @param {number} page: the page query param
   * @param {string} type: 'top' | 'newest' | 'ask' | 'show'
   * @returns {Promise} Promise resolving to array of story items
   */
  async fetchStoriesOnPage(page, type) {
    const topStories = await this.fetchStories(type);
    const storyIds = this.getIdsForStoriesOnPage(page, topStories);
    const stories = await this.fetchItemsOnPage(storyIds, 'story');
    return stories;
  }
}
