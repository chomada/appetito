import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native'
import Global from '../styles/Global';
import { useContext } from 'react';
import { Menu } from '../context/MenuProvider';



const RecetaItemPersonalizada = ({ item, onSelected,borrado }) => {
  const { usuario, setUsuario, recetasPersonalizadas } = useContext(Menu);




  return (

 
      <View style={styles.DescIngrePre} >



        <TouchableOpacity style={styles.borrar} onPress={() =>borrado(item._id)} >
          <Text style={{
            
            fontWeight: 'bold',
            color: 'white',
            
    
            
          }}>X</Text>
        </TouchableOpacity>


        <TouchableOpacity
          activeOpacity={1}
          onPress={() => onSelected(item)}
        >
          {item.nombreReceta.length > 10 ? <Text style={styles.textBlackTitle} >{item.nombreReceta.replace(/^\w/, (c) => c.toUpperCase()).slice(0, 10)}...</Text> :
            <Text style={styles.textBlackTitle} >{item.nombreReceta.replace(/^\w/, (c) => c.toUpperCase())}</Text>}
          <Text style={Global.textBlack2} >{item.nombreUsuario.slice(0, 10)}</Text>
          <Text style={Global.textBlack2} >{item.createdAt.slice(0, 10)}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={1}
          onPress={() => onSelected(item)}
        >
          <View>

            <Image style={styles.image} source={{ uri: item.imagen }}

              resizeMode="cover" />
          </View>

        </TouchableOpacity>
      </View>

  )
}

export default RecetaItemPersonalizada;

const styles = StyleSheet.create({
  borrar:{
    backgroundColor:'red',
     padding:10, 
     paddingRight:15,
     paddingLeft:15,
     marginLeft:5,
     borderRadius: 10,

  },
  image: {
    height: 100,
    width: 100,
    resizeMode: 'cover'
  },
  DescIngrePre: {
    margin: 2,
    padding: 5,
    width: 410,
    backgroundColor: 'white',

    flexDirection: "row",
    textAlign: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 15

  },
  textBlackTitle: {
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,

  },
  like: {
    padding: 10,
    paddingTop: 25,
    paddingBottom: 25,


    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
    borderRightWidth: 5,
  },
})