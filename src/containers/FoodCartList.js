import {FlatList, Image, Text, TouchableOpacity, View} from "react-native";
import styles from "./styles";
import React,{useState,useEffect} from "react";
import {connect} from "react-redux";

import {setAddItemToCart, setRemoveItemToCart} from "../actions/loginActions";


const addItem = (item,props,quantity) => {
    let value=quantity+1;
    props.addItemToCart(Object.assign(item, {"quantity":value}))
}
const removeItem = (item,props,quantity) => {
    let value=quantity-1;
    props.removeItemToCart(Object.assign(item, {"quantity":value}))
}

const CartList=(props)=>{
    return(
        <FlatList
            data={props.cartList}
            renderItem={({item}) =>

                <View style={styles.cartRowViewStyle}>
                    <Image source={{uri:item.strCategoryThumb}}
                           resizeMode='stretch'
                           style={styles.cartImageStyle}/>

                           <View style={{flexDirection:'column'}}>
                               <Text style={styles.nameStyle}>{item.strCategory}</Text>



                               {item.quantity!==0 && <View style={styles.cartPlusMinusViewStyle}>
                                   <TouchableOpacity  onPress={()=>addItem(item,props,item.quantity)}>
                                       <View style={styles.plusView}>
                                           <Text style={styles.plusTextStyle}>+</Text>
                                       </View>
                                   </TouchableOpacity>
                                   <View style={styles.plusView}>
                                       <Text style={styles.addTextStyle}>{item.quantity}</Text>
                                   </View>
                                   <TouchableOpacity  onPress={()=>removeItem(item,props,item.quantity)}>
                                       <View style={styles.plusView}>
                                           <Text style={styles.plusTextStyle}>-</Text>
                                       </View>
                                   </TouchableOpacity>

                               </View>}
                           </View>








                </View>

            }
            numColumns={1}

        />
    )
}

const mapStateToProps = (state) => {


    return {
        allMealData:state.login.allMealData,
        cartList:state.login.cart
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addItemToCart: item => {
            dispatch(setAddItemToCart(item))
        },
        removeItemToCart: item => {
            dispatch(setRemoveItemToCart(item))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartList);

