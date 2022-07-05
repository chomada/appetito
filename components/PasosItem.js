import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native'
import Global from '../styles/Global';


const PasosItem = ({ item }) => {


  return (<View >
    <View style={styles.vista}>


      <Text style={Global.textBlack}>Paso {item.paso}</Text>

      <Text style={styles.cada}>{item.descripcion}{' '}</Text>
     
      </View>
      <View style={{marginLeft:85,marginRight:85}}>
      <Image style={styles.image} source={{ uri: item.image }}

                resizeMode="cover" />
      </View>
      
    </View>


  )
}

export default PasosItem;

const styles = StyleSheet.create({
  image: {
    height: 200,
    width:200,
    marginBottom:50,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ead5b4',
    
  },
  vista: {
    padding:2,
    backgroundColor:'white',
    textAlign: 'left',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width:400,
    marginBottom:20
  },
  cada:{
    textAlign: 'left',
    justifyContent: 'flex-start',
    alignItems: 'center',

  }
})