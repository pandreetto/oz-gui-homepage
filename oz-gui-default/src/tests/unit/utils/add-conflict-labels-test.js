import { expect } from 'chai';
import { describe, it } from 'mocha';
import addConflictLabels from 'oz-worker-gui/utils/add-conflict-labels';

import Ember from 'ember';
const {
  get,
} = Ember;

describe('Unit | Utility | add conflict labels', function() {
  it('adds conflictLabel to array records of the same name', function() {
    const records = [
      {
        id: 'some123a',
        name: 'One',
      },
      {
        id: 'some123b',
        name: 'One',
      },
      {
        id: 'some123c',
        name: 'One',
      },
    ];
    
    addConflictLabels(records);
    
    expect(records).to.have.length(3);
    expect(get(records[0], 'conflictLabel')).to.be.equal('some123a');
    expect(get(records[1], 'conflictLabel')).to.be.equal('some123b');
    expect(get(records[2], 'conflictLabel')).to.be.equal('some123c');
  });
  
  it('adds conflictLabel to groups of array records of the same name', function() {
    const records = [
      {
        id: 'some123a',
        name: 'One',
      },
      {
        id: 'some123b',
        name: 'One',
      },
      {
        id: 'some123a',
        name: 'Two',
      },
      {
        id: 'some123b',
        name: 'Two',
      },
    ];
    
    addConflictLabels(records);
    
    expect(records).to.have.length(4);
    expect(get(records[0], 'conflictLabel')).to.be.equal('some123a');
    expect(get(records[1], 'conflictLabel')).to.be.equal('some123b');
    expect(get(records[2], 'conflictLabel')).to.be.equal('some123a');
    expect(get(records[3], 'conflictLabel')).to.be.equal('some123b');
  });
  
  it('does not add conflictLabel for default id', function() {
    const records = [
      {
        id: 'some123a',
        name: 'One',
      },
      {
        id: 'some123b',
        name: 'One',
      },
    ];
    
    addConflictLabels(records, 'name', 'id', 'some123a');
    
    expect(get(records[0], 'conflictLabel')).to.be.null;
    expect(get(records[1], 'conflictLabel')).to.be.equal('some123b');
  });
  
  it('can use custom property for checking conflict', function() {
    const records = [
      {
        id: 'some123a',
        name: 'Uno',
        something: 'One',
      },
      {
        id: 'some123b',
        name: 'Duo',
        something: 'One',
      },
    ];
    
    addConflictLabels(records, 'something', 'id');
    
    expect(get(records[0], 'conflictLabel')).to.equal('some123a');
    expect(get(records[1], 'conflictLabel')).to.equal('some123b');
  });
  
  it('can use custom property for resolving conflict', function() {
    const records = [
      {
        id: 'some123a',
        otherId: 'other123a',
        name: 'One',
      },
      {
        id: 'some123b',
        otherId: 'other123b',
        name: 'One',
      },
    ];
    
    addConflictLabels(records, 'name', 'otherId');
    
    expect(get(records[0], 'conflictLabel')).to.equal('other123a');
    expect(get(records[1], 'conflictLabel')).to.equal('other123b');
  });
  
  it('does not add conflictLabel if there are no conflicts', function() {
    const records = [
      {
        id: 'some123a',
        name: 'One',
      },
      {
        id: 'some123b',
        name: 'Two',
      },
    ];
    
    addConflictLabels(records);
    
    expect(get(records[0], 'conflictLabel')).to.be.not.ok;
    expect(get(records[1], 'conflictLabel')).to.be.not.ok;
  });

});
