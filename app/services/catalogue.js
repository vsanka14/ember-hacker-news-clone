import Service from '@ember/service';
import Story from 'hacker-news-clone/models/story';
import Comment from 'hacker-news-clone/models/comment';
import User from 'hacker-news-clone/models/user';
import Poll from 'hacker-news-clone/models/poll';
import PollOpt from 'hacker-news-clone/models/poll-opt';
import Job from 'hacker-news-clone/models/job';
import fetch from 'fetch';

const baseURL = 'https://hacker-news.firebaseio.com/v0';

const ITEM_TYPES = {
  STORY: 'story',
  COMMENT: 'comment',
  JOB: 'job',
  POLL: 'poll',
  POLL_OPT: 'pollopt',
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
   * Fetches API response for a HN item of type: "story" | "comment" | "poll" | "poll_opt" | "job"
   * @param {number} id: item id
   * @returns {Promise} Promise resolving to a HN item
   */
  async fetchItem(id) {
    try {
      const url = `${baseURL}/item/${id}.json`;
      const response = await fetch(url);
      const json = await response.json();
      const { type } = json;

      switch (type) {
        case ITEM_TYPES.STORY:
          return new Story(json);
        case ITEM_TYPES.COMMENT:
          if (!json.text) return;
          json.replies = await this.fetchItems(json.kids);
          return new Comment(json);
        case ITEM_TYPES.JOB:
          return new Job(json);
        case ITEM_TYPES.POLL:
          json.options = await this.fetchItems(json.parts);
          return new Poll(json);
        case ITEM_TYPES.POLL_OPT:
          return new PollOpt(json);
        default:
          console.error(`Could not fetch item for invalid type ${type}`);
          return;
      }
    } catch (err) {
      console.error(`Could not fetch item API response for ${id}`, err);
    }
  }

  /**
   * Fetches API response for a user
   * @param {number} id: user id
   * @returns {Promise} Promise resolving to user object
   */
  async fetchUser(id) {
    try {
      const url = `${baseURL}/user/${id}.json`;
      const response = await fetch(url);
      const json = await response.json();
      return new User(json);
    } catch (err) {
      console.error(`Could not fetch user API response for ${id}`, err);
    }
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
  async fetchItems(ids) {
    const items = [];

    if (!ids) return items;

    for (const id of ids) {
      const item = await this.fetchItem(id);
      if (item) items.push(item);
    }

    return items;
  }

  /**
   * Traverse through list of comments to get numberOfReplies on each comment and make prev, root, next associations
   * @param {Array} comments: array of comments
   * @returns {Array} Array of comments with numberOfReplies, prev, root, next on each comment object
   */
  traverseComments(comments) {
    for (let i = 0; i < comments.length; i++) {
      const [comment, nextComment, previousComment] = [
        comments[i],
        comments[i + 1],
        comments[i - 1],
      ];
      comment.next = nextComment ? nextComment.id : null;
      comment.prev = previousComment ? previousComment.id : null;
      traverseComment(comment, comment.id);
    }

    function traverseComment(comment, root) {
      if (!comment) return;

      let count = 1;
      for (const reply of comment.replies) {
        count += traverseComment(reply, root);
      }
      comment.numberOfComments = count;
      comment.root = comment.id !== root ? root : null;
      return count;
    }

    return comments;
  }

  /**
   * Fetch all the comments on a story
   * @param {Array} commentIds: Array of all comment ids on a story
   * @returns Array of all comments on the story
   */
  async fetchComments(commentIds) {
    const comments = await this.fetchItems(commentIds);
    this.traverseComments(comments);
    return comments;
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
    const stories = await this.fetchItems(storyIds);
    return stories;
  }
}
