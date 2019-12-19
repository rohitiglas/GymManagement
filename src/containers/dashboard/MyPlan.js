import React from 'react';
import {View, Text} from 'react-native';
const MyPlan = props => (
  <View style={{flex: 1}}>
    <Text style={{margin: 20, fontSize: 20}}>Name: {props.myPlan.name}</Text>
    <Text style={{margin: 20, fontSize: 20}}>
      Details: {props.myPlan.details}
    </Text>
    <Text style={{margin: 20, fontSize: 20}}>
      Duration: {props.myPlan.months}
    </Text>
    <Text style={{margin: 20, fontSize: 20}}>Rate: {props.myPlan.rate}</Text>
  </View>
);

export default MyPlan;
