import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  PixelRatio,
  Platform,
  Button,
  Dimensions,
  Alert
} from 'react-native';
import YouTube, { YouTubeStandaloneIOS, YouTubeStandaloneAndroid } from 'react-native-youtube';
import YoutubePlayer from "react-native-yt-player";

function youtube_parser(url){
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    return (match&&match[7].length==11)? match[7] : false;
}

export default class ReactNativeYouTubeExample extends React.Component {
  state = {
    isReady: false,
    status: null,
    quality: null,
    error: null,
    isPlaying: true,
    isLooping: true,
    duration: 0,
    currentTime: 0,
    fullscreen: false,
    playerWidth: Dimensions.get('window').width,
  };

  _youTubeRef = React.createRef();

  render() {
    const videoId = youtube_parser("https://youtu.be/VkxBX6jIaPs");
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.welcome}>{'<YouTube /> component for React Native.'}</Text>

        <YouTube
          ref={this._youTubeRef}
          //apiKey="YOUR_API_KEY"
          videoId={videoId}
          play={true}
          loop={true}
          controls={1}
          showinfo={false}
          rel={false}
          modestbranding={true}
          style={[
            { height: PixelRatio.roundToNearestPixel(this.state.playerWidth / (16 / 9)) },
            styles.player,
          ]}
          onError={e => {
            Alert.alert("Informaion","Une erreur est servenue lors de la lecture du video",[
                {
                    text:"Ok",
                    onPress:()=>{}
                }
            ])
          }}

        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  buttonGroup: {
    flexDirection: 'row',
    alignSelf: 'center',
    paddingBottom: 5,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  player: {
    alignSelf: 'stretch',
    marginVertical: 10,
  },
});