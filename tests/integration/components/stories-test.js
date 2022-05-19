import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Integration | Component | stories', function (hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(function () {
    const story1 = this.server.create('story', { id: 1 });
    const story2 = this.server.create('story', { id: 2 });
    const story3 = this.server.create('story', { id: 3 });

    this.set('stories', [story1, story2, story3]);
    this.set('isJobsPage', false);
    this.set('page', 1);
    this.set('toggleItemVisibility', () => {});
  });

  const TEMPLATE = hbs`
    <Stories 
      @stories={{this.stories}}
      @isJobsPage={{this.isJobsPage}}
      @page={{this.page}}
      @toggleItemVisibility={{this.toggleItemVisibility}}
    />
  `;

  test('it renders the right number of story items', async function (assert) {
    assert.expect(1);

    const story1 = this.server.create('story', { id: 1 });
    const story2 = this.server.create('story', { id: 2 });
    const story3 = this.server.create('story', { id: 3 });
    this.set('stories', [story1, story2, story3]);

    await render(TEMPLATE);

    assert.dom('[data-test-story-item]').exists({ count: 3 });
  });

  test('it renders the right number of job items if `isJobsPage` is true', async function (assert) {
    assert.expect(1);

    const job1 = this.server.create('job', { id: 1 });
    const job2 = this.server.create('job', { id: 2 });
    const job3 = this.server.create('job', { id: 3 });
    this.set('jobs', [job1, job2, job3]);
    this.set('isJobsPage', true);

    await render(TEMPLATE);

    assert.dom('[data-test-job-item]').exists({ count: 3 });
  });

  test('it renders more button properly', async function (assert) {
    assert.expect(2);

    const router = this.owner.lookup('router:main');
    router.currentRouteName = 'news';
    router.setupRouter();
    this.set('page', 1);

    await render(TEMPLATE);

    assert
      .dom('[data-test-stories__more-btn]')
      .isVisible('more button is visible');

    assert
      .dom('[data-test-stories__more-btn]')
      .hasAttribute('href', `/news?p=2`);
  });

  test('it renders empty state correctly if no stories exist', async function (assert) {
    assert.expect(2);

    this.set('stories', []);

    await render(TEMPLATE);

    assert
      .dom('[data-test-stories__more-btn]')
      .isNotVisible('more button is not visible');
    assert
      .dom('[data-test-stories__no-stories-found]')
      .isVisible('no stories found message is visible');
  });
});
