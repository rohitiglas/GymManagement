import * as types from '../actions/types';
import appState from '../contants/initialState';
let categoryDataArray=[]
let cartQuantity=0;

const loginReducer = (state = appState.login, action) => {


    switch (action.type) {
        case types.SET_USER_INFO:



            let myAttendance={}

            if( action.data && action.data.attendence)
            {
                myAttendance=action.data.attendence
            }

            return { ...state,  userInfo: action.data.user,userPunch: myAttendance }

            case types.SET_SELECTED_DRAWER_ROW:
            return { ...state, ...{ selectedDrawerRow: action.data } }


        case types.SET_USER_PUNCH:
            return {...state,userPunch:action.data}

        case types.SET_ALL_MEAL_DATA:
            let myArrayData=action.data.categories

            let categoryData = myArrayData.map(function(person) {
                return Object.assign(person, {"quantity":0})


            });

            return { ...state,  allMealData:categoryData }

        case types.SET_ITEMS_TO_CART:
            cartQuantity=0;


            let sameItem=false;
            categoryDataArray = state.allMealData.map(function(person) {
                if(person.idCategory===action.data.idCategory)
                {
                    cartQuantity=cartQuantity+ action.data.quantity;
                    return action.data;
                }
                else
                {
                    cartQuantity=cartQuantity+ person.quantity;
                    return person
                }


            });


            let cart =state.cart?state.cart:[];
            let currentItemObject=action.data;



            let isAvailableInCart=cart.findIndex(x => x.idCategory ===currentItemObject.idCategory);
            if (isAvailableInCart===-1){

                currentItemObject['tempqty']=1;
                cart.push(currentItemObject);
                return { ...state, allMealData:categoryDataArray,cartQuantity:cartQuantity, cart:cart }
            }else{


                let availableItemData=cart[isAvailableInCart];
                availableItemData.tempqty=availableItemData.tempqty+1;
                cart[isAvailableInCart]=availableItemData;
                return { ...state, allMealData:categoryDataArray, cartQuantity:cartQuantity,cart:cart }
            }

            // categoryDataArray = state.allMealData.map(function(person) {
            //     if(person.idCategory===action.data.idCategory)
            //     return action.data;
            //     return person
            // });
            // let filterCartData = state.cart.filter(function(person) {
            //
            //
            //     return person.idCategory!==action.data.idCategory;
            //
            //
            // });
            // return { ...state, allMealData:categoryDataArray, cart:[filterCartData,action.data] }

            case types.REMOVE_ITEMS_TO_CART:
                cartQuantity=state.cartQuantity;

                if(cartQuantity>0)
                    cartQuantity=cartQuantity-1;


            categoryDataArray = state.allMealData.map(function(person) {
                if(person.idCategory===action.data.idCategory)
                    return action.data;
                return person
            });

            let filterCart = state.cart.filter(function(person) {
                    return person.quantity!==0;
                });

            return { ...state, cartQuantity:cartQuantity,allMealData:categoryDataArray, cart:filterCart }




        default:return state


    }

}
export default loginReducer