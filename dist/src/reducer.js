'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = reducer;

var _core = require('./core');

var logger = require('winston');
function reducer() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? _core.INITIAL_STATE : arguments[0];
    var action = arguments[1];

    switch (action.type) {
        case 'SET_ENTRIES':
            return (0, _core.setEntries)(state, action.entries);
        case 'NEXT':
            return (0, _core.next)(state);
        case 'VOTE':
            console.log('state => ', state.toString());
            return state.update('vote', function (voteState) {
                return (0, _core.vote)(voteState, action.entry);
            });
    }
    return state;
}
//# sourceMappingURL=reducer.js.map