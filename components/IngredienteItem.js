import { View, Text, TouchableOpacity, Button, StyleSheet, Dimensions } from 'react-native'
import Global from '../styles/Global';

const { width, height } = Dimensions.get('window');

const IngredienteItem = ({ item, eliminar,valida, valida2,edicion}) => {


  return (

    <View style={styles.vista}>
      <View style={{ backgroundColor:'white', padding:2,width:250, flexDirection: "row" }}>
        <Text >■{' '}{item.cantidad}{' '}</Text>

        <Text >{item.unidad}{' de '}</Text>
        <Text >{item.ingrediente}</Text>
      </View>

      {valida?<TouchableOpacity style={styles.edicion}onPress={()=>edicion(item)}
        

        ><Text style={{
            
          fontWeight: 'bold',
          color: 'white',
          
  
          
        }}>Modificar</Text>
  
        </TouchableOpacity>

    :null}
    {valida2?  <TouchableOpacity style={styles.borrar} onPress={()=>eliminar(item.ingrediente)}
        

        ><Text style={{
            
          fontWeight: 'bold',
          color: 'white',
          
  
          
        }}>X</Text>
  
        </TouchableOpacity>:null}

    </View>


  )
}

export default IngredienteItem;

const styles = StyleSheet.create({
  borrar:{
    backgroundColor:'red',
     padding:10, 
     paddingRight:15,
     paddingLeft:15,
     marginLeft:5,
     borderRadius: 10,

  },
  edicion:{
    backgroundColor:'green',
    padding:10, 
    marginLeft:5,
     borderRadius: 10,


  },
  image: {
    height: 250,
    width,
    resizeMode: 'cover'
  },
  vista: {
    marginTop:5,
   marginLeft:25,
   marginRight:25,
    flexDirection: "row",
    textAlign: 'left',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  

})