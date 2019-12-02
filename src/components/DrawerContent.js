import React, { Component } from 'react';
import {NavigationActions, StackActions} from 'react-navigation';
import { Text, View, StyleSheet, ImageBackground,Image,TouchableOpacity } from 'react-native'
import { white } from 'ansi-colors';
import {saveToken} from "../utils/storage";
import {bindActionCreators} from "redux";
import * as loginActions from "../actions/loginActions";
import {connect} from "react-redux";
import {setAddItemToCart} from "../actions/loginActions";
import {setRemoveItemToCart,setSelectedDrawerRow} from "../actions/loginActions";

 class DrawerContent extends Component {

    logoutPress = async () => {
        saveToken("").then((isSuccess) => {
            if (isSuccess) {
                const { navigation } = this.props;
                const resetAction = StackActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({ routeName: 'LoginComponent' }),
                    ],
                });
                navigation.dispatch(resetAction);
                this.props.drawerSelectedRow("")
            }
        });

    }

    rowPress =(item) => {
        this.props.navigation.closeDrawer()
       this.props.drawerSelectedRow(item)

    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <ImageBackground source={require('../images/header.jpg')} style={{flex: 1,  justifyContent: 'center'}} >
                        <Text style={styles.headerText}>{this.props.userInfo?this.props.userInfo.firstName:'Rohit Bansal'}</Text>

                    </ImageBackground>
                </View>


                <TouchableOpacity  style={styles.screenContainer} onPress={()=>this.rowPress('Home')}>

                    <View style={styles.activeBackgroundColor}>
                        <Image source={require('../images/home.png')} style={{width:30,height:30}}/>
                        <Text style={styles.selectedTextStyle }>Home</Text>
                    </View>
                    <View style={{marginTop:5,width:'100%',height:1,backgroundColor:'#d3d3d3'}}/>


                </TouchableOpacity>

                <TouchableOpacity  style={styles.screenContainer} onPress={()=>this.rowPress('MyTask')}>
                    <View >
                        <View style={styles.activeBackgroundColor}>
                            <Image source={require('../images/task.png')} style={{width:30,height:30}}/>
                            <Text style={styles.selectedTextStyle}>My Task</Text>
                        </View>
                        <View style={{marginTop:5,width:'100%',height:1,backgroundColor:'#d3d3d3'}}/>

                    </View>
                </TouchableOpacity>

                <TouchableOpacity  style={styles.screenContainer} onPress={()=>this.rowPress('ChangePassword')}>
                    <View >
                        <View style={styles.activeBackgroundColor}>
                            <Image source={require('../images/change_password.png')} style={{width:30,height:30}}/>
                            <Text style={styles.selectedTextStyle }>Change Password</Text>
                        </View>
                        <View style={{marginTop:5,width:'100%',height:1,backgroundColor:'#d3d3d3'}}/>

                    </View>
                </TouchableOpacity>



                <TouchableOpacity  style={styles.screenContainer} onPress={this.logoutPress}>
                <View >
                    <View style={styles.activeBackgroundColor}>
                        <Image source={require('../images/logout.png')} style={{width:30,height:30}}/>
                        <Text style={styles.selectedTextStyle }>Logout</Text>
                    </View>
                    <View style={{marginTop:5,width:'100%',height:1,backgroundColor:'#d3d3d3'}}/>

                </View>
                </TouchableOpacity>



            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    headerContainer: {
        width:'100%',
        height: 150,
    },
    headerText: {
        marginLeft:10,
        fontSize:20,
        color: '#fff8f8',
    },
    screenContainer: {
        paddingTop: 20,
        width: '100%',
    },
    screenStyle: {
        height: 30,
        marginTop: 2,
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%'
    },
    screenTextStyle:{
        fontSize: 20,
        marginLeft: 20,
        textAlign: 'center'
    },
    selectedTextStyle: {
        margin:10,
        color: '#0a0a0a'
    },
    activeBackgroundColor: {
        marginLeft:20,
        alignItems:'center',
        flexDirection:'row',
    }
});


const mapStateToProps = (state) => {


    return {
        selectedRow:state.login.selectedDrawerRow,
        userInfo:state.login.userInfo
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        drawerSelectedRow: item => {
            dispatch(setSelectedDrawerRow(item))
        },

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent);