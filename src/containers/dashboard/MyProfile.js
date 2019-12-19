import React from 'react';
import {View, Text} from 'react-native';

const MyProfile = props => {
  return (
    <View style={{flex: 1}}>
      <Text style={{margin: 20, fontSize: 20}}>
        Email: {props.userInfo.email}
      </Text>
      <Text style={{margin: 20, fontSize: 20}}>
        Name: {props.userInfo.firstName}
      </Text>
      <Text style={{margin: 20, fontSize: 20}}>
        Address: {props.userInfo.address}
      </Text>
      <Text style={{margin: 20, fontSize: 20}}>
        Gender: {props.userInfo.gender}
      </Text>
      <Text style={{margin: 20, fontSize: 20}}>
        Height: {props.userInfo.height}
      </Text>
      <Text style={{margin: 20, fontSize: 20}}>
        Weight: {props.userInfo.weight}
      </Text>
      <Text style={{margin: 20, fontSize: 20}}>
        Mobile No.: {props.userInfo.mobile}
      </Text>
      <Text style={{margin: 20, fontSize: 20}}>DOB: {props.userInfo.dob}</Text>
      <Text style={{margin: 20, fontSize: 20}}>DOJ: {props.userInfo.doj}</Text>
    </View>
  );
};

export default MyProfile;
