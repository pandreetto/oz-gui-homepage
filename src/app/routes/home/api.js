import PageBase from './_page-base';
import Ember from 'ember'; 

export default PageBase.extend({
  name: 'api',

  model() {
    // FIXME: ajax and parse JSON
    // $.ajax({
    //   url: 'https://onedata.org/docs/doc/swagger/versions.json'
    // });
    return new Ember.RSVP.Promise(resolve => resolve({
      "default": "3.0.0-rc11",
      "order": [
        "3.0.0-rc9",
        "3.0.0-rc10",
        "3.0.0-rc11"
      ],
      "versions": {
        "3.0.0-rc10": {
          "changelog": ""
        },
        "3.0.0-rc9": {
          "changelog": ""
        }
      },
      "components": [
        {
          "name": "Onezone",
          "description": "Onezone API allows to control all aspects of a Onedata zone, including user, group, space and provider management."
        },
        {
          "name": "Oneprovider",
          "description": "Oneprovider API allows to access data and control data transfers and provides extensive metadata functionality."
        },
        {
          "name": "Onepanel",
          "description": "Onepanel API provides administration interface for managing Onezone and Oneprovider instances, it is available on each host where either of these service is running."
        },
        {
          "name": "LUMA",
          "description": "LUMA API allows mapping of local user names on storage resources to global users ID's in Onedata"
        }
      ]
    }));
  },

  afterModel(model) {
    return this._super(model);
  },

  setupController(controller, model) {
    this._super(controller, model);
    // FIXME: after model resolve, set default version and component in controller
  }
});
