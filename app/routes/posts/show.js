import Ember from 'ember';
import ajax from 'ic-ajax';

export default Ember.Route.extend({
  model(params) {
    return ajax(`/api/posts/${params.id}`);
  }
});
