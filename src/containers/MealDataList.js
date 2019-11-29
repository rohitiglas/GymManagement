import {FlatList, Image, Text, TouchableOpacity,Animated, View} from "react-native";
import styles from "./styles";
import React,{useState,useEffect} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {addItemToCart, fetchAllMealData, setAddItemToCart, setRemoveItemToCart} from "../actions/loginActions";

const getListViewItem = (item,navigation) => {
    navigation.navigate('RestaurantDetails')
}
const addItem = (item,props,quantity) => {
    let value=quantity+1;
    props.addItemToCart(Object.assign(item, {"quantity":value}))
}
const delayValue = 500;
const removeItem = (item,props,quantity) => {
    let value=quantity-1;
    let mapArray=props.cartList.filter((value,index,array)=>{

        return  value.idCategory!==item.idCategory


    });

    props.removeItemToCart(Object.assign(item, {"quantity":value}))
}

const MealList=(props)=>{
    const [animatedValue,setAnimatedValue]=useState(new Animated.Value(0));
    useEffect(()=>{
        Animated.spring(animatedValue, {
            toValue: 1,
            tension: 20,
            useNativeDriver: true
        }).start();
    });
    return(
        <FlatList
            data={props.allMealData}
            renderItem={({item}) =>
            {

                const translateX = animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1000, 1]
                });
                return(
                    <Animated.View
                        style={[styles.animateViewStyle, { transform: [{ translateX }] }]}
                    >
                    <View style={styles.rowViewStyle}>
                        <Image source={{uri:item.strCategoryThumb}}
                               resizeMode='stretch'
                               style={styles.imageStyle}/>
                        <Text style={styles.nameStyle}>{item.strCategory}</Text>

                        {item.quantity===0 &&
                        <TouchableOpacity style={{flex:1}}  onPress={()=>addItem(item,props,0)}>
                            <View style={styles.addViewStyle}>
                                <Text style={styles.addTextStyle}>ADD</Text>
                            </View>
                        </TouchableOpacity>}




                        {item.quantity!==0 && <View style={styles.plusMinusViewStyle}>
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
                    </Animated.View>
                )
            }




            }
            keyExtractor={item => item.idCategory}
            numColumns={2}

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

export default connect(mapStateToProps, mapDispatchToProps)(MealList);

