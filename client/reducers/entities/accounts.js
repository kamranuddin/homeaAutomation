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
			const {payload} = action;
			const {providerList} = payload;
      if (!payload) {
        throw new Error(`Can't execute ${ ActionTypes.GET_ALL_PROVIDERS_SUCCESS }. {payload} isn't available in action`)
      }
			return {...state, providerList};
    }

		case ActionTypes.USERPROVIDER_LIST_SUCCESS: {
			const {payload} = action;
			const {userProviderList} = payload;
      if (!payload) {
        throw new Error(`Can't execute ${ ActionTypes.USERPROVIDER_LIST_SUCCESS }. {payload} isn't available in action`)
      }
			return {...state, userProviderList};
    }

		case ActionTypes.USERADDRESSES_LIST_SUCCESS: {
			const {payload} = action;
			const {userAddressesList} = payload;
      if (!payload) {
        throw new Error(`Can't execute ${ ActionTypes.USERPROVIDER_LIST_SUCCESS }. {payload} isn't available in action`)
      }
			return {...state, userAddressesList};
    }
/*****************************************deleteWallet*****************************************************************/ 
		case ActionTypes.DELETE_WALLET: {
			return {...state, refreshUserWalletList: true}
    }
    case ActionTypes.DELETE_WALLET_SUCCESS: {
			const {payload} = action;
			const {userProviderList} = payload;
      if (!payload) {
        throw new Error(`Can't execute ${ ActionTypes.DELETE_WALLET_SUCCESS }. {payload} isn't available in action`)
      }
			return {...state, userProviderList, refreshUserWalletList: false};
    }
		case ActionTypes.DELETE_WALLET_FAILURE: {
			return {...state, refreshUserWalletList: false}
    }
/*****************************************refreshUserProviders*****************************************************************/ 
		case ActionTypes.REFRESH_USERPROVIDERS: {
			return {...state, refreshUserWalletList: true}
    }
    case ActionTypes.REFRESH_USERPROVIDERS_SUCCESS: {
			const {payload} = action;
			const {userProviderList} = payload;
      if (!payload) {
        throw new Error(`Can't execute ${ ActionTypes.DELETE_WALLET_SUCCESS }. {payload} isn't available in action`)
      }
			return {...state, userProviderList, refreshUserWalletList: false};
    }
		case ActionTypes.REFRESH_USERPROVIDERS_FAILURE: {
			return {...state, refreshUserWalletList: false}
    }
/*****************************************addUserAddresses*****************************************************************/ 
		case ActionTypes.ADD_USER_ADDRESSES: {
			return {...state, refreshUserAddressList: true}
    }
    case ActionTypes.ADD_USER_ADDRESSES_SUCCESS: {
			const {payload} = action;
			const {userAddressesList} = payload;
      if (!payload) {
        throw new Error(`Can't execute ${ ActionTypes.ADD_USER_ADDRESSES_SUCCESS }. {payload} isn't available in action`)
      }
			return {...state, userAddressesList, refreshUserAddressList: false};
    }
		case ActionTypes.ADD_USER_ADDRESSES_FAILURE: {
			return {...state, refreshUserAddressList: false}
    }
/****************************************refreshUserAddresses******************************************************************/    
    case ActionTypes.REFRESH_USER_ADDRESSES: {
			return {...state, refreshUserAddressList: true}
    }
    case ActionTypes.REFRESH_USER_ADDRESSES_SUCCESS: {
			const {payload} = action;
			const {userAddressesList} = payload;
      if (!payload) {
        throw new Error(`Can't execute ${ ActionTypes.REFRESH_USER_ADDRESSES_SUCCESS }. {payload} isn't available in action`)
      }
			return {...state, userAddressesList, refreshUserAddressList: false};
    }
		case ActionTypes.REFRESH_USER_ADDRESSES_FAILURE: {
			return {...state, refreshUserAddressList: false}
    }
/**************************************deleteUserAddress********************************************************************/     
		case ActionTypes.DELETE_USER_ADDRESS: {
			return {...state, refreshUserAddressList: true}
    }
    case ActionTypes.DELETE_USER_ADDRESS_SUCCESS: {
			const {payload} = action;
			const {userAddressesList} = payload;
      if (!payload) {
        throw new Error(`Can't execute ${ ActionTypes.DELETE_USER_ADDRESS_SUCCESS }. {payload} isn't available in action`)
      }
			return {...state, userAddressesList, refreshUserAddressList: false};
    }
    case ActionTypes.DELETE_USER_ADDRESS_FAILURE: {
			return {...state, refreshUserAddressList: false}
    }
/**************************************updateUserAddress********************************************************************/     
		case ActionTypes.UPDATE_USER_ADDRESS: {
			return {...state, refreshUserAddressList: true}
    }
    case ActionTypes.UPDATE_USER_ADDRESS_SUCCESS: {
			const {payload} = action;
			const {userAddressesList} = payload;
      if (!payload) {
        throw new Error(`Can't execute ${ ActionTypes.UPDATE_USER_ADDRESS_SUCCESS }. {payload} isn't available in action`)
      }
			return {...state, userAddressesList, refreshUserAddressList: false};
    }
    case ActionTypes.UPDATE_USER_ADDRESS_FAILURE: {
			return {...state, refreshUserAddressList: false}
    }
/**************************************default********************************************************************/     
    default: {
      return state
    }
  }
}


