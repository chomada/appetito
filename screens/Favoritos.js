import React, { useContext, useState } from 'react'
import { StyleSheet, ActivityIndicator, FlatList, View, Text, TouchableOpacity } from 'react-native';
import Global from '../styles/Global';
import { Menu } from '../context/MenuProvider';
import {
  GetRecetasPorIngrediente as GetRecetasPorIngredienteAPI,
  GetRecetasPorNoIngrediente as GetRecetasPorNoIngredienteAPI,
  GetRecetasPorNombre as GetRecetasPorNombreAPI,
  GetRecetasPorTipo as GetRecetasPorTipoAPI,
  GetRecetasPorUsuario as GetRecetasPorUsuarioAPI
} from '../controller/BusquedaController';
import RecetaItemFavoritos from '../components/RecetaItemFavoritos';

const Favoritos = ({ navigation, route }) => {
  const [antigua, setAntigua] = useState('Ordenar');

  const { usuario } = useContext(Menu);

  const fnRenderItem = ({ item }) => {
    return <RecetaItemFavoritos item={item} onSelected={handleDetail} />
  }
  const handleDetail = (item) => {

    navigation.navigate('Detalle', {
      id: item.idReceta,

      item: item
    })
  }
  const ordenar = () => {
    if (antigua === 'Recientes ▲') {
      setAntigua('Antiguas ▼');
      function SortArray(x, y) {
        return x.createdAt.localeCompare(y.createdAt);
      }
      usuario.favorites.sort(SortArray);


      recetas
    } else {
      setAntigua('Recientes ▲');
      function SortArray(x, y) {
        return y.createdAt.localeCompare(x.createdAt);
      }
      usuario.favorites.sort(SortArray);
    }
  }
  return (
    <View style={Global.container}>

      {usuario.favorites.length !== 0 ?<TouchableOpacity style={[styles.btn, Global.shadows]} onPress={ordenar}>
        <Text style={styles.textBlack}>
          {antigua}
        </Text>
      </TouchableOpacity>:null}
      {usuario.favorites.length !== 0 ?
        <FlatList
          data={usuario.favorites}
          renderItem={fnRenderItem}
          keyExtractor={item => item._id}

        />
        :
        <Text style={styles.textBlack} >No posee favoritos...</Text>
      }

    </View>
  )
}

export default Favoritos;

const styles = StyleSheet.create({

  busquedaItem: {
    flexDirection: "row",
  },
  itemTextImageIzq: {
    margin: 20,
    marginRight: 30
  },
  itemTextImageDer: {
    margin: 20,
    marginLeft: 30
  },
  barraBusqueda: {
    flexDirection: 'row'
  },
  botonBusqueda: {
    padding: 10,
    backgroundColor: 'orange',
    borderRadius: 15,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    justifyContent: 'center',
  },
  btn: {
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: '#FB9906',
    borderRadius: 15,
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    width: 110,
    padding: 10
  },
  textBlack: {
    color: 'black',
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  },

})