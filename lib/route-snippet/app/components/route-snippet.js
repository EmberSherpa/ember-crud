import Ember from 'ember';
import snippets from 'ember-crud/snippets';

const {
  A
} = Ember;

export default Ember.Component.extend({
  tagName: '',
  didReceiveAttrs() {
    let routePath = this.get('routePath');
    const _snippets = ['route', 'controller', 'template'].map((type)=>{
      const name = this.snippetName(type, routePath);
      if (snippets && snippets[name]) {
        return this.snippet(type, routePath);
      }
    });
    this.set('snippets', new A(_snippets).compact());
  },
  snippet(type, routePath) {
    const name = this.snippetName(type, routePath);
    const path = this.filePath(type, routePath);
    return { name, path, type };
  },
  snippetName(type, path) {
    const names = {
      route: `routes.${path}.js`,
      controller: `controllers.${path}.js`,
      template: `templates.${path}.hbs`
    };
    return names[type];
  },
  filePath(type, routePath) {
    let path = routePath.replace('.', '/');
    const paths = {
      route: `routes/${path}.js`,
      controller: `controllers/${path}.js`,
      template: `templates/${path}.hbs`
    };
    return paths[type];
  }
});
