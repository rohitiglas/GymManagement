import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  Animated,
  View,
  RefreshControl,
} from 'react-native';
import styles from './styles';
import React, {useState, useEffect} from 'react';

const MealList = props => {
  const [animatedValue, setAnimatedValue] = useState(new Animated.Value(0));
  useEffect(() => {
    Animated.spring(animatedValue, {
      toValue: 1,
      tension: 20,
      useNativeDriver: true,
    }).start();
  });
  return (
    <FlatList
      data={props.newProductData}
      refreshControl={
        <RefreshControl
          refreshing={props.isLoading}
          onRefresh={props.onRefreshProductData}
        />
      }
      renderItem={({item}) => {
        const {
          productName,
          productPrice,
          imageUrl,
          productId,
          qty,
          productType,
        } = item;

        const translateX = animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [1000, 1],
        });
        return (
          <Animated.View
            style={[styles.animateViewStyle, {transform: [{translateX}]}]}>
            <View style={styles.rowViewStyle}>
              <Image
                source={imageUrl}
                resizeMode="stretch"
                style={styles.imageStyle}
              />
              <Text style={styles.nameStyle}>{productName}</Text>
              <Text style={styles.priceStyle}>
                {productPrice}/{productType}
              </Text>
              {qty === 0 && (
                <TouchableOpacity
                  style={{flex: 1, height: '15%'}}
                  onPress={() => props.addProductFromCart(item, 1)}>
                  <View style={styles.plusMinusViewStyle2}>
                    <Text style={styles.addTextStyle}>ADD</Text>
                  </View>
                </TouchableOpacity>
              )}

              {qty > 0 && (
                <View style={styles.plusMinusViewStyle}>
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
              )}
            </View>
          </Animated.View>
        );
      }}
      numColumns={2}
      keyExtractor={item => item.idCategory}
    />
  );
};
export default MealList;
