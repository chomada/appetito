import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native'
import Global from '../styles/Global';
import { DeleteFavourite as DeleteFavouriteAPI } from '../controller/FavoriteController';
import { useContext } from 'react';
import { Menu } from '../context/MenuProvider';


const RecetaItemFavoritos = ({ item, onSelected }) => {
  const { usuario,setUsuario } = useContext(Menu);

  const sacarFav = async (event) => {
    try {
      console.log("item: ",item)
      let getFavourite = await DeleteFavouriteAPI(usuario.email, item.idReceta);
      if (getFavourite.rdo === 200) {
        setUsuario(getFavourite.user)
      }
      else {
        alert("Error al borrar favorito intente nuevamente")
      }

    } catch (error) {


    }


  }
  return (
  
  <View style={styles.DescIngrePre} >



    
<TouchableOpacity style={Global.like} onPress={sacarFav} >
      <Image source={require("./../assets/black.png")} style={{ width: 40, height: 40 }} />
    </TouchableOpacity>


    <TouchableOpacity
      activeOpacity={1}
      onPress={() => onSelected(item)}
    >
      {item.nameReceta.length>10?<Text style={styles.textBlackTitle} >{item.nameReceta.replace(/^\w/, (c) => c.toUpperCase()).slice(0,10)}...</Text>:
      <Text style={styles.textBlackTitle} >{item.nameReceta.replace(/^\w/, (c) => c.toUpperCase())}</Text>}
<Text style={Global.textBlack2} >{item.createdAt.slice(0,10)}</Text>
    </TouchableOpacity>

    <TouchableOpacity
      activeOpacity={1}
      onPress={() => onSelected(item)}
    >
      <View>

        <Image style={styles.image} source={{ uri: item.image }}

          resizeMode="cover" />
      </View>

    </TouchableOpacity>
  </View>
  

  )
}

export default RecetaItemFavoritos;

const styles = StyleSheet.create({
  image: {
    height: 100,
    width: 100,
    resizeMode: 'cover'
  },
  DescIngrePre: {
    margin:2,
    padding: 5,
    width: 410,
    backgroundColor: 'white',

    flexDirection: "row",
    textAlign: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius:15

  },
  textBlackTitle: {
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize:20,
    
  },
  like:{
    padding:10,
    paddingTop:25,
    paddingBottom:25,
    
    
    borderTopWidth:0,
    borderLeftWidth:0,
    borderBottomWidth:0,
    borderRightWidth: 5,
      },
})