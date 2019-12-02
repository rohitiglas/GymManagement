import React, {Component} from 'react';
import {View,Text} from 'react-native'

class MyTask extends Component {
    render() {
        return (
            <View style={{alignItems:'center',justifyContent:'center',flex:1}}>
                <Text style={{fontSize:20}}>My Task</Text>

            </View>
        );
    }
}

export default MyTask;