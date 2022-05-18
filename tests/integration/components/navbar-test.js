import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | navbar', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`<Navbar />`);

    assert.dom('[data-test-navbar__logo-link]').exists('logo link exists');

    assert
      .dom('[data-test-navbar__logo-link]')
      .hasAttribute('href', '/news?p=1');

    assert.dom('[data-test-navbar__link="new"]').exists('new link exists');

    assert
      .dom('[data-test-navbar__link="new"]')
      .hasAttribute('href', '/newest?p=1');

    assert.dom('[data-test-navbar__link="ask"]').exists('newest link exists');

    assert
      .dom('[data-test-navbar__link="ask"]')
      .hasAttribute('href', '/ask?p=1');

    assert.dom('[data-test-navbar__link="show"]').exists('ask link exists');

    assert
      .dom('[data-test-navbar__link="show"]')
      .hasAttribute('href', '/show?p=1');

    assert.dom('[data-test-navbar__link="jobs"]').exists('jobs link exists');

    assert
      .dom('[data-test-navbar__link="jobs"]')
      .hasAttribute('href', '/jobs?p=1');
  });
});
