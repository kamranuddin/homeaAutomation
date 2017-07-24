import * as ActionTypes from '../../actions'
import { mergeNewEntities, ENTITY_STATUS_DATA_AVAILABLE } from '../../utils'

export default function accounts(state = {}, action) {
  switch (action.type) {
    case ActionTypes.MYACCOUNT_LIST_SUCCESS: {
      if (!action.payload) {
        throw new Error(`Can't execute ${ ActionTypes.MYACCOUNT_LIST_SUCCESS }. {payload} isn't available in action`)
      }

      const { payload: { user } } = action

      return mergeNewEntities(state, [user], ENTITY_STATUS_DATA_AVAILABLE)
    }

		case ActionTypes.GET_ALL_PROVIDERS_SUCCESS: {
      if (!action.payload) {
        throw new Error(`Can't execute ${ ActionTypes.GET_ALL_PROVIDERS_SUCCESS }. {payload} isn't available in action`)
      }
			return action.payload.providerList;
    }

    default: {
      return state
    }
  }
}
