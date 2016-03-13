'use strict';

var _immutable = require('immutable');

var _chai = require('chai');

var _reducer = require('../../src/reducer');

var _reducer2 = _interopRequireDefault(_reducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mlog = require('mocha-logger');


// mlog.log('reducer object is > ', reducer)

describe('reducer', function () {

    it.only('handles SET_ENTRIES', function () {
        var initialState = (0, _immutable.Map)();
        var action = { type: 'SET_ENTRIES', entries: ['Trainspotting'] };
        mlog.log('reacher here in the ');
        var nextState = (0, _reducer2.default)(initialState, action);
        mlog.log('next state > ', nextState.toString());
        (0, _chai.expect)(nextState).to.equal((0, _immutable.fromJS)({
            entries: ['Trainspotting']
        }));
    });

    it('handles NEXT', function () {
        var initialState = (0, _immutable.fromJS)({
            entries: ['Trainspotting', '28 Days Later']
        });
        var action = { type: 'NEXT' };
        var nextState = (0, _reducer2.default)(initialState, action);

        (0, _chai.expect)(nextState).to.equal((0, _immutable.fromJS)({
            vote: {
                pair: ['Trainspotting', '28 Days Later']
            },
            entries: []
        }));
    });

    it('handles VOTE', function () {
        var initialState = (0, _immutable.fromJS)({
            vote: {
                pair: ['Trainspotting', '28 Days Later']
            },
            entries: []
        });
        var action = { type: 'VOTE', entry: 'Trainspotting' };
        var nextState = (0, _reducer2.default)(initialState, action);

        (0, _chai.expect)(nextState).to.equal((0, _immutable.fromJS)({
            vote: {
                pair: ['Trainspotting', '28 Days Later'],
                tally: { Trainspotting: 1 }
            },
            entries: []
        }));
    });
});
//# sourceMappingURL=reducer_spec.js.map