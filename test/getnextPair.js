import {expect} from 'chai'
import {List, Map} from 'immutable'
import {describe, it} from 'mocha'
let mlog = require('mocha-logger')
let log = mlog.log;
import {setEntries, next, vote} from '../src/core';

describe('immutablilty => ', (done) => {

    describe('next', () => {

        it('puts winner of current vote back to entries', () => {
            const state = Map({
                vote: Map({
                    pair: List.of('Trainspotting', '28 Days Later'),
                    tally: Map({
                        'Trainspotting': 4,
                        '28 Days Later': 2
                    })
                }),
                entries: List.of('Sunshine', 'Millions', '127 Hours')
            });
            const nextState = next(state);
            const result = Map({
                vote: Map({
                    pair: List.of('Sunshine', 'Millions')
                }),
                entries: List.of('127 Hours', 'Trainspotting')
            })
            log('returned value ===>', nextState.toString())
            log('expected result ==>', result.toString())
            expect(nextState.equals(result)).to.equal(true);
        });

        it('puts both from tied vote back to entries', () => {
            const state = Map({
                vote: Map({
                    pair: List.of('Trainspotting', '28 Days Later'),
                    tally: Map({
                        'Trainspotting': 3,
                        '28 Days Later': 3
                    })
                }),
                entries: List.of('Sunshine', 'Millions', '127 Hours')
            });
            const nextState = next(state);
            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of('Sunshine', 'Millions')
                }),
                entries: List.of('127 Hours', 'Trainspotting', '28 Days Later')
            }));
        });

    });

    describe('next', () => {

        it.only('marks winner when just one entry left', () => {
            const state = Map({
                vote: Map({
                    pair: List.of('Trainspotting', '28 Days Later'),
                    tally: Map({
                        'Trainspotting': 4,
                        '28 Days Later': 2
                    })
                }),
                entries: List()
            });
            const nextState = next(state);
            const resultExpected = Map({
                winner: 'Trainspotting'
            })
            log('returned value ===>', nextState.toString())
            expect(nextState.equals(resultExpected)).to.equal(true);
        });

    });

});
