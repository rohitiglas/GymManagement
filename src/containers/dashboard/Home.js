import * as React from 'react';
import {View,Text,Alert} from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import Header from "../../components/Header";
import Background from "../../components/Background";
import {ScrollView} from "react-native";

const Home = () => {

    const onPunchClick = async () => {
        Alert.alert('','Hello Rohit')

    }
    return(

        <View style={{flex:1}}>

            <View style={{flex:1,margin:20}}>
                <Card style={{width:'100%'}}>

                    <View style={{marginTop:10,width:'100%',flexDirection:'row',justifyContent:'space-between'}}>
                        <Text style={{color:'#2116a8',fontSize:12,marginLeft:15}}>Mark Attendance</Text>
                        <Text style={{color:'#2116a8',fontSize:12,marginRight:15}}>Locate Me</Text>
                    </View>
                    <View style={{alignSelf:'center',marginTop:10,height:0.5,width:'90%',flexDirection:'row',backgroundColor:'#858d8c'}}/>

                    <Card onPress={onPunchClick}
                          style={{borderRadius:20,marginTop:20,alignItems:'center',
                              alignSelf:'center',width:'70%',backgroundColor:'#2b88ff'}}>
                        <Text style={{textAlign:'center',marginTop:15,color:'#FFFFFF',fontSize:12,}}>Thu 28 Nov, 2019</Text>
                        <Text style={{textAlign:'center',marginTop:15,color:'#FFFFFF',fontSize:16,}}>IN TIME:  09:59 AM</Text>
                        <Text style={{textAlign:'center',marginBottom:30,marginTop:5,color:'#FFFFFF',fontSize:16,}}>OUT TIME:  07:00 AM</Text>

                    </Card>

                    <Text style={{marginTop:15,textAlign:'center',color:'#525252',fontSize:12,marginLeft:15}}>Note: Tap above to mark attendance</Text>

                    <View style={{alignSelf:'center',marginTop:10,height:0.5,width:'90%',flexDirection:'row',backgroundColor:'#858d8c'}}/>

                    <View style={{marginBottom:10,marginTop:10,width:'100%',flexDirection:'row',justifyContent:'space-between'}}>
                        <Text style={{color:'#2116a8',fontSize:12,marginLeft:15}}>Apply Leave</Text>
                        <Text style={{color:'#2116a8',fontSize:12,marginRight:15}}>Apply On Duty</Text>
                    </View>


                </Card>
            </View>
        </View>


    )
}








export default Home;