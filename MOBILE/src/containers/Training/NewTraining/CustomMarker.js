import React, {Component} from 'react';
import { StyleSheet, View, Image } from 'react-native';
import colors from "../../../configs/colors";

export class CustomMarker extends Component {
  render() {
    return (
        <View>
             {/*  <Image*/}
              {/*  style={styles.image}*/}
              {/*  source={require('../../../assets/icons/slider-button.png')}*/}
              {/*  resizeMode="contain"*/}
                {/*/>*/}
            <View style={{width:20,height:20,backgroundColor:colors.red,borderRadius:50}}></View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    circle1: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: 'white',
        borderColor: 'gray',
        borderWidth:1,
        position:'absolute'
    },
    circle2: {
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: '#4eaa37',
        position:'absolute',
        justifyContent: 'center',
        alignSelf:'center',
        zIndex:1
    },
    container:{
        justifyContent: 'center',
        alignItems: 'center'
    },
    image:{
        width:30, height:30
    }
});
