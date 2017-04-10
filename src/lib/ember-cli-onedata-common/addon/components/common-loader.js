import Ember from 'ember';
import layout from 'ember-cli-onedata-common/templates/components/common-loader';

const {
  inject: {
    service
  },
  computed,
  computed: {
    alias
  },
  observer
} = Ember;

/**
 * A global (one instance for application) component for common-loader service.
 * It allows to show loading information with spinner and two lines of text.
 * @module components/common-loader
 * @author Jakub Liput
 * @copyright (C) 2016-2017 ACK CYFRONET AGH
 * @license This software is released under the MIT license cited in 'LICENSE.txt'.
 */
export default Ember.Component.extend({
  layout,
  
  commonLoader: service(),

  classNames: ['common-loader'],
  classNameBindings: ['isLoading::hidden', 'areaClass', 'solidBackground:solid-background:semi-transparent'],

  areaClass: computed('commonLoader.area', function() {
    const _area = this.get('commonLoader.area');
    return `loader-area-${_area}`;
  }),

  area: alias('commonLoader.area'),
  solidBackground: alias('commonLoader.solidBackground'),
  type: alias('commonLoader.type'),
  isLoading: alias('commonLoader.isLoading'),
  message: alias('commonLoader.message'),
  messageSecondary: alias('commonLoader.messageSecondary'),

  // if we turn off loader, reset all properties
  isLoadingChanged: observer('isLoading', function() {
    if (!this.get('isLoading')) {
      this.resetProperties();
    }
  }),

  resetProperties() {
    this.setProperties({
      message: null,
      messageSecondary: null,
      solidBackground: false,
      area: null,
      type: null,
    });
  },

  registerInService: function() {
    this.set('commonLoader.component', this);
  }.on('init'),
});
