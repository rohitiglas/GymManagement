import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import styles from '../styles';
import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';

import {
  setAddItemToCart,
  setRemoveItemToCart,
} from '../../actions/loginActions';

// const addItem = (item, props, quantity) => {
//   let value = quantity + 1;
//   props.addItemToCart(Object.assign(item, {quantity: value}));
// };
// const removeItem = (item, props, quantity) => {
//   let value = quantity - 1;
//   props.removeItemToCart(Object.assign(item, {quantity: value}));
// };

const OrderList = props => {
  return (
    <FlatList
      data={props.orderKeys}
      renderItem={({item}) => {
        const {
          productName,
          productPrice,
          totalPrice,
          shopName,
          shopAddress,
          shopMobile,
          orderData,
          imageUrl,
          productId,
          qty,
        } = props.orderData[item];
        return (
          <View style={{width: '100%', justifyContent: 'space-between'}}>
            {orderData.map(item => {
              return (
                <View style={styles.cartRowViewStyle}>
                  <Image
                    source={imageUrl}
                    resizeMode="stretch"
                    style={styles.cartImageStyle}
                  />

                  <View
                    style={{
                      marginLeft: 20,
                      marginTop: 10,
                      flexDirection: 'column',
                      justifyContent: 'center',
                    }}>
                    <Text style={styles.nameStyle}>{item.productName}</Text>
                    <Text style={styles.priceStyle}>
                      Qty : {item.productQty}
                      {item.productType}
                    </Text>
                  </View>
                  <View
                    style={{
                      marginLeft: 20,
                      marginTop: 10,
                      flexDirection: 'column',
                      justifyContent: 'center',
                    }}>
                    <Text style={styles.priceStyle}>₹{item.productPrice}</Text>
                  </View>
                </View>
              );
            })}
            <Text
              style={{
                marginTop: 20,
                marginBottom: 20,
                textAlign: 'center',
                fontSize: 20,
              }}>
              Total : ₹{totalPrice}
            </Text>
            <Text
              style={{
                marginTop: 20,
                marginBottom: 20,
                textAlign: 'center',
                fontSize: 20,
              }}>
              Name : {shopName}
            </Text>
            <Text
              style={{
                marginTop: 20,
                marginBottom: 20,
                textAlign: 'center',
                fontSize: 20,
              }}>
              Phone No. : {shopMobile}
            </Text>
            <Text
              style={{
                marginTop: 20,
                marginBottom: 20,
                textAlign: 'center',
                fontSize: 20,
              }}>
              Address : {shopAddress}
            </Text>
            <View
              style={{
                alignSelf: 'center',
                width: '90%',
                height: 1,
                backgroundColor: 'rgba(187,177,177,0.66)',
              }}
            />
          </View>
        );
      }}
      numColumns={1}
    />
  );
};

const mapStateToProps = state => {
  return {
    allMealData: state.login.allMealData,
    cartList: state.login.cart,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    addItemToCart: item => {
      dispatch(setAddItemToCart(item));
    },
    removeItemToCart: item => {
      dispatch(setRemoveItemToCart(item));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrderList);
