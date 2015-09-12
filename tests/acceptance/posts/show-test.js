import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'ember-crud/tests/helpers/start-app';

module('Acceptance | posts/show', {
  beforeEach: function() {
    this.application = startApp();
  },

  afterEach: function() {
    Ember.run(this.application, 'destroy');
  }
});

test('Posts are displayed', function(assert) {
  let post = server.create('post', { slug: 'post-1' });
  visit(`/posts/${post.slug}`);

  andThen(function() {
    assert.equal(currentURL(), `/posts/${post.slug}`);
    assert.ok(find('button:contains(Edit)').length === 1, 'edit button is visible');
    assert.ok(find('button:contains(Delete)').length === 1, 'delete button is visible');
  });
});
