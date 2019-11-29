import React, { Component } from 'react';
import {  FlatList,ActivityIndicator,Image,TouchableOpacity,ImageBackground,
    StyleSheet, Text, View,Alert } from 'react-native';
import {connect} from "react-redux";
import * as loginActions from '../actions/loginActions';
import {bindActionCreators} from "redux";
import Card from "../utils/Card";
import styles from './styles';
import {fetchAllMealData} from "../actions/loginActions";
import MealList from "./MealDataList";
import CartList from "./FoodCartList";


class FoodCart extends Component {
    backPress=()=>{
        this.props.navigation.pop();
    }


    render() {

        return (
            <View style={styles.container}>
                <View style={{alignItems:'center',
                    backgroundColor:'#428d0c',height:60,width:'100%',flexDirection:'row',}}>
                    <TouchableOpacity style={{marginLeft:10,width: 40, height: 40,justifyContent:'center'}} onPress={this.backPress}>
                        <Image
                            style={{marginRight:10,width: 30, height: 30}}
                            source={require('../images/backArrow.png')}
                        />
                    </TouchableOpacity>
                    <Text style={{marginLeft:20,color:'#FFFFFF',fontSize:16,fontWeight:'bold'}}>Food Cart</Text>
                </View>

                {this.props.cartList.length===0 &&
                <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                    <Text style={{marginLeft:20,color:'#525252',fontSize:26,fontWeight:'bold'}}>Cart Empty</Text>
                </View>}

                <CartList navigation={this.props.navigation}/>
            </View>
        );
    }
}




const mapStateToProps = (state) => {


    return {
        cartList:state.login.cart,
        cartQuantity:state.login.cartQuantity,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        actions: {
            fetchAllMealData: bindActionCreators(fetchAllMealData, dispatch),

        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FoodCart);