import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'ember-crud/tests/helpers/start-app';

module('Acceptance | posts/edit', {
  beforeEach: function() {
    this.application = startApp();
  },

  afterEach: function() {
    Ember.run(this.application, 'destroy');
  }
});

test('Posts can be edited', function(assert) {
  let post = server.create('post', { slug: 'post-1' });
  visit(`/posts/${post.slug}/edit`);

  andThen(function() {
    assert.equal($('input[type=checkbox][value=news]').prop('checked'), true, 'news checkbox in not checked');
    assert.equal($('input[type=checkbox][value=announcements]').prop('checked'), false, 'announcements checkbox in not checked');
    assert.equal($('input[type=checkbox][value=videos]').prop('checked'), false, 'videos checkbox in not checked');
    assert.equal(currentURL(), `/posts/${post.slug}/edit`);
    assert.ok(find('button:contains(Save)').length === 1, 'edit button is visible');
    assert.ok(find('button:contains(Discard)').length === 1, 'discard button is visible');
  });

  fillIn('#title', 'New title');
  fillIn('#content', 'This is new content');
  click('input[type=checkbox][value=announcements]');

  andThen(function() {
    assert.equal($('#title').val(), 'New title', 'title has been changed');
    assert.equal($('#content').val(), 'This is new content', 'content has been changed');
    assert.equal($('input[type=checkbox][value=news]').prop('checked'), true, 'news checkbox in checked');
    assert.equal($('input[type=checkbox][value=announcements]').prop('checked'), true, 'announcements checkbox in not checked');
    assert.equal($('input[type=checkbox][value=videos]').prop('checked'), false, 'videos checkbox in not checked');
  });

  click('button:contains(Save)');
  andThen(function() {
    assert.equal(currentURL(), `/posts/${post.slug}`, 'post was displayed after saving');
  });
});
