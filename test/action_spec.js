/* global describe, it */
import { Map, fromJS } from 'immutable'
import { expect } from 'chai'

import { setState, createSession, vote } from '../actions/actions'

describe('application logic', () => {
  describe('setState', () => {
    it('sets state for app', () => {
      const initialState = Map()
      const appData = fromJS({
        games: {
          1: { title: 'Test Game', questionIds: [1, 2] },
          2: { title: 'Test Game', questionIds: [1, 2] }
        }
      })
      const nextState = setState(initialState, appData)
      expect(nextState).to.equal(fromJS({
        fetching: false,
        games: {
          1: { title: 'Test Game', questionIds: [1, 2] },
          2: { title: 'Test Game', questionIds: [1, 2] }
        }
      }))
    })

    it('can handle non-immutable data structures', () => {
      const initialState = Map()
      const appData = {
        games: {
          1: { title: 'Test Game', questionIds: [1, 2] }
        }
      }
      const nextState = setState(initialState, appData)
      expect(nextState).to.equal(fromJS({
        fetching: false,
        games: {
          1: { title: 'Test Game', questionIds: [1, 2] }
        }
      }))
    })

    it('sets the app state fetching flag to false', () => {
      const initialState = Map()
      const appData = {
        fetching: true,
        games: {
          1: { title: 'Test Game', questionIds: [1, 2] }
        }
      }
      const nextState = setState(initialState, appData)
      expect(nextState).to.equal(fromJS({
        fetching: false,
        games: {
          1: { title: 'Test Game', questionIds: [1, 2] }
        }
      }))
    })
  })

  describe('createSession', () => {
    it('creates a new session based on selected game', () => {
      const state = fromJS({
        games: {
          1: { title: 'Test Game', questionIds: [1, 2] }
        }
      })
      const nextState = createSession(state, 1)
      expect(nextState).to.equal(fromJS({
        games: {
          1: { title: 'Test Game', questionIds: [1, 2], sessionIds: [1] }
        },

        sessions: {
          1: { }
        }
      }))
    })

    it('creates a new session with multiple games/sessions created', () => {
      const state = fromJS({
        games: {
          1: { title: 'Game 1', questionIds: [1, 2], sessionIds: [1] },
          2: { title: 'Game 2', questionIds: [1, 2], sessionIds: [2] },
          3: { title: 'Game 3', questionIds: [1, 2] }
        },

        sessions: {
          1: { },
          2: { }
        }
      })
      const nextState = createSession(state, 3)
      expect(nextState).to.equal(fromJS({
        games: {
          1: { title: 'Game 1', questionIds: [1, 2], sessionIds: [1] },
          2: { title: 'Game 2', questionIds: [1, 2], sessionIds: [2] },
          3: { title: 'Game 3', questionIds: [1, 2], sessionIds: [3] }
        },

        sessions: {
          1: { },
          2: { },
          3: { }
        }
      }))
    })

    it('creates the proper session when multiple sessions exist', () => {
      const state = fromJS({
        games: {
          1: { title: 'Game 1', questionIds: [1, 2], sessionIds: [1, 2, 3, 4] },
          2: { title: 'Game 2', questionIds: [1, 2] }
        },

        sessions: {
          1: { },
          2: { },
          3: { },
          4: { }
        }
      })
      const nextState = createSession(state, 2)
      expect(nextState).to.equal(fromJS({
        games: {
          1: { title: 'Game 1', questionIds: [1, 2], sessionIds: [1, 2, 3, 4] },
          2: { title: 'Game 2', questionIds: [1, 2], sessionIds: [5] }
        },

        sessions: {
          1: { },
          2: { },
          3: { },
          4: { },
          5: { }
        }
      }))
    })

    it('properly adds sesssions to a game with existing sessions', () => {
      const state = fromJS({
        games: {
          1: { title: 'Game 1', questionIds: [1, 2], sessionIds: [1, 2, 3, 4] },
          2: { title: 'Game 2', questionIds: [1, 2], sessionIds: [5] }
        },

        sessions: {
          1: { },
          2: { },
          3: { },
          4: { },
          5: { }
        }
      })
      const nextState = createSession(state, 1)
      expect(nextState).to.equal(fromJS({
        games: {
          1: { title: 'Game 1', questionIds: [1, 2], sessionIds: [1, 2, 3, 4, 6] },
          2: { title: 'Game 2', questionIds: [1, 2], sessionIds: [5] }
        },

        sessions: {
          1: { },
          2: { },
          3: { },
          4: { },
          5: { },
          6: { }
        }
      }))
    })
  })

  describe('vote', () => {
    it('adds vote tally to session', () => {
      const state = fromJS({
        games: {
          1: { title: 'Game 1', questionIds: [1, 2], sessionIds: [1, 2] }
        },

        sessions: {
          1: { }
        }
      })

      let [sessionId, questionId, responseId] = [1, 2, 3]
      const nextState = vote(state, sessionId, questionId, responseId)
      expect(nextState).to.equal(fromJS({
        games: {
          1: { title: 'Game 1', questionIds: [1, 2], sessionIds: [1, 2] }
        },

        sessions: {
          1: {
            votes: {
              2: { 3: 1 }
            }
          }
        }
      }))
    })
  })
})
