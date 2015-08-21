import Ember from 'ember';

const { A } = Ember;
const { isNumeric } = Ember.$;

export default function() {

  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */
  this.namespace = 'api';    // make this `api`, for example, if your API is namespaced
  this.timing = 1000;        // delay for each request, automatically set to 0 during testing

  /*
    Route shorthand cheatsheet
  */

  // Collections
  this.get('/posts', 'posts');

  // Single objects
  this.get('/posts/:id', function(db, request){
    const { id } = request.params;
    const key = isNumeric(id) ? 'id' : 'slug';
    const [ post ] = new A(db.posts).filterBy(key, id);
    return {
      post: post
    };
  });

  /* POST shorthands */

  this.post('/posts', 'post'); // specify the type of resource to be created

  /*
    PUT shorthands
    */
    this.put('/posts/:id', 'post');
  /*
    this.put('/contacts/:id', 'user'); // specify the type of resource to be updated
  */

  /* DELETE shorthands */
    this.del('/posts/:id', 'post'); // specify the type of resource to be deleted

  /*
    // Single object + related resources. Make sure parent resource is first.
    this.del('/contacts/:id', ['contact', 'addresses']);
  */

  /*
    Function fallback. Manipulate data in the db via

      - db.{collection}
      - db.{collection}.find(id)
      - db.{collection}.where(query)
      - db.{collection}.update(target, attrs)
      - db.{collection}.remove(target)

    // Example: return a single object with related models
    this.get('/contacts/:id', function(db, request) {
      var contactId = +request.params.id;

      return {
        contact: db.contacts.find(contactId),
        addresses: db.addresses.where({contact_id: contactId});
      };
    });

  */
}

/*
You can optionally export a config that is only loaded during tests
export function testConfig() {

}
*/
