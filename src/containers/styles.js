import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        flex:1,
        width:'100%',
        height: 200,
    },
    imageStyle:{alignSelf:'center',width: '90%', height: 150,
        borderWidth: 1,
        borderRadius: 2,
        borderColor: "#ddd",
        borderBottomWidth: 0,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,},
    nameStyle:{marginTop:10,textAlign:'center',color:'#0a0a0a',fontSize:16},
    addViewStyle:{marginTop:10,width:'60%',
        paddingTop:5,paddingBottom:5,paddingLeft:10,paddingRight:10,justifyContent:'center',alignItems:'center',
        borderWidth:1,borderColor:'#d3d3d3',flexDirection:'row'},

    plusMinusViewStyle:{marginTop:10,width:'70%',paddingTop:5,
        paddingBottom:5,paddingLeft:10,paddingRight:10,justifyContent:'space-between',alignItems:'center',
        borderWidth:1,borderColor:'#d3d3d3',flexDirection:'row'},
    plusView:{alignItems:'center',justifyContent:'center'},




    addTextStyle:{textAlign:'center',fontSize:12,color:'#2e8d0c'},
    plusTextStyle:{fontSize:14,color:'#696969'},
    minusTextStyle:{fontSize:14,color:'#696969'},
    rowViewStyle:{

        alignSelf:'center',
        alignItems:'center',
        justifyContent:'center',


        margin:20,flex:1,
        width: '90%',},
    animateViewStyle:{

        flex:1,
        width: '90%',},
    cartRowViewStyle:{
        flexDirection:'row',

        alignSelf:'center',
        alignItems:'center',
        justifyContent:'center',


        margin:20,flex:1,
        width: '80%',},

    cartImageStyle:{marginLeft:20,alignSelf:'center',width: 100, height: 100,
        borderWidth: 1,
        borderRadius: 2,
        borderColor: "#ddd",
        borderBottomWidth: 0,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,},
    cartPlusMinusViewStyle:{alignSelf:'center',marginLeft:20,marginTop:10,width:'50%',paddingTop:5,
        paddingBottom:5,paddingLeft:10,paddingRight:10,justifyContent:'space-between',alignItems:'center',
        borderWidth:1,borderColor:'#d3d3d3',flexDirection:'row'},
});

export default styles;