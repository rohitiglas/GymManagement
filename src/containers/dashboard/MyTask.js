import React from 'react';
import {View, Text} from 'react-native';

const MyTask = props => (
  <View style={{flex: 1}}>
    <Text style={{margin: 20, fontSize: 20}}>Name: {props.myTask.name}</Text>
    <Text style={{margin: 20, fontSize: 20}}>Steps: {props.myTask.staps}</Text>
    <Text style={{margin: 20, fontSize: 20}}>
      Duration: {props.myTask.times}
    </Text>
  </View>
);

export default MyTask;
