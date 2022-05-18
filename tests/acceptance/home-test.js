import { module, test } from 'qunit';
import { visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Acceptance | home', function (hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('visiting /', async function (assert) {
    assert.expect(3);

    this.server.create('story', { id: 1 });
    this.server.create('story', { id: 2 });

    await visit('/');

    assert.dom('nav').exists('navbar exists');

    assert.dom('[data-test-stories]').exists('Stories exist');

    assert.dom('[data-test-story]').exists({ count: 2 });
  });
});
