import {Map, fromJS, List} from 'immutable'
import {expect} from 'chai'
let mlog = require('mocha-logger')
import reducer from '../../src/reducer'

// mlog.log('reducer object is > ', reducer)

describe('reducer', () => {

    it('handles SET_ENTRIES', () => {
        const initialState = Map();
        const action = { type: 'SET_ENTRIES', entries: ['Trainspotting'] };
        mlog.log('reacher here in the test')
        let nextState = reducer(initialState, action);
        mlog.log('next state > ', nextState.toString())
        let expectedResult = fromJS({
            entries: fromJS(['Trainspotting'])
        });
        mlog.log('expectedResult state > ', expectedResult.toString())
        expect(nextState.equals(expectedResult)).to.equal(true);
    });

    it('handles NEXT', () => {
        const initialState = fromJS({
            entries: ['Trainspotting', '28 Days Later']
        });
        const action = { type: 'NEXT' };
        const nextState = reducer(initialState, action);
        const expectedResult = fromJS({
            vote: {
                pair: ['Trainspotting', '28 Days Later']
            },
            entries: []
        })
        mlog.log('next state > ', nextState.toString())
        mlog.log('expected result =>', expectedResult.toString())
        expect(nextState.equals(expectedResult)).to.equal(true);
    });

    it('handles VOTE', () => {
        const initialState = fromJS({
            vote: {
                pair: ['Trainspotting', '28 Days Later']
            },
            entries: []
        });
        const action = { type: 'VOTE', entry: 'Trainspotting' }
        mlog.log('reached here k')
        const nextState = reducer(initialState, action)
        const expectedResult = fromJS({
            vote: {
                pair: ['Trainspotting', '28 Days Later'],
                tally: { Trainspotting: 1 }
            },
            entries: []
        })
        mlog.log('next state > ', nextState.toString())
        mlog.log('expected result =>', expectedResult.toString())
        expect(nextState.equals(expectedResult)).to.equal(true);
    });

    it('has an initial state', () => {
        const action = { type: 'SET_ENTRIES', entries: ['Trainspotting'] };
        const nextState = reducer(undefined, action);
        expect(nextState.equals(fromJS({
            entries: ['Trainspotting']
        }))).to.equal(true);
    });

    it('can be used with reduce', () => {
        const actions = [
            { type: 'SET_ENTRIES', entries: ['Trainspotting', '28 Days Later'] },
            { type: 'NEXT' },
            { type: 'VOTE', entry: 'Trainspotting' },
            { type: 'VOTE', entry: '28 Days Later' },
            { type: 'VOTE', entry: 'Trainspotting' },
            { type: 'NEXT' }
        ];
        const finalState = actions.reduce(reducer, Map());

        expect(finalState.equals(fromJS({
            winner: 'Trainspotting'
        }))).to.equal(true);
    });

});