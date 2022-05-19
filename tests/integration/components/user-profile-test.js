import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | user-profile', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.set('id', 123);
    this.set('created', Date.now());
    this.set('karma', 50);
    this.set('about', 'Lorem Ipsum');
  });

  const TEMPLATE = hbs`
    <UserProfile 
      @id={{this.id}}
      @created={{this.created}}
      @karma={{this.karma}}
      @about={{this.about}}
    />
  `;

  test('it renders id', async function (assert) {
    assert.expect(1);

    this.set('id', 123);

    await render(TEMPLATE);

    assert.dom('[data-test-user-profile__id]').hasText('123');
  });

  test('it renders karma', async function (assert) {
    assert.expect(1);

    this.set('karma', 50);

    await render(TEMPLATE);

    assert.dom('[data-test-user-profile__karma]').hasText('50');
  });

  test('it renders about', async function (assert) {
    assert.expect(1);

    this.set('about', 'lorem ipsum');

    await render(TEMPLATE);

    assert.dom('[data-test-user-profile__about]').hasText('lorem ipsum');
  });
});
