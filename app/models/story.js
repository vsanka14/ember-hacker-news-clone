import { tracked } from '@glimmer/tracking';

export default class Story {
  @tracked isVisible;

  constructor({
    by,
    id,
    descendants,
    kids,
    score,
    time,
    title,
    type,
    url,
    text,
  }) {
    this.by = by;
    this.id = id;
    this.descendants = descendants;
    this.kids = kids;
    this.score = score;
    this.time = time;
    this.title = title;
    this.type = type;
    this.url = url;
    this.text = text;
    this.isVisible = true;
  }
}
