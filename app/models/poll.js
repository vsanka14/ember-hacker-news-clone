import { tracked } from '@glimmer/tracking';

export default class Poll {
  @tracked isVisible;

  constructor({
    by,
    id,
    descendants,
    kids,
    parts,
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
    this.parts = parts;
    this.score = score;
    this.time = time;
    this.title = title;
    this.type = type;
    this.url = url;
    this.text = text;
    this.isVisible = true;
  }
}
