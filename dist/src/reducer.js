'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = reducer;

var _core = require('./core');

var _winston = require('winston');

var winston = _interopRequireWildcard(_winston);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var logger = new winston.Logger();
function reducer(state, action) {
    logger.info('reacher inside the reducer');
    var nextState = undefined;
    switch (action._type) {
        case 'SET_ENTRIES':
            logger.info('action type > SET_ENTRIES');
            nextState = (0, _core.setEntries)(state, entries);
            logger.info('next state > ', nextState.toString());
            break;

        case 'NEXT':
            logger.log('action type > NEXT');
            break;

        case 'VOTE':
            logger.log('action type > VOTE');
            break;

        default:
            logger.log('no action found going into the default action');
            break;
    }
    return nextState;
}
//# sourceMappingURL=reducer.js.map