import {expect} from 'chai'
import {List, Map, fromJS} from 'immutable'
import {describe, it} from 'mocha'
let mlog = require('mocha-logger')
let log = mlog.log;
import {setEntries, next, vote} from '../src/core';

describe('immutablilty => ', (done) => {

    describe('setEntries', () => {
        it('creates a tally for the voted entry', () => {
            const state = Map({
                vote: Map({
                    pair: List.of('movie1', 'movie2')
                }),
                entries: List()
            });
            const nextState = vote(state.get('vote'), 'movie1');

            let expectedResult = fromJS({
                pair: List.of('movie1', 'movie2'),
                tally: Map({
                    'movie1': 1
                })
            });

            log('initial state =>', state.toString())
            log('expected result =>', expectedResult.toString())
            log('returned result =>', nextState.toString())
            log('equal : ', nextState.equals(expectedResult))

            expect(nextState.equals(expectedResult)).to.equal(true)
        });

        it('adds to existing tally for the voted entry', () => {
            const state = Map({
                vote: Map({
                    pair: List.of('movie1', 'movie2'),
                    tally: Map({
                        'movie1': 3,
                        'movie2': 2
                    })
                }),
                entries: List()
            });
            const nextState = vote(state.get('vote'), 'movie1');
            let expectedResult = Map({
                pair: List.of('movie1', 'movie2'),
                tally: Map({
                    'movie1': 4,
                    'movie2': 2
                })
            })

            log('actual result   =>', state.toString())
            log('expected result =>', expectedResult.toString())
            log('returned result =>', nextState.toString())
            log('equal : ', nextState.equals(expectedResult))

            expect(nextState.equals(expectedResult)).to.equal(true);
        });

        it('adds the entries to the state', () => {
            const state = Map();
            const entries = List.of('movie1', 'movie2');

            log(entries.toString())
            const nextState = setEntries(state, entries);
            log(nextState.toString())
            let expectedResult = Map({
                entries: List.of('movie1', 'movie2')
            })
            log(expectedResult.toString())
            expect(nextState.equals(expectedResult)).to.equal(true);
        });

        it('get the next state ', () => {
            const state = Map();
            const entries = List.of('movie1', 'movie2', 'movie3');
            const firstState = setEntries(state, entries);
            log('second state')
            log(firstState.toString())

            const secondState = next(firstState);
            log('second state')
            log(secondState.toString())
            let expectedResult = Map({
                vote: Map({
                    pair: List.of('movie1', 'movie2')
                }),
                entries: List.of('movie3')
            })
            log('expected state')
            log(expectedResult.toString())
            expect(secondState.equals(expectedResult)).to.equal(true);
        });


    });

    describe('list', (done) => {
        function addMovie(currentState, movie) {
            return currentState.push(movie)
        }
        it('is immutable', (done) => {
            let moviesState = List.of('Transporting', 'Mad max')
            let nextState = addMovie(moviesState, 'sunshine')
            expect(moviesState.size).to.equal(2)
            expect(nextState.size).to.equal(3)
            done()
        })
    })

    describe('tree', (done) => {
        function addMovie(currentState, item) {
            log('current state ==>' + currentState.get('movies'))
            return currentState.update('movies', movies => movies.push(item))
        }


        it('is immutable', (done) => {
            let state = Map({
                movies: List.of('movie1', 'movie2')
            });
            let nextState = addMovie(state, 'movie3')

            log(state.toString());
            expect(state.get('movies').size).to.equal(2)
            log(nextState.toString())
            expect(nextState.get('movies').size).to.equal(3)
            done()
        })
    })

});
