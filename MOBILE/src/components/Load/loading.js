import { Modal, ActivityIndicator, View } from 'react-native'
import React, { Fragment, Component } from 'react';

class Loading extends Component {
    constructor(props) {
        super(props)

    }
    render() {
        return <Modal
            visible={this.props.load}
            onRequestClose={() => { }}
            transparent={true}
        >
            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: "#00000088", }}>
                <ActivityIndicator size={'large'} color='#aaaaaa' />
            </View>
        </Modal>
    }
}
export default Loading;