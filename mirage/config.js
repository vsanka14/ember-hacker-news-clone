export default function () {
  this.get('/topstories.json', (schema) => {
    return schema.stories.all().models.map((item) => item.id);
  });

  this.get('/item/:id', (schema, request) => {
    const id = request.params.id.split('.')[0];
    const item = schema.stories.find(id);
    return item.attrs;
  });
}
