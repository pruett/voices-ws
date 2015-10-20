import { Map } from 'immutable'
import { setState, createSession, saveGame, vote } from '../actions/actions'

export default function reducer (state = Map(), action) {
  switch (action.type) {
    case 'SET_STATE':
      return setState(state, action.state)
    case 'CREATE_SESSION':
      return createSession(state, action.id)
    case 'VOTE':
      return vote(state, action.sessionId, action.questionId, action.responseId)
    case 'SAVE_GAME':
      return saveGame(state, action.state)
    default:
      return state
  }
}
