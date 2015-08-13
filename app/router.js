import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('posts', function(){
    this.route('new');
    this.route('show', { path: ':slug' });
    this.route('edit', { path: ':slug/edit' });
    this.route('delete', { path: ':slug/delete' });
  });
});

export default Router;
