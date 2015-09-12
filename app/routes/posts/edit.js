// BEGIN-SNIPPET routes.posts.edit
import Ember from 'ember';
import ajax from 'ic-ajax';

export default Ember.Route.extend({
  model(params) {
    return ajax(`/api/posts/${params.slug}`).then(function(response){
      return response.post;
    });
  }
});
// END-SNIPPET
