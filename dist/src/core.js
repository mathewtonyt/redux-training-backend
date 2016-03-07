'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.vote = vote;
exports.setEntries = setEntries;
exports.next = next;

var _immutable = require('immutable');

var mlog = require('mocha-logger');
var log = mlog.log;

function vote(state, movie) {
    return state.updateIn(['vote', 'tally', movie], 0, function (tally) {
        return tally + 1;
    });
}

function setEntries(state, entries) {
    return state.set('entries', entries);
}

function next(state) {
    var entries = state.get('entries');
    return state.merge({
        vote: (0, _immutable.Map)({ pair: entries.take(2) }),
        entries: entries.skip(2)
    });
}
//# sourceMappingURL=core.js.map