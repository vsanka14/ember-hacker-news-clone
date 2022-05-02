export default class Job {
  constructor({ by, id, score, time, title, type, url, text }) {
    this.by = by;
    this.id = id;
    this.score = score;
    this.time = time;
    this.title = title;
    this.type = type;
    this.url = url;
    this.text = text;
    this.isVisible = true;
  }
}
