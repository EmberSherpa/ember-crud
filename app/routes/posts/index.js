// BEGIN-SNIPPET routes.posts.index
import Ember from 'ember';
import ajax from 'ic-ajax';

export default Ember.Route.extend({
  model() {
    return ajax('/api/posts');
  }
});
// END-SNIPPET
