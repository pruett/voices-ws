/* global describe, it */
import { Map, fromJS } from 'immutable'
import { expect } from 'chai'

import reducer from '../reducers/reducer'

describe('reducer', () => {
  it('handles SET_STATE', () => {
    const initialState = Map()
    const action = { type: 'SET_STATE', state: fromJS({ games: { 1: { } } }) }
    const nextState = reducer(initialState, action)

    expect(nextState).to.equal(fromJS({
      games: {
        1: { }
      }
    }))
  })

  it('handles CREATE_SESSION', () => {
    const initialState = fromJS({
      games: { 1: { } }
    })
    const action = { type: 'CREATE_SESSION', id: 1 }
    const nextState = reducer(initialState, action)

    expect(nextState).to.equal(fromJS({
      games: { 1: { sessionIds: [1] } },
      sessions: { 1: { } }
    }))
  })

  it('handles VOTE', () => {
    const initialState = fromJS({
      games: { 1: { sessionIds: [1] } },
      sessions: {
        1: {
          votes: {
            1: { 4: 1 }
          }
        }
      }
    })
    const action = { type: 'VOTE', sessionId: 1, questionId: 1, responseId: 4 }
    const nextState = reducer(initialState, action)

    expect(nextState).to.equal(fromJS({
      games: { 1: { sessionIds: [1] } },
      sessions: {
        1: {
          votes: {
            1: { 4: 2 }
          }
        }
      }
    }))
  })
})
