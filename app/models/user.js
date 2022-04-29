export default class User {
  constructor({ id, created, karma, about, submitted }) {
    this.id = id;
    this.created = created;
    this.karma = karma;
    this.about = about;
    this.submitted = submitted;
  }
}
