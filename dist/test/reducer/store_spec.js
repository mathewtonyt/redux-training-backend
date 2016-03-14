'use strict';

var _immutable = require('immutable');

var _chai = require('chai');

var _store = require('../../src/store');

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('store', function () {

    it.only('is a Redux store configured with the correct reducer', function () {
        var store = (0, _store2.default)();
        (0, _chai.expect)(store.getState()).to.equal((0, _immutable.Map)());

        store.dispatch({
            type: 'SET_ENTRIES',
            entries: ['Trainspotting', '28 Days Later']
        });
        (0, _chai.expect)(store.getState()).to.equal((0, _immutable.fromJS)({
            entries: ['Trainspotting', '28 Days Later']
        }));
    });
});
//# sourceMappingURL=store_spec.js.map