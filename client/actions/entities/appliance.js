// libs
import { push } from 'react-router-redux'

// src
import { CALL_API } from '../../middleware/api'



export const APPLIANCE_ADD = 'APPLIANCE_ADD'
export const APPLIANCE_ADD_SUCCESS = 'APPLIANCE_ADD_SUCCESS'
export const APPLIANCE_ADD_FAILURE = 'APPLIANCE_ADD_FAILURE'

export function addAppliance(homeId,floorId,palaceId,applianceType,name) {
    console.log("Add appliance  action has been called")
    return {
        [CALL_API]: {
            types: [
                APPLIANCE_ADD,
                APPLIANCE_ADD_SUCCESS,
                APPLIANCE_ADD_FAILURE
            ],
            endpoint: `/api/admin/addSwitch`,
            method: 'POST'
        },
        payload: { name,applianceType,palaceId,floorId,homeId}
    }
}


export const APPLIANCE_TOGGLE = 'APPLIANCE_TOGGLE'
export const APPLIANCE_TOGGLE_SUCCESS = 'APPLIANCE_TOGGLE_SUCCESS'
export const APPLIANCE_TOGGLE_FAILURE = 'APPLIANCE_TOGGLE_FAILURE'

export function toggleAppliance(switch_id,appliance_id,palace_id,floor_id,status) {
    console.log("toggle appliance  action has been called")
    return {
        [CALL_API]: {
            types: [
                APPLIANCE_TOGGLE,
                APPLIANCE_TOGGLE_SUCCESS,
                APPLIANCE_TOGGLE_FAILURE
            ],
            endpoint: `/api/now/changeSwitchStatus`,
            method: 'POST'
        },
        payload: { switch_id,appliance_id,palace_id,floor_id,status}
    }
}


export const APPLIANCE_TOGGLE_SOCKET = 'APPLIANCE_TOGGLE_SOCKET'


export function toggleApplianceSocket(switchData) {
    const {status,switch_id} = switchData
    console.log("toggle appliance  socket action has been called")
    return {
            type: APPLIANCE_TOGGLE_SOCKET,
        payload: { switch_id,status}
    }
}