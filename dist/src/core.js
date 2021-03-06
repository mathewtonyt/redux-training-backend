'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.INITIAL_STATE = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.vote = vote;
exports.setEntries = setEntries;
exports.next = next;

var _immutable = require('immutable');

var mlog = require('mocha-logger');
var log = mlog.log;

var INITIAL_STATE = exports.INITIAL_STATE = (0, _immutable.Map)();

function vote(state, movie) {
    return state.updateIn(['tally', movie], 0, function (tally) {
        return tally + 1;
    });
}

function setEntries(state, entries) {
    log('reached instide the corejs', state.toString());
    return state.set('entries', (0, _immutable.fromJS)(entries));
}

function getWinners(vote) {
    if (!vote) return [];

    var _vote$get = vote.get('pair');

    var _vote$get2 = _slicedToArray(_vote$get, 2);

    var a = _vote$get2[0];
    var b = _vote$get2[1];

    var aVotes = vote.getIn(['tally', a], 0);
    var bVotes = vote.getIn(['tally', b], 0);
    if (aVotes > bVotes) return [a];else if (aVotes < bVotes) return [b];else return [a, b];
}

function next(state) {
    var entries = state.get('entries').concat(getWinners(state.get('vote')));
    if (entries.size === 1) {
        return state.remove('vote').remove('entries').set('winner', entries.first());
    } else {
        return state.merge({
            vote: (0, _immutable.Map)({ pair: entries.take(2) }),
            entries: entries.skip(2)
        });
    }
}
//# sourceMappingURL=core.js.map