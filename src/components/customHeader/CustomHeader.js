
import Icon from 'react-native-vector-icons/FontAwesome';
import React from "react";
import { View } from "react-native";

import styles from "./styles";

const CustomHeader = ({ navigation }) => (
    <View style={{marginTop:10,width:'100%',flexDirection:'row'}}>
        <Icon
            name="align-justify"
            size={32}
            color="black"
            onPress={() => navigation.openDrawer()}
        />
    </View>
);

export default CustomHeader;