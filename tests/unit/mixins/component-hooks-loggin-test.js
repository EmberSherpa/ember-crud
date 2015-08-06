import Ember from 'ember';
import ComponentHooksLogginMixin from '../../../mixins/component-hooks-loggin';
import { module, test } from 'qunit';

module('Unit | Mixin | component hooks loggin');

// Replace this with your real tests.
test('it works', function(assert) {
  var ComponentHooksLogginObject = Ember.Object.extend(ComponentHooksLogginMixin);
  var subject = ComponentHooksLogginObject.create();
  assert.ok(subject);
});
