import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'ember-crud/tests/helpers/start-app';

module('Acceptance | posts/new test', {
  beforeEach: function() {
    this.application = startApp();
  },

  afterEach: function() {
    Ember.run(this.application, 'destroy');
  }
});

test('New posts can be created', function(assert) {
  visit('/posts/new');

  andThen(function() {
    assert.equal(currentURL(), '/posts/new');
    assert.equal($('input[type=text]').val(), '', 'title input is empty');
    assert.equal($('textarea').val(), '', 'content textarea is empty');
    assert.equal($('input[type=checkbox][value=news]').prop('checked'), false, 'news checkbox in not checked');
    assert.equal($('input[type=checkbox][value=announcements]').prop('checked'), false, 'announcements checkbox in not checked');
    assert.equal($('input[type=checkbox][value=videos]').prop('checked'), false, 'videos checkbox in not checked');
    assert.ok(find('button:contains(Create)'), 'create button is visible');
  });
  Ember.run(() => {
    fillIn('#title', 'foo');
  });
  fillIn('#content', 'bar');
  click('input[type=checkbox][value=news]');
  keyEvent('input[type=text]', 'change', 13);

  andThen(function() {
    assert.equal($('#title').val(), 'foo', 'foo has been entered into input');
    assert.equal($('#content').val(), 'bar', 'bar has been entered into textarea');
    assert.equal($('input[type=checkbox][value=news]').prop('checked'), true, 'news checkbox in checked');
    assert.equal($('input[type=checkbox][value=announcements]').prop('checked'), false, 'announcements checkbox in not checked');
    assert.equal($('input[type=checkbox][value=videos]').prop('checked'), false, 'videos checkbox in not checked');
  });

  click('button:contains(Create)');

  andThen(function() {
    assert.equal(currentURL(), '/posts/new', 'user was taken to "posts/new" after saving');
  });

});
