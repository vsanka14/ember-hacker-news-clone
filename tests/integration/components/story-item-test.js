import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | story-item', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.set('index', 1);
    this.set('title', 'Lorem Ipsum');
    this.set('url', 'https://foobar.com');
    this.set('score', 100);
    this.set('by', 'John Doe');
    this.set('time', Date.now());
    this.set('descendants', 50);
    this.set('id', 4200);
    this.set('isVisible', true);
    this.set('toggleItemVisibility', () => {});
    this.set('isHeader', false);
  });

  const TEMPLATE = hbs`
    <StoryItem 
      @index={{this.index}}
      @title={{this.title}}
      @url={{this.url}}
      @score={{this.score}}
      @by={{this.by}}
      @time={{this.time}}
      @descendants={{this.descendants}}
      @id={{this.id}}
      @isVisible={{this.isVisible}}
      @toggleItemVisibility={{this.toggleItemVisibility}}
      @isHeader={{this.isHeader}}
    />
  `;

  test('it renders index if @isHeader is false', async function (assert) {
    assert.expect(2);

    this.set('index', 1);

    await render(TEMPLATE);

    assert.dom('[data-test-story-item__index]').exists('index exists');

    assert.dom('[data-test-story-item__index]').hasText('1.');
  });

  test('it does not render index if @isHeader is true', async function (assert) {
    assert.expect(1);

    this.set('isHeader', true);
    this.set('index', 1);

    await render(TEMPLATE);

    assert
      .dom('[data-test-story-item__index]')
      .doesNotExist('index does not exist');
  });

  test('it renders url if present', async function (assert) {
    assert.expect(1);

    this.set('url', 'https://foobar.com');

    await render(TEMPLATE);

    assert.dom('[data-test-story-item__url]').hasText('(foobar.com)');
  });

  test('it does not render url if not present', async function (assert) {
    assert.expect(1);

    this.set('url', undefined);

    await render(TEMPLATE);

    assert.dom('[data-test-story-item__url]').doesNotExist();
  });

  test('it renders points', async function (assert) {
    assert.expect(1);

    this.set('score', '100');

    await render(TEMPLATE);

    assert.dom('[data-test-story-item__score]').hasText('100 points');
  });

  test('it renders by link', async function (assert) {
    assert.expect(2);

    this.set('by', 'johndoe');

    await render(TEMPLATE);

    assert.dom('[data-test-story-item__by]').hasText('johndoe');

    assert
      .dom('[data-test-story-item__by]')
      .hasAttribute('href', '/user?id=johndoe');
  });

  test('it invokes @toggleItemVisibility on clicking hide btn', async function (assert) {
    assert.expect(2);

    this.set('id', 123);
    this.set('toggleItemVisibility', (bool) =>
      assert.step(`Invoked toggleItemVisibility with ${bool}`)
    );

    await render(TEMPLATE);

    await click('[data-test-story-item__hide-btn]');

    assert.verifySteps(['Invoked toggleItemVisibility with 123']);
  });
});
