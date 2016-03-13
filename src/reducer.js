import {next, vote, setEntries} from './core'
import * as winston from 'winston'
let logger = new winston.Logger();
export default function reducer(state, action) {
    logger.info('reacher inside the reducer')
    let nextState
    switch (action._type) {
        case 'SET_ENTRIES':
            logger.info('action type > SET_ENTRIES')
            nextState = setEntries(state, entries)
            logger.info('next state > ', nextState.toString())
            break;

        case 'NEXT':
            logger.log('action type > NEXT')
            break;

        case 'VOTE':
            logger.log('action type > VOTE')
            break;

        default:
            logger.log('no action found going into the default action')
            break;
    }
    return nextState
}