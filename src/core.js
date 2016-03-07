import {List, Map} from 'immutable';
let mlog = require('mocha-logger')
let log = mlog.log;

export function vote(state, movie) {
    return state.updateIn(
        ['vote', 'tally', movie],
        0,
        tally => tally + 1
        );
}

export function setEntries(state, entries) {
    return state.set('entries', entries);
}

export function next(state) {
    const entries = state.get('entries');
    return state.merge({
        vote: Map({ pair: entries.take(2) }),
        entries: entries.skip(2)
    });
}
