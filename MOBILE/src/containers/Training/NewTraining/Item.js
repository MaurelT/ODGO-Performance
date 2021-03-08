import React,{Component} from 'react';
import { StyleSheet, View, Text } from 'react-native';
import colors from "../../../configs/colors";

export class Item extends Component {

    checkActive =()=>{
        let a = this.props.value;
        let b = this.props.first;
        let c = this.props.second;
        if(a >= b && a <= c)
            return true
        else
            return false

    }

    renderborne(){

            console.warn('this.checkActive',this.checkActive);
                return(
                    <Text style={[ this.checkActive() ? styles.line : {}]}> { this.checkActive() ? <View style={{width:5,height:10,backgroundColor:colors.red}}></View> : <View style={{width:5,height:10,marginTop:20,backgroundColor:'#A5A5A5'}}></View>}</Text>
                )
        };

    render() {

        return (
            <View >
                {/*<Text style={ [ this.checkActive() ? styles.active : styles.inactive]}>{this.props.value}</Text>*/}
                {this.renderborne()}
            </View>
        );
    }



}

const styles = StyleSheet.create({
    active:{
        textAlign: 'center',
        // fontSize:20,
        bottom:10,
        color:'#5e5e5e',
    },
    inactive:{
        flex:1,
        textAlignVertical: 'center',
        textAlign: 'center',
        // fontWeight:'normal',
        color:'#bdc3c7',
    },
    line:{
        // fontSize:10,
        textAlign: 'center',
    }
});
