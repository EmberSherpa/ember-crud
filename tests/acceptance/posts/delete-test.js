import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'ember-crud/tests/helpers/start-app';

module('Acceptance | posts/delete', {
  beforeEach: function() {
    this.application = startApp();
  },

  afterEach: function() {
    Ember.run(this.application, 'destroy');
  }
});

test('post can be deleted', function(assert) {
  let post = server.create('post', { title: 'foo', slug: 'post-1' });
  let deleteWasCalled;
  server.del(`/posts/${post.id}`, function(){
    deleteWasCalled = true;
  });

  visit(`/posts/${post.slug}/delete`);
  andThen(function() {
    assert.equal(currentURL(), `/posts/${post.slug}/delete`);
    assert.equal(find('.test-question').text(), 'Are you sure you want to delete post called "foo"?', 'question show title');
    assert.ok(find('button:contains(Do it!)'), 'confirmation button is visible');
  });
  click('button:contains(Do it!)');
  andThen(function(){
    assert.ok(deleteWasCalled, 'delete operation was called');
    assert.equal(currentURL(), '/posts', 'user was taken to posts after delete');
  });
  
});
