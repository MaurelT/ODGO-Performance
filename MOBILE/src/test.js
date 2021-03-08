// Components/Test.js

import React from "react";
import { StyleSheet, View, Animated, Easing } from "react-native";

class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topPosition: new Animated.Value(0)
    };
  }

  componentDidMount() {
    // Animated.timing(this.state.topPosition, {
    //   toValue: 100,
    //   duration: 1000, // Le temps est en milliseconds ici (3000ms = 3sec)
    //   easing: Easing.bounce
    // }).start(); // N'oubliez pas de lancer votre animation avec la fonction start()

    Animated.spring(this.state.topPosition, {
      toValue: 100,
      speed: 4,
      bounciness: 30
    }).start();

    // Animated.decay(this.state.topPosition, {
    //   velocity: 1,
    //   deceleration: 0.997
    // }).start();
  }

  render() {
    return (
      <View style={styles.main_container}>
        <Animated.View
          style={[styles.animation_view, { top: this.state.topPosition }]}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center"
  },
  animation_view: {
    backgroundColor: "red",
    width: 100,
    height: 100
  }
});

export default Test;
