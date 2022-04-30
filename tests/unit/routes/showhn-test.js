import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | showhn', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:showhn');
    assert.ok(route);
  });
});
