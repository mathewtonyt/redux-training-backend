import {Map, fromJS} from 'immutable'
import {expect} from 'chai'
let mlog = require('mocha-logger')
import reducer from '../../src/reducer'

// mlog.log('reducer object is > ', reducer)

describe('reducer', () => {

    it.only('handles SET_ENTRIES', () => {
        const initialState = Map();
        const action = { type: 'SET_ENTRIES', entries: ['Trainspotting'] };
        mlog.log('reacher here in the ')
        const nextState = reducer(initialState, action);
        mlog.log('next state > ', nextState.toString())
        expect(nextState).to.equal(fromJS({
            entries: ['Trainspotting']
        }));
    });

    it('handles NEXT', () => {
        const initialState = fromJS({
            entries: ['Trainspotting', '28 Days Later']
        });
        const action = { type: 'NEXT' };
        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            vote: {
                pair: ['Trainspotting', '28 Days Later']
            },
            entries: []
        }));
    });

    it('handles VOTE', () => {
        const initialState = fromJS({
            vote: {
                pair: ['Trainspotting', '28 Days Later']
            },
            entries: []
        });
        const action = { type: 'VOTE', entry: 'Trainspotting' };
        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            vote: {
                pair: ['Trainspotting', '28 Days Later'],
                tally: { Trainspotting: 1 }
            },
            entries: []
        }));
    });

});