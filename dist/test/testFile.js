'use strict';

var _chai = require('chai');

var _immutable = require('immutable');

var _mocha = require('mocha');

var _core = require('../src/core');

var mlog = require('mocha-logger');
var log = mlog.log;


(0, _mocha.describe)('immutablilty => ', function (done) {

    (0, _mocha.describe)('setEntries', function () {
        (0, _mocha.it)('creates a tally for the voted entry', function () {
            var state = (0, _immutable.Map)({
                vote: (0, _immutable.Map)({
                    pair: _immutable.List.of('movie1', 'movie2')
                }),
                entries: (0, _immutable.List)()
            });
            var nextState = (0, _core.vote)(state.get('vote'), 'movie1');

            var expectedResult = (0, _immutable.fromJS)({
                pair: _immutable.List.of('movie1', 'movie2'),
                tally: (0, _immutable.Map)({
                    'movie1': 1
                })
            });

            log('initial state =>', state.toString());
            log('expected result =>', expectedResult.toString());
            log('returned result =>', nextState.toString());
            log('equal : ', nextState.equals(expectedResult));

            (0, _chai.expect)(nextState.equals(expectedResult)).to.equal(true);
        });

        (0, _mocha.it)('adds to existing tally for the voted entry', function () {
            var state = (0, _immutable.Map)({
                vote: (0, _immutable.Map)({
                    pair: _immutable.List.of('movie1', 'movie2'),
                    tally: (0, _immutable.Map)({
                        'movie1': 3,
                        'movie2': 2
                    })
                }),
                entries: (0, _immutable.List)()
            });
            var nextState = (0, _core.vote)(state.get('vote'), 'movie1');
            var expectedResult = (0, _immutable.Map)({
                pair: _immutable.List.of('movie1', 'movie2'),
                tally: (0, _immutable.Map)({
                    'movie1': 4,
                    'movie2': 2
                })
            });

            log('actual result   =>', state.toString());
            log('expected result =>', expectedResult.toString());
            log('returned result =>', nextState.toString());
            log('equal : ', nextState.equals(expectedResult));

            (0, _chai.expect)(nextState.equals(expectedResult)).to.equal(true);
        });

        (0, _mocha.it)('adds the entries to the state', function () {
            var state = (0, _immutable.Map)();
            var entries = _immutable.List.of('movie1', 'movie2');

            log(entries.toString());
            var nextState = (0, _core.setEntries)(state, entries);
            log(nextState.toString());
            var expectedResult = (0, _immutable.Map)({
                entries: _immutable.List.of('movie1', 'movie2')
            });
            log(expectedResult.toString());
            (0, _chai.expect)(nextState.equals(expectedResult)).to.equal(true);
        });

        (0, _mocha.it)('get the next state ', function () {
            var state = (0, _immutable.Map)();
            var entries = _immutable.List.of('movie1', 'movie2', 'movie3');
            var firstState = (0, _core.setEntries)(state, entries);
            log('second state');
            log(firstState.toString());

            var secondState = (0, _core.next)(firstState);
            log('second state');
            log(secondState.toString());
            var expectedResult = (0, _immutable.Map)({
                vote: (0, _immutable.Map)({
                    pair: _immutable.List.of('movie1', 'movie2')
                }),
                entries: _immutable.List.of('movie3')
            });
            log('expected state');
            log(expectedResult.toString());
            (0, _chai.expect)(secondState.equals(expectedResult)).to.equal(true);
        });
    });

    (0, _mocha.describe)('list', function (done) {
        function addMovie(currentState, movie) {
            return currentState.push(movie);
        }
        (0, _mocha.it)('is immutable', function (done) {
            var moviesState = _immutable.List.of('Transporting', 'Mad max');
            var nextState = addMovie(moviesState, 'sunshine');
            (0, _chai.expect)(moviesState.size).to.equal(2);
            (0, _chai.expect)(nextState.size).to.equal(3);
            done();
        });
    });

    (0, _mocha.describe)('tree', function (done) {
        function addMovie(currentState, item) {
            log('current state ==>' + currentState.get('movies'));
            return currentState.update('movies', function (movies) {
                return movies.push(item);
            });
        }

        (0, _mocha.it)('is immutable', function (done) {
            var state = (0, _immutable.Map)({
                movies: _immutable.List.of('movie1', 'movie2')
            });
            var nextState = addMovie(state, 'movie3');

            log(state.toString());
            (0, _chai.expect)(state.get('movies').size).to.equal(2);
            log(nextState.toString());
            (0, _chai.expect)(nextState.get('movies').size).to.equal(3);
            done();
        });
    });
});
//# sourceMappingURL=testFile.js.map