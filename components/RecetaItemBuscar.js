import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native'
import Global from '../styles/Global';
import { DeleteFavourite as DeleteFavouriteAPI } from '../controller/FavoriteController';
import { useContext, useEffect, useState } from 'react';
import { Menu } from '../context/MenuProvider';
import { CreateFavourite as CreateFavouriteAPI } from '../controller/FavoriteController';



const RecetaItemBuscar = ({ item, onSelected }) => {
  const { usuario, setUsuario } = useContext(Menu);

  const [fav, setFav] = useState(false)

  const agregarFav = async (event) => {


    try {
      let getFavourite = await CreateFavouriteAPI(usuario.email, item._id, item.nombreReceta, item.imagen, item.createdAt);
      if (getFavourite.rdo === 200) {
        //cambiar color
        setUsuario(getFavourite.user)
      }
      else {
        alert("Error al agregar favorito intente nuevamente")
      }

    } catch (error) {


    }

  }
  const sacarFav = async (event) => {
    try {
      let getFavourite = await DeleteFavouriteAPI(usuario.email, item._id);
      if (getFavourite.rdo === 200) {
        setUsuario(getFavourite.user)
      }
      else {
        alert("Error al borrar favorito intente nuevamente")
      }

    } catch (error) {


    }


  }
  useEffect(() => {

    (async () => {
      if (usuario.favorites.find(elemento => elemento.nameReceta === item.nombreReceta)) {
        setFav(true)
      } else {
        setFav(false)
      }



    })()

  }, [agregarFav, sacarFav])

  return (

    <View>{item.validada ?
      <View style={styles.DescIngrePre} >



        {fav ? <TouchableOpacity style={Global.like} onPress={sacarFav} >
          <Image source={require("./../assets/black.png")} style={{ width: 40, height: 40 }} />
        </TouchableOpacity> : <TouchableOpacity style={Global.like} onPress={agregarFav} >
          <Image source={require("./../assets/heart.png")} style={{ width: 40, height: 40 }} />
        </TouchableOpacity>}


        <TouchableOpacity
          activeOpacity={1}
          onPress={() => onSelected(item)}
        >
          {item.nombreReceta.length > 10 ? <Text style={styles.textBlackTitle} >{item.nombreReceta.replace(/^\w/, (c) => c.toUpperCase()).slice(0, 10)}...</Text> :
            <Text style={styles.textBlackTitle} >{item.nombreReceta.replace(/^\w/, (c) => c.toUpperCase())}</Text>}
          <Text style={Global.textBlack2} >{item.nombreUsuario.slice(0, 10).replace(/^\w/, (c) => c.toUpperCase())}</Text>
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
      </View> : <View >
        <Text style={{ textAlign: 'center' }}>{item.nombreReceta.replace(/^\w/, (c) => c.toUpperCase())}</Text>
        <Text style={styles.textBlackTitle}>receta pendiente de aprobacion</Text></View>
    }
    </View>

  )
}

export default RecetaItemBuscar;

const styles = StyleSheet.create({
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