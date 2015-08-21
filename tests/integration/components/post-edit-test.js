import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import fillIn from 'ember-crud/tests/helpers/fill-in';

moduleForComponent('post-edit', 'Integration | Component | post edit', {
  integration: true
});

test('yields template', function(assert){
  this.render(hbs`{{#post-edit}}foo-bar{{/post-edit}}`);
  assert.ok(this.$('.row:contains(foo-bar)').length === 1, 'foo-bar was yielded');
});

test('post data is beind displayed', function(assert){
  this.set('post', {
    title: 'foo',
    content: 'bar'
  });
  this.render(hbs`{{#post-edit post=post}}{{/post-edit}}`);

  assert.equal(this.$('input[type=text]').val(), 'foo', 'title is foo');
  assert.equal(this.$('textarea').val(), 'bar', 'content is bar');
});

test('validation', function(assert){
  this.render(hbs`
    {{#post-edit as |component|}}
      <span class="validation">{{if component.isValid 'valid' 'invalid'}}</span>
      <span class="savable">{{if component.isSavable 'savable' 'not savable'}}</span>
    {{/post-edit}}`
  );
  fillIn(this.$('textarea'), 'bar');
  assert.equal(this.$('.validation').text(), 'invalid', 'invalid when no title is enterd');
  assert.equal(this.$('.savable').text(), 'not savable', 'when invalid');

  Ember.run(()=>{
    fillIn(this.$('input[type=text]'), 'foo');
  });

  assert.equal(this.$('.validation').text(), 'valid', 'validition is valid after title was entered');
  assert.equal(this.$('.savable').text(), 'savable', 'savable when valid');
});

// TODO: test that component is not savable when no changes where made
// TODO: test that on-save is called when save action is triggered
// TODO: test that is-loading class is added when saving
// TODO: test catch error handler is called when saving fails
// TODO: test that clicking checkboxes changes list of selected checkboxes
// TODO: test that discard resets the value to original passed in values
