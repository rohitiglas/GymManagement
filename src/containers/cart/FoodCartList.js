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

const CartList = props => {
  return (
    <FlatList
      data={props.orderKeys}
      renderItem={({item}) => {
        const {
          productType,
          productName,
          productPrice,
          imageUrl,
          productId,
          qty,
        } = props.orderData[item];
        return (
          <View style={{width: '100%', justifyContent: 'space-between'}}>
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
                <Text style={styles.nameStyle}>
                  {productName} ({qty}
                  {productType})
                </Text>
                <Text style={styles.priceStyle}>₹{productPrice * qty}</Text>
              </View>
            </View>
            {item.quantity !== 0 && (
              <View
                style={{
                  alignSelf: 'flex-end',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View style={styles.cartPlusMinusViewStyle}>
                  <TouchableOpacity
                    onPress={() => props.addItem(item, qty, productId)}>
                    <View style={styles.plusView}>
                      <Text style={styles.plusTextStyle}>+</Text>
                    </View>
                  </TouchableOpacity>
                  <View style={styles.plusView}>
                    <Text style={styles.addTextStyle}>{qty}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => props.removeItem(item, qty, productId)}>
                    <View style={styles.plusView}>
                      <Text style={styles.plusTextStyle}>-</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            )}
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
)(CartList);
