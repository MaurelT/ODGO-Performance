import React, { Component } from 'react';
import {
} from 'react-native';


class BaseComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[colors.balck, colors.green, colors.balck]} style={baseStyles.linearGradient}>

      </LinearGradient>
    )
  }
}

export default BaseComponent;