import Ember from 'ember';

const {on} = Ember;

export default Ember.Mixin.create({
  instrumentActions: on('init', instrumentActions),
  didInitAttrs: log('didInitAttrs'),
  didReceiveAttrs: log('didReceiveAttrs'),
  willRender: log('willRender'),
  didInsertElement: log('didInsertElement'),
  didUpdateAttrs: log('didUpdateAttrs'),
  willUpdate: log('willUpdate'),
  didUpdate: log('didUpdate'),
  didRender: log('didRender'),
  willDestroyElement: log('willDestroyElement'),
  didDestroyElement: log('didDestroyElement')
});

function log(hook) {
  return function() {
    this._super.apply(this, arguments);
    const name = this.elementId || this.construtor.toString();
    console.log(`${name} called ${hook} hook with`, arguments);
  }
}

function instrumentActions(){
  let actions = this._actions;
  if (!actions) {
    return;
  }
  Object.keys(actions).forEach(function(actionName){
    const callback = actions[actionName];
    actions[actionName] = function() {
      const name = this.elementId || this.construtor.toString();
      console.log(`${name} called action ${actionName} with `, arguments);
      return callback.apply(this, arguments);
    }
  })
}
