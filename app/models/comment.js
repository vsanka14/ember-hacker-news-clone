export default class Comment {
  constructor({
    by,
    id,
    kids,
    parent,
    time,
    type,
    text,
    replies,
    numberOfComments,
  }) {
    this.by = by;
    this.id = id;
    this.kids = kids;
    this.parent = parent;
    this.time = time;
    this.type = type;
    this.text = text;
    this.replies = replies;
    this.numberOfComments = numberOfComments;
  }
}
