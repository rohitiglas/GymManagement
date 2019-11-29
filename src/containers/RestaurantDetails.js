import React, {Component} from 'react';
import {View, Text, Image, FlatList, TouchableOpacity} from 'react-native';
import {connect} from "react-redux";
import * as loginActions from '../actions/loginActions';
import {bindActionCreators} from "redux";
import {fetchMealDetails} from "../actions/loginActions";

class RestaurantDetails extends Component {
    constructor()
    {
        super();
        this.state={
            mealData:[],
            isLoading:false,
        }
    }
    componentDidMount() {
        this.setState({ isLoading: true })
        this.props.actions.fetchMealDetails('id',this.onSuccess, this.onError)

    }


    onSuccess = (data) => {

        this.setState({ mealData:data.meals,isLoading: false })
        // const { navigation } = this.props;
        // navigation.navigate('home');
    }
    onError = (error) => {




    }
    render() {
        return (
            <View style={{flex:1}}>
                <FlatList
                    data={this.state.mealData}
                    renderItem={({item}) =>
                        <TouchableOpacity style={{flex:1}}  onPress={()=>this.getListViewItem(item)}>
                            <View style={{margin:10,flex:1,alignItems:'center'}}>
                                <Image source={{uri:item.strMealThumb}}
                                       resizeMode='cover'
                                       style={{alignItems:'center',justifyContent:'center',
                                           width: '100%', height: 200}}/>





                                <Text style={{fontSize:14,marginLeft:20}}>{item.strMeal}</Text>
                                <Text style={{fontSize:14,marginLeft:20}}>{item.strCategory}</Text>
                                <Text style={{fontSize:14,marginLeft:20}}>{item.strArea}</Text>


                                <Text style={{fontSize:14,marginLeft:20}}>{item.strInstructions}</Text>



                            </View>
                        </TouchableOpacity>





                    }
                    ItemSeparatorComponent={this.renderSeparator}
                />

            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {}
}
const mapDispatchToProps = (dispatch) => {
    return {
        actions: {
            fetchMealDetails: bindActionCreators(fetchMealDetails, dispatch)
        }
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantDetails);