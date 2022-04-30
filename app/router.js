import EmberRouter from '@ember/routing/router';
import config from 'hacker-news-clone/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('home', { path: '/' });
  this.route('item');
  this.route('news');
  this.route('user');
  this.route('newest');
  this.route('ask');
  this.route('show');
  this.route('jobs');
  this.route('showhn');
});
