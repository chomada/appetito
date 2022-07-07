import { View, Text, Image, StyleSheet } from 'react-native'
import Global from '../styles/Global';


const PasosItem = ({ item }) => {


  return (<View >
    <View style={styles.vista}>


      <Text style={Global.textBlack}>Paso {item.paso}</Text>

      <Text style={styles.cada}>{item.descripcion.replace(/^\w/, (c) => c.toUpperCase())}{' '}</Text>

    </View>
    <View style={{ marginLeft: 85, marginRight: 85 }}>
      {item.image!==null?<Image style={styles.image} source={{ uri: item.image }}

resizeMode="cover" />:<Image style={styles.image} source={require("./../assets/usuario.png")}

resizeMode="cover" />}
    </View>
    {/* <View style={{ marginLeft: 85, marginRight: 85 }}>
      {item.videoImage!==null?
      <Video style={styles.image} source={{ uri: item.videoImage }}

        resizeMode="cover" />:  <Video style={styles.image} source={require("./../assets/videoPrueba.mp4")}

        resizeMode="cover" />}
    </View> */}

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
    textAlign: 'left',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: 400,
    marginBottom: 20
  },
  cada: {
    textAlign: 'left',
    justifyContent: 'flex-start',
    alignItems: 'center',

  }
})