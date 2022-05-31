
import {View, Text,Image,TouchableOpacity} from 'react-native';
const Detalle = ({ route}) => {

  const {item} = route.params;
  
  const handleAdd = () => {
    alert("algo")
  }

  return (
      <View>
          <Text>{item.nombre}</Text>
          <Image source ={{uri: item.imagen}}
              style = {{
              height: 200,
              width: '95%',
            }}
            resizeMode = "cover"/>
            <TouchableOpacity onPress={handleAdd}>
            <Text>Boton</Text>
          </TouchableOpacity>
      </View>
  )
}

export default Detalle