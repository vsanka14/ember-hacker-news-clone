import { Factory } from 'miragejs';

export default Factory.extend({
  by() {
    return `user-${Math.floor(Math.random() * 100)}`;
  },

  id(i) {
    return i;
  },

  score() {
    return Math.floor(Math.random() * 100);
  },

  title(i) {
    return `Job ${i}`;
  },

  text() {
    return 'foo bar baz';
  },

  time() {
    return Date.now();
  },

  type() {
    return 'job';
  },

  url() {
    return 'https://www.foo.com';
  },

  isVisible() {
    return true;
  },
});
