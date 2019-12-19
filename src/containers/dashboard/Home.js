import  React,{PureComponent} from 'react';
import {View, Text, Image,TouchableOpacity} from 'react-native';
import {getToken} from "../../utils/storage";
import {bindActionCreators} from "redux";
import * as loginActions from "../../actions/loginActions";
import {connect} from "react-redux";
import MyTask from "./MyTask";
import ChangePassword from "./ChangePassword";
import Loader from "../../components/Loader";
import Attendance from "./Attendance";
import MyStatusBar from "../../components/StatusBarColor";
import MyPlan from "./MyPlan";
import MyProfile from "./MyProfile";


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



        return(

            <View style={{flex:1}}>
                <MyStatusBar backgroundColor='#FF5722' barStyle="light-content" />

                <Loader
                    loading={this.state.isLoading} />




                <View style={{height:60,width:'100%',flexDirection:'row',alignItems:'center',backgroundColor:'#FF5722'}}>
                    <TouchableOpacity onPress={this._goBack}>
                        <Image source={require('../../images/hamburger.png')}
                               style={{marginLeft:15,marginRight:20,width:20,height:20,tintColor:'#FFF'}}/>
                    </TouchableOpacity>

                    <Text
                        style={{fontSize:20,color:'#FFF',fontWeight:'bold'}}>{this.props.selectedRow?this.props.selectedRow:'Home'}
                    </Text>
                </View>

                {this.props.selectedRow==='Home' &&

                        <Attendance onPunchClick={this.onPunchClick} userPunch={this.props.userPunch}/>


                }
                {this.props.selectedRow==='MyTask' &&
                <MyTask myTask={this.props.myTask}/>
                }

                {this.props.selectedRow==='ChangePassword' &&
                <ChangePassword/>}

                {this.props.selectedRow==='MyPlan' &&
                <MyPlan  myPlan={this.props.myPlan}/>}

                {this.props.selectedRow==='MyProfile' &&
                <MyProfile  userInfo={this.props.userInfo}/>}
            </View>

        )
    }

}




const mapStateToProps = (state) => {


    return {
        selectedRow:state.login.selectedDrawerRow,
        userInfo:state.login.userInfo,
        userPunch: state.login.userPunch,
        myPlan: state.login.myPlan,
        myTask: state.login.myTask,
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








