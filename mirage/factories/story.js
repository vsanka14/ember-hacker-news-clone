import { Factory } from 'miragejs';

export default Factory.extend({
  by() {
    return `user-${Math.floor(Math.random() * 100)}`;
  },

  id(i) {
    return i;
  },

  descendants() {
    return Math.floor(Math.random() * 100);
  },

  score() {
    return Math.floor(Math.random() * 100);
  },

  title(i) {
    return `Story ${i}`;
  },

  text() {
    return 'foo bar baz';
  },

  time() {
    return Date.now();
  },

  type() {
    return 'story';
  },

  url() {
    return 'https://www.foo.com';
  },
});
