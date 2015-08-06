import Ember from 'ember';
import ComponentHooksLoggin from 'ember-crud/mixins/component-hooks-loggin';

const { Component } = Ember;

export function initialize() {
  Component.reopen(ComponentHooksLoggin);
}

export default {
  name: 'instrumentation',
  initialize: initialize
};
