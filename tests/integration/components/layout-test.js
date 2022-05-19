import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | layout', function (hooks) {
  setupRenderingTest(hooks);

  const TEMPLATE = hbs`<Layout>blocktext</Layout>`;

  test('it renders navbar', async function (assert) {
    assert.expect(1);

    await render(TEMPLATE);

    assert.dom('[data-test-navbar]').exists('navbar is rendered');
  });

  test('it renders block text', async function (assert) {
    assert.expect(1);

    await render(TEMPLATE);

    assert.dom('[data-test-layout__block]').hasText('blocktext');
  });

  test('it renders footer', async function (assert) {
    assert.expect(1);

    await render(TEMPLATE);

    assert.dom('[data-test-footer]').exists('footer is rendered');
  });
});
