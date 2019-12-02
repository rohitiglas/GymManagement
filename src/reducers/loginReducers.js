import * as types from '../actions/types';
import appState from '../constants/initialState';


const loginReducer = (state = appState.login, action) => {


    switch (action.type) {
        case types.SET_USER_INFO:



            let myAttendance={}

            if( action.data && action.data.attendence)
            {
                myAttendance=action.data.attendence
            }

            return { ...state,
                userInfo: action.data.user,
                userPunch: myAttendance }

            case types.SET_SELECTED_DRAWER_ROW:
            return { ...state, ...{ selectedDrawerRow: action.data } }


        case types.SET_USER_PUNCH:
            return {...state,userPunch:action.data}















        default:return state


    }

}
export default loginReducer