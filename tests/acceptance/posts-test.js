import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'ember-crud/tests/helpers/start-app';

module('Acceptance | posts', {
  beforeEach: function() {
    this.application = startApp();
  },

  afterEach: function() {
    Ember.run(this.application, 'destroy');
  }
});

test('visiting /posts', function(assert) {
  let   categories = [
      { id: 'news', name: 'News' },
      { id: 'announcements', name: 'Announcements' },
      { id: 'videos', name: 'Videos' }
    ]
  server.createList('post', 10);
  visit('/posts');

  andThen(function() {
    assert.equal(currentURL(), '/posts');
    assert.equal($('.post').length, 10, '10 posts desplayed');
  });

});
