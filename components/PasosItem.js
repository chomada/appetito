import * as React from 'react';

import { View, Text, Image, StyleSheet, Button } from 'react-native'
import Global from '../styles/Global';
import { Video, AVPlaybackStatus } from 'expo-av';
//import Video from 'react-native-video';


const PasosItem = ({ item }) => {

  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});

  return (
    <View >
      <View style={styles.vista}>


        <Text style={Global.textBlack}>Paso {item.paso}</Text>


        <View style={{ marginTop: 10 }}>
          <Text style={styles.cada}>
            {item.descripcion.replace(/^\w/, (c) => c.toUpperCase())}        </Text>
        </View>

      </View>
      <View style={{ marginLeft: 85, marginRight: 85 }}>
        {item.image !== null ? <Image style={styles.image} source={{ uri: item.image }}

          resizeMode="cover" /> : null}
      </View>

    {item.videoImage!==null? <View><Video
        ref={video}
        style={{

          height: 250,
          resizeMode: 'cover'
        }}
        source={{
          uri: item.videoImage
        }}
        useNativeControls
        resizeMode="contain"
        isLooping
        onPlaybackStatusUpdate={status => setStatus(() => status)}
      />
      <View style={styles.buttons}>
        <Button
          title={status.isPlaying ? 'Pause' : 'Play'}
          onPress={() =>
            status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
          }
        />
      </View></View>:null}
     


    </View>


  )
}

export default PasosItem;

const styles = StyleSheet.create({
  image: {
    height: 200,
    width: 200,
    marginBottom: 50,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ead5b4',

  },
  vista: {
    padding: 2,
    backgroundColor: 'white',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: 360,
    marginBottom: 20
  },
  cada: {
    textAlign: 'left',
    justifyContent: 'flex-start',
    alignItems: 'center',

  }
})