import  React,{PureComponent} from 'react';
import {View, Text, Alert, Image,TouchableOpacity,ActivityIndicator,StatusBar} from 'react-native';
import { Avatar, Button, Card, Title, Paragraph ,Appbar} from 'react-native-paper';
import Header from "../../components/Header";
import Background from "../../components/Background";
import {ScrollView} from "react-native";
import {getToken, saveToken} from "../../utils/storage";
import {NavigationActions, StackActions} from "react-navigation";
import {bindActionCreators} from "redux";
import * as loginActions from "../../actions/loginActions";
import {connect} from "react-redux";
import {memo} from "react";
import MyTask from "./MyTask";
import {setAddItemToCart} from "../../actions/loginActions";
import {setRemoveItemToCart} from "../../actions/loginActions";
import ChangePassword from "./ChangePassword";
import {getTimeFromDate, ShowCurrentDate} from "../../components/GetCurrentDate";
import {setUserInfo} from "../../actions/loginActions";
import {setUserPunch} from "../../actions/loginActions";
import Loader from "../../components/Loader";
let myContext=null;


class Home extends PureComponent{
    constructor()
    {
        super();
        this.state={
            token:'',
            isLoading:true,
            attendance:{},
            userInfo:{},
            drawerRow:'Home',

            isAttendanceMark:false
        }

    }

    async componentDidMount()
    {
        let token=await getToken();




        this.props.actions.userProfile.userProfile({token:this.props.token},this.onSuccess,this.onError);

        this.setState({token:token})

    }






    onSuccess = (data) => {
        this.setState({isLoading:false})
    }

    onError = (error) => {

        this.setState({isLoading:false})
    }


    onPunchClick = async () => {
        this.setState({isLoading:true})
        this.props.actions.userPunch.userPunch({token:this.state.token},this.onSuccess,this.onError)

    }




     _goBack = () => this.props.navigation.openDrawer()

    render()
    {
        myContext=this;
        let isPunch=this.props.userPunch && Object.entries(this.props.userPunch).length === 0 && this.props.userPunch.constructor === Object;



        return(

            <View style={{flex:1}}>

                <Loader
                    loading={this.state.isLoading} />


                <View style={{height:60,width:'100%',flexDirection:'row',alignItems:'center',backgroundColor:'#FF5722'}}>
                    <TouchableOpacity onPress={this._goBack}>
                        <Image source={require('../../images/hamburger.png')}
                               style={{marginLeft:15,marginRight:20,width:20,height:20,tintColor:'#FFF'}}/>
                    </TouchableOpacity>

                    <Text  style={{fontSize:20,color:'#FFF',fontWeight:'bold'}}>{this.props.selectedRow?this.props.selectedRow:'Home'}</Text>
                </View>

                {this.props.selectedRow==='Home' &&
                <View style={{margin:20}}>
                    <Card style={{width:'100%'}}>

                        <View style={{marginTop:10,width:'100%',flexDirection:'row',justifyContent:'space-between'}}>
                            <Text style={{color:'#2116a8',fontSize:12,marginLeft:15}}>Mark Attendance</Text>
                            <Text style={{color:'#2116a8',fontSize:12,marginRight:15}}>Locate Me</Text>
                        </View>
                        <View style={{alignSelf:'center',marginTop:10,height:0.5,width:'90%',flexDirection:'row',backgroundColor:'#858d8c'}}/>

                        <Card onPress={this.onPunchClick}
                              style={{borderRadius:20,marginTop:20,alignItems:'center',
                                  alignSelf:'center',width:'70%',backgroundColor:!isPunch?'#2b88ff':'#fd2906'}}>
                            <Text style={{textAlign:'center',marginTop:15,color:'#FFFFFF',fontSize:12,}}>{ShowCurrentDate()}</Text>

                            {isPunch &&
                            <Text style={{textAlign:'center',marginTop:25,marginBottom:35,color:'#FFFFFF',fontSize:20,}}>No Time</Text>
                            }

                            {!isPunch &&
                            <View>
                                <Text style={{marginTop:15,color:'#FFFFFF',fontSize:16,}}>IN TIME :  {this.props.userPunch?getTimeFromDate(this.props.userPunch.checkInTime):''}</Text>
                                <Text style={{marginBottom:30,marginTop:5,color:'#FFFFFF',fontSize:16,}}>OUT TIME :  {this.props.userPunch?(this.props.userPunch.checkOutTime>0?getTimeFromDate(this.props.userPunch.checkOutTime):''):''}</Text>
                            </View>
                            }






                        </Card>

                        <Text style={{marginTop:15,textAlign:'center',color:'#525252',fontSize:12,marginLeft:15}}>Note: Tap above to mark attendance</Text>

                        <View style={{alignSelf:'center',marginTop:10,height:0.5,width:'90%',flexDirection:'row',backgroundColor:'#858d8c'}}/>

                        <View style={{marginBottom:10,marginTop:10,width:'100%',flexDirection:'row',justifyContent:'space-between'}}>
                            <Text style={{color:'#2116a8',fontSize:12,marginLeft:15}}>Apply Leave</Text>
                            <Text style={{color:'#2116a8',fontSize:12,marginRight:15}}>Apply On Duty</Text>
                        </View>


                    </Card>
                </View>
                }
                {this.props.selectedRow==='MyTask' &&
                <MyTask/>
                }

                {this.props.selectedRow==='ChangePassword' &&
                <ChangePassword/>}





            </View>


        )
    }

}




const mapStateToProps = (state) => {
    console.log("ksss--------------------Props",state.login)




    return {
        selectedRow:state.login.selectedDrawerRow,
        userInfo:state.login.userInfo,
        userPunch: state.login.userPunch
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: {
            setUserInfo:bindActionCreators(loginActions,dispatch),
            setUserPunch:bindActionCreators(loginActions,dispatch),
            userProfile: bindActionCreators(loginActions, dispatch),
            userPunch: bindActionCreators(loginActions, dispatch),
        }
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Home);








