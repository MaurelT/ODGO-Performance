import React, { Component } from 'react';
import {
    View,
    TouchableOpacity,
    ScrollView,
    Text
} from 'react-native';
import baseStyles from '../../base/BaseStyles';
import AutoHeightImage from 'react-native-auto-height-image';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../configs/colors';
import {SET_ACTIVE_FP, SET_ACTIVE_TAB} from '../../redux/types/tabTypes';
import {connect} from 'react-redux';
import {screenWidth} from '../../components/react-native-calendars/src/expandableCalendar/commons';
import {getDashboar} from '../../apis/FonctionRedondant';
import dashboardHelper from '../../apis/helpers/dashboard_helper';


class Message extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listMessage: [0, 1, 2, 3, 4, 5]
        }
    }

    render() {
        return (
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[colors.balck, colors.green, colors.balck]} style={baseStyles.linearGradient}>

                <View style={{ alignItems :"center",justifyContent:"center",width:"100%",marginTop:15,marginBottom:15  }}>
                    <TouchableOpacity
                        onPress={() => {
                            const setActiveTabAction = { type: SET_ACTIVE_TAB, value: "profile" }
                            this.props.dispatch(setActiveTabAction)

                            const setActiveFPAction = { type: SET_ACTIVE_FP, value: -1 }
                            this.props.dispatch(setActiveFPAction)
                        }}
                        style={{width:50,position:"absolute",left:0}}
                    >
                        <AutoHeightImage
                            width={18}
                            source={require('../../assets/icons/arrow-white.png')}
                            style={{
                                marginLeft:15,
                                transform: [
                                    { rotateY: "180deg" }
                                ],
                            }}
                        />
                    </TouchableOpacity>
                    <Text style={[baseStyles.titleText,{textAlign:"center"}]}>
                        {"Mes messages"}
                    </Text>
                </View>

                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={[styles.contentContainerStyle]}>

                    {
                        this.state.listMessage.map((item, index) => {
                            return (
                                <TouchableOpacity>
                                    <View style={[styles.listBlock]}>
                                        <AutoHeightImage
                                            width={80}
                                            source={require("../../assets/icons/profile1.jpg")}

                                            style={{ borderRadius: 40, height: 80 }} />
                                        <View style={{ marginLeft: 20 }}>
                                            <Text style={[baseStyles.textColorWhite, { fontSize: 16 }]}>Nom Prénom</Text>
                                            <Text style={[baseStyles.textColorWhite, { fontSize: 12 }]}>Primi igitur omnium statuuntur aet...</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )
                        })
                    }

                </ScrollView>

            </LinearGradient>
        )
    }
}

// export default Message;
const mapStateToProps = (state) => {
    const { userToken } = state.statedata
    return { userToken  }
};

export default connect(mapStateToProps)(Message);
