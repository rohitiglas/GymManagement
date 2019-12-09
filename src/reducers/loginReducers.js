import * as types from '../actions/types';
import appState from '../constants/initialState';


const loginReducer = (state = appState.login, action) => {


    switch (action.type) {

        case types.SET_LOGIN_TOKEN:
            return { ...state,
                token: action.data}

        case types.SET_USER_INFO:



            let myAttendance={},myPlan={}

            if( action.data && action.data.attendence)
            {
                myAttendance=action.data.attendence
            }
            if( action.data && action.data.plan)
            {
                myPlan=action.data.plan
            }
            if( action.data && action.data.plan)
            {
                myPlan=action.data.plan
            }

            return { ...state,
                userInfo: action.data.user,
                myPlan: myPlan,
                userPunch: myAttendance,selectedDrawerRow:"Home" }

            case types.SET_SELECTED_DRAWER_ROW:
            return { ...state, ...{ selectedDrawerRow: action.data, } }


        case types.SET_USER_PUNCH:
            return {...state,userPunch:action.data}















        default:return state


    }

}
export default loginReducer
