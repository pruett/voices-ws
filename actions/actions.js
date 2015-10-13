import { Map } from 'immutable'

function getNextId (field, state) {
  let fieldState = state.get(field)

  return fieldState
    ? parseInt(Object.keys(fieldState.toJS()).sort((a, b) => b > a)[0], 10) + 1
    : 1
}

function getRecordListValues (field, id, record, nextValue, state) {
  let hasRecord = state.getIn([field, id.toString()]).has(record)

  if (hasRecord) {
    let values = state.getIn([field, id.toString(), record]).push(nextValue)
    return values.toJS()
  } else {
    return [nextValue]
  }
}

export function setState (state, appState) {
  return state.withMutations(state => {
    state
      .merge(appState)
      .set('fetching', false)
  })
}

export function createSession (state, gameId) {
  let nextSessionId = getNextId('sessions', state)
  let gameSessionIds = getRecordListValues('games', gameId, 'sessionIds', nextSessionId, state)

  return state.withMutations(state => {
    state
      .mergeDeepIn(['sessions'], Map([[ nextSessionId.toString(), Map({ }) ]]))
      .mergeDeepIn(['games', gameId.toString()], [[ 'sessionIds', gameSessionIds ]])
  })
}

export function vote (state, sessionId, questionId, responseId) {
  return state.updateIn(
    ['sessions',
      sessionId.toString(),
      'votes',
      questionId.toString(),
      responseId.toString()], 0, val => val + 1
  )
}
