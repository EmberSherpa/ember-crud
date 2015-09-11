import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import fillIn from 'ember-crud/tests/helpers/fill-in';
import click from 'ember-crud/tests/helpers/click';

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
  this.render(hbs`{{post-edit post=post}}`);
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
  Ember.run(() =>{
    fillIn(this.$('textarea'), 'bar');
  });
  assert.equal(this.$('.validation').text(), 'invalid', 'invalid when no title is enterd');
  assert.equal(this.$('.savable').text(), 'not savable', 'when invalid');

  Ember.run(()=>{
    fillIn(this.$('input[type=text]'), 'foo');
  });

  assert.equal(this.$('.validation').text(), 'valid', 'validition is valid after title was entered');
  assert.equal(this.$('.savable').text(), 'savable', 'savable when valid');
});

test('component is not savable when no changes where made', function(assert){
  this.set('post', {
    title: 'foo',
    content: 'bar'
  });
  this.render(hbs`
    {{#post-edit post=post as |component|}}
      <span class="savable">{{if component.isSavable 'savable' 'not savable'}}</span>
    {{/post-edit}}`
  );
  fillIn(this.$('textarea'), 'bar');
  Ember.run(()=>{
    fillIn(this.$('input[type=text]'), 'foo');
  });

  assert.equal(this.$('.savable').text(), 'not savable', 'not savable when no changes where made');
});

test('discard resets the value to original passed in values', function(assert){
  assert.expect(7);
  this.set('post', {
    title: 'foo',
    content: 'bar'
  });

  this.render(hbs`
    {{#post-edit post=post as |component|}}
      <div class="discard">
        <button {{action 'discard' target=component}}
                disabled={{component.isUnchanged}}>Discard</button>
      </div>
    {{/post-edit}}`
  );
  assert.equal(this.$('input[type=text]').val(), 'foo', 'origna title is foo');
  assert.equal(this.$('textarea').val(), 'bar', 'original content is bar');

  Ember.run(()=>{
    fillIn(this.$('textarea'), 'barz');
    fillIn(this.$('input[type=text]'), 'fooz');
  });
  assert.equal(this.$('input[type=text]').val(), 'fooz', 'title has been changed to fooz');
  assert.equal(this.$('textarea').val(), 'barz', 'content has been changed to barz');

  var $button = this.$('.discard button');
  assert.equal($button.length, 1, 'discard button exists');
  $button.click();

  assert.equal(this.$('input[type=text]').val(), 'foo', 'title is foo');
  assert.equal(this.$('textarea').val(), 'bar', 'content is bar');
});

test('is-loading class is added when saving', function(assert){
  this.set('isLoading', false);
  this.set('post', {
    title: 'foo',
    content: 'bar'
  });

  this.render(hbs`
    {{#post-edit post=post isLoading=isLoading as |component|}}
    <div class="save">
    <button {{action 'save' target=component}}
    >Save</button>
    </div>
    {{/post-edit}}`);

    this.set('isLoading', true);
    assert.equal(this.$('.is-loading').length, 1, 'On save, is-loading class is added');
});

test('on-save is called when save action is triggered', function(assert){
  assert.expect(2);
  this.set('post', {
    title: 'foo',
    content: 'bar'
  });

  let onSaveCalled;
  this.on('save', (data) => {
    onSaveCalled = true;
    assert.deepEqual(data, {
      categories: [],
      title: 'foo',
      content: 'bar'
    }, 'Correct values received');
    return Ember.RSVP.resolve();
  });

  this.render(hbs`
    {{#post-edit post=post on-save=(action 'save') as |component|}}
      <div class="save">
        <button {{action 'save' target=component}}>Save</button>
      </div>
    {{/post-edit}}`);

    click(this.$('.save button'));

    assert.equal(onSaveCalled, true, 'on-save was called');
});

test('catch error handler is called when saving fails', function(assert){
  assert.expect(2);
  this.set('post', {
    title: 'foo',
    content: 'bar'
  });

  this.on('save', () => {
    return Ember.RSVP.reject('Could not save title');
  });

  this.render(hbs`
    {{#post-edit post=post on-save=(action 'save') as |component|}}
      <div class="save">
        <button {{action 'save' target=component}}>Save</button>
      </div>
      <div class='errors'>{{component.errors}}</div>
    {{/post-edit}}`);

    assert.equal(this.$('.errors').text(), '', 'errors is empty');
    click(this.$('.save button'));
    assert.equal(this.$('.errors').text(), 'Could not save title', 'errors is visible');
});

test('clicking checkboxes changes list of selected checkboxes', function(assert){
  this.set('post', {
    categories: ['news'],
    title: 'foo',
    content: 'bar'
  });
  let blogCategories = [
    { id: 'news', name: 'News' },
    { id: 'announcements', name: 'Announcements' },
    { id: 'videos', name: 'Videos' }
  ];
  this.set('blogCategories', blogCategories);
  this.render(hbs`
    {{#post-edit post=post blogCategories=blogCategories as |component|}}
      <div class='categoryList'>
        {{#each component.categories as |category|}}
          <li>{{category}}</li>
        {{/each}}
      </div>
    {{/post-edit}}
    `);
  assert.equal(this.$('input[type=checkbox][value=news]').prop('checked'), true, 'news category is checked');
  assert.equal(this.$('input[type=checkbox][value=announcements]').prop('checked'), false, 'announcements category is not checked');
  assert.equal(this.$('input[type=checkbox][value=videos]').prop('checked'), false, 'videos category is not checked');
  Ember.run(() => {
    click(this.$('input[type=checkbox][value=announcements]'));
  });
  assert.equal(this.$('input[type=checkbox][value=announcements]').prop('checked'), true, 'announcements category is checked');
  assert.equal(this.$('.categoryList li:eq(1)').text(), 'announcements', 'announcements category was added');
});
