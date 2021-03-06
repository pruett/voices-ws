import { fromJS } from 'immutable'
import configureStore from './store/store'
import { startServer } from './src/server'

const initialAppState = fromJS({
  fetching: false,
  games: {
    1: { id: 1, title: 'Example Game', questionIds: [1, 2], sessionIds: [1] }
  },

  questions: {
    1: { id: 1, title: 'What color is the sky?', responseIds: [1, 2, 3] },
    2: { id: 2, title: 'What is 2 + 2', responseIds: [4, 5, 6] }
  },

  responses: {
    1: { id: 1, text: 'blue', correct: true },
    2: { id: 2, text: 'green', correct: false },
    3: { id: 3, text: 'red', correct: false },
    4: { id: 4, text: 'two', correct: false },
    5: { id: 5, text: 'three', correct: false },
    6: { id: 6, text: 'four', correct: true }
  },

  sessions: {
    1: {
      id: 1,
      gameId: 1,
      votes: {
        1: { 1: 0, 2: 0, 3: 0 },
        2: { 4: 0, 5: 0, 6: 0 }
      }
    }
  }
})

export const store = configureStore(initialAppState)
startServer(store)
