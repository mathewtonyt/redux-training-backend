'use strict';

var _immutable = require('immutable');

var _chai = require('chai');

var _reducer = require('../../src/reducer');

var _reducer2 = _interopRequireDefault(_reducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mlog = require('mocha-logger');


// mlog.log('reducer object is > ', reducer)

describe('reducer', function () {

    it('handles SET_ENTRIES', function () {
        var initialState = (0, _immutable.Map)();
        var action = { type: 'SET_ENTRIES', entries: ['Trainspotting'] };
        mlog.log('reacher here in the test');
        var nextState = (0, _reducer2.default)(initialState, action);
        mlog.log('next state > ', nextState.toString());
        var expectedResult = (0, _immutable.fromJS)({
            entries: (0, _immutable.fromJS)(['Trainspotting'])
        });
        mlog.log('expectedResult state > ', expectedResult.toString());
        (0, _chai.expect)(nextState.equals(expectedResult)).to.equal(true);
    });

    it('handles NEXT', function () {
        var initialState = (0, _immutable.fromJS)({
            entries: ['Trainspotting', '28 Days Later']
        });
        var action = { type: 'NEXT' };
        var nextState = (0, _reducer2.default)(initialState, action);
        var expectedResult = (0, _immutable.fromJS)({
            vote: {
                pair: ['Trainspotting', '28 Days Later']
            },
            entries: []
        });
        mlog.log('next state > ', nextState.toString());
        mlog.log('expected result =>', expectedResult.toString());
        (0, _chai.expect)(nextState.equals(expectedResult)).to.equal(true);
    });

    it('handles VOTE', function () {
        var initialState = (0, _immutable.fromJS)({
            vote: {
                pair: ['Trainspotting', '28 Days Later']
            },
            entries: []
        });
        var action = { type: 'VOTE', entry: 'Trainspotting' };
        mlog.log('reached here k');
        var nextState = (0, _reducer2.default)(initialState, action);
        var expectedResult = (0, _immutable.fromJS)({
            vote: {
                pair: ['Trainspotting', '28 Days Later'],
                tally: { Trainspotting: 1 }
            },
            entries: []
        });
        mlog.log('next state > ', nextState.toString());
        mlog.log('expected result =>', expectedResult.toString());
        (0, _chai.expect)(nextState.equals(expectedResult)).to.equal(true);
    });

    it('has an initial state', function () {
        var action = { type: 'SET_ENTRIES', entries: ['Trainspotting'] };
        var nextState = (0, _reducer2.default)(undefined, action);
        (0, _chai.expect)(nextState.equals((0, _immutable.fromJS)({
            entries: ['Trainspotting']
        }))).to.equal(true);
    });

    it('can be used with reduce', function () {
        var actions = [{ type: 'SET_ENTRIES', entries: ['Trainspotting', '28 Days Later'] }, { type: 'NEXT' }, { type: 'VOTE', entry: 'Trainspotting' }, { type: 'VOTE', entry: '28 Days Later' }, { type: 'VOTE', entry: 'Trainspotting' }, { type: 'NEXT' }];
        var finalState = actions.reduce(_reducer2.default, (0, _immutable.Map)());

        (0, _chai.expect)(finalState.equals((0, _immutable.fromJS)({
            winner: 'Trainspotting'
        }))).to.equal(true);
    });
});
//# sourceMappingURL=reducer_spec.js.map