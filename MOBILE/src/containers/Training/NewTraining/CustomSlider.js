import React, {Component} from 'react';
import {StyleSheet,Text,View, Dimensions,TouchableOpacity} from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { CustomMarker } from './CustomMarker';
import { Item } from './Item';
import colors from "../../../configs/colors";
import {TouchableEffect} from 'react-native-simple-dialogs';

export class CustomSlider extends Component{

    constructor(props) {
        super(props);
        this.state = {
          multiSliderValue: [this.props.min, this.props.max],
          first: this.props.min,
          second: this.props.max,
         //   actualisation:false,
        }

    }

    componentDidMount() {
       this.multiSliderValuesChange([0])
    }


    render() {
        return (
            <View>
                <View style={[styles.column,{
                    // marginLeft:this.props.LRpadding,marginRight:this.props.LRpadding
                }]}>
                    {this.renderScale()}
                </View>
                <View style={styles.container}>

                    <MultiSlider
                        trackStyle={{backgroundColor:'#A5A5A5',height:4.5}}
                        selectedStyle={{backgroundColor:colors.red,height:4.5}}
                        // values={ this.props.single ? [this.state.multiSliderValue[0]] : [this.state.multiSliderValue[0],this.state.multiSliderValue[1]]}
                        values={this.props.valueOffstetNumber()}
                        sliderLength={Dimensions.get('window').width-this.props.LRpadding}
                       onValuesChange={this.multiSliderValuesChange}
                        min={this.props.min}
                        max={this.props.max}
                        step={1}
                        allowOverlap={false}
                        customMarker={CustomMarker}
                        snapped={true}
                    />

                </View>
            </View>
        );
    }

    multiSliderValuesChange = values => {
            if(this.props.single ){
                this.setState({
                    second : values[0],
                })
                this.props.callback(values)
            }else{
                this.setState({
                    multiSliderValue: values,
                    first : values[0],
                    second : values[1],
                })
            }
            this.props.callback(values)
    };

    renderScale=()=> {
        const items = [];
        for (let i=this.props.min; i <= this.props.max; i++) {

            items.push(
                <TouchableOpacity
                    onPress={()=>{
                        this.props.callback(this.state.multiSliderValue)
                    }}
                >
                <Item
                    value = {i}
                    first = {this.state.first}
                    second = {this.state.second}
                />
                </TouchableOpacity>
            );
        }
        return items;
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    column:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent: 'space-between',
         bottom:-34, // ty manova espacement marquer et slider
    },
    active:{
        textAlign: 'center',
        // fontSize:20,
        color:'#5e5e5e',
    },
    inactive:{
        textAlign: 'center',
        // fontWeight:'normal',
        color:'#bdc3c7',
    },
    line:{
        textAlign: 'center',
    }
});
