import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('posts', function(){
    this.route('new');
    this.route('edit', {path: ':id/edit'});
  });
});

export default Router;
