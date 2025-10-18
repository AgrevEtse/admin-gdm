export const createReducer = (defaultState) => {
  return (state, action) => {
    switch (action.type) {
      case 'UPDATE_FIELD':
        return {
          ...state,
          [action.payload.field]: action.payload.value
        }
      case 'UPDATE_FIELD_ARRAY': {
        const { index, field, value } = action.payload
        return state.map((item, i) =>
          i === index ? { ...item, [field]: value } : item
        )
      }
      case 'SET_STATE':
        return {
          ...state,
          ...action.payload
        }
      case 'SET_STATE_ARRAY':
        return [...action.payload]
      case 'RESET':
        return defaultState
      default:
        return state
    }
  }
}
