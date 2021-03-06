import Ember from 'ember';

/**
 * A list of spaces. Container for spaces-accordion-items.
 * @module components/spaces-accordion
 * @author Jakub Liput
 * @copyright (C) 2016 ACK CYFRONET AGH
 * @license This software is released under the MIT license cited in 'LICENSE.txt'.
 */
export default Ember.Component.extend({
    store: Ember.inject.service('store'),
    classNames: ['secondary-accordion', 'spaces-accordion', 'accordion-content'],

    /** If true, the createNewSpace button is a input field */
    createNewSpaceEditing: false,

    isSavingSpace: false,
    createNewSpaceName: null,

    spaces: null,
    spacesSorting: ['isDefault:desc', 'name'],
    spacesSorted: Ember.computed.sort('spaces', 'spacesSorting'),

    isLoading: Ember.computed.alias('spaces.isUpdating'),

    unsupportSpaceSpacet: null,
    unsupportSpaceProvider: null,
    isUnsupportModalOpened: false,
    isJoinSpaceModalOpened: false,

    actions: {
      openModal() {
        this.sendAction('openModal', ...arguments);
      },

      startCreateNewSpace: function() {
        this.set('createNewSpaceName', null);
        if (!this.get('createNewSpaceEditing')) {
          this.set('createNewSpaceEditing', true);
        }
        let $input = this.$('#create-new-space-name');
        $input.focus();
      },

      // TODO: this should be invoked when pressing Esc when in editing mode
      // TODO: maybe create a global object, in which any cancel action can be registered
      // TODO: eg. service('cancel').register(fun);
      cancelCreateNewSpace: function() {
        if (this.get('createNewSpaceEditing')) {
          this.set('createNewSpaceEditing', false);
        }
      },

      endCreateNewSpace: function(spaceName) {
        if (spaceName) {
          this.set('isSavingSpace', true);
          let store = this.get('store');
          let space = store.createRecord('space', {
            name: spaceName,
          });
          // TODO: handle errors
          let savingSpace = space.save();
          savingSpace.finally(() => {
            this.setProperties({
              isSavingSpace: false,
              createNewSpaceEditing: false,
            });
          });
        }
      },

      startJoinSpace() {
        this.set('isJoinSpaceModalOpened', true);
      },

      showUnsupportSpaceModal(space, provider) {
        this.setProperties({
          isUnsupportModalOpened: true,
          unsupportSpaceSpace: space,
          unsupportSpaceProvider: provider
        });
      },
    },

});
