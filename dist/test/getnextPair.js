'use strict';

var _chai = require('chai');

var _immutable = require('immutable');

var _mocha = require('mocha');

var _core = require('../src/core');

var mlog = require('mocha-logger');
var log = mlog.log;


(0, _mocha.describe)('immutablilty => ', function (done) {

    (0, _mocha.describe)('next', function () {

        (0, _mocha.it)('puts winner of current vote back to entries', function () {
            var state = (0, _immutable.Map)({
                vote: (0, _immutable.Map)({
                    pair: _immutable.List.of('Trainspotting', '28 Days Later'),
                    tally: (0, _immutable.Map)({
                        'Trainspotting': 4,
                        '28 Days Later': 2
                    })
                }),
                entries: _immutable.List.of('Sunshine', 'Millions', '127 Hours')
            });
            var nextState = (0, _core.next)(state);
            var result = (0, _immutable.Map)({
                vote: (0, _immutable.Map)({
                    pair: _immutable.List.of('Sunshine', 'Millions')
                }),
                entries: _immutable.List.of('127 Hours', 'Trainspotting')
            });
            log('returned value ===>', nextState.toString());
            log('expected result ==>', result.toString());
            (0, _chai.expect)(nextState.equals(result)).to.equal(true);
        });

        (0, _mocha.it)('puts both from tied vote back to entries', function () {
            var state = (0, _immutable.Map)({
                vote: (0, _immutable.Map)({
                    pair: _immutable.List.of('Trainspotting', '28 Days Later'),
                    tally: (0, _immutable.Map)({
                        'Trainspotting': 3,
                        '28 Days Later': 3
                    })
                }),
                entries: _immutable.List.of('Sunshine', 'Millions', '127 Hours')
            });
            var nextState = (0, _core.next)(state);
            (0, _chai.expect)(nextState).to.equal((0, _immutable.Map)({
                vote: (0, _immutable.Map)({
                    pair: _immutable.List.of('Sunshine', 'Millions')
                }),
                entries: _immutable.List.of('127 Hours', 'Trainspotting', '28 Days Later')
            }));
        });
    });

    (0, _mocha.describe)('next', function () {

        (0, _mocha.it)('marks winner when just one entry left', function () {
            var state = (0, _immutable.Map)({
                vote: (0, _immutable.Map)({
                    pair: _immutable.List.of('Trainspotting', '28 Days Later'),
                    tally: (0, _immutable.Map)({
                        'Trainspotting': 4,
                        '28 Days Later': 2
                    })
                }),
                entries: (0, _immutable.List)()
            });
            var nextState = (0, _core.next)(state);
            var resultExpected = (0, _immutable.Map)({
                winner: 'Trainspotting'
            });
            log('returned value ===>', nextState.toString());
            (0, _chai.expect)(nextState.equals(resultExpected)).to.equal(true);
        });
    });
});
//# sourceMappingURL=getnextPair.js.map