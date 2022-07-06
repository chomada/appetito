import React, { useContext, useState, useEffect } from 'react'
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
import RecetaItemBuscar from '../components/RecetaItemBuscar';

const Buscar2 = ({ navigation, route }) => {
  const { opcionBusqueda, busqueda } = route.params;
  const [antigua, setAntigua] = useState('Fecha');
  const [antigua2, setAntigua2] = useState('Usuario');

  const { recetas } = useContext(Menu);
  const [recetasFiltradas, setRecetasFiltradas] = useState([])
  useEffect(() => {
    (async () => {

      try {

        if (opcionBusqueda === 'Receta') {
          let getPorNombre = await GetRecetasPorNombreAPI(busqueda);
          setRecetasFiltradas(getPorNombre.data.recetas);

        } else if (opcionBusqueda === 'Tipo') {

          let getPorTipo = await GetRecetasPorTipoAPI(busqueda);
          setRecetasFiltradas(getPorTipo.data.recetas);

        } else if (opcionBusqueda === 'Ingrediente') {

          let getPorIngrediente = await GetRecetasPorIngredienteAPI(busqueda);
          setRecetasFiltradas(getPorIngrediente.data.recetas);

        } else if (opcionBusqueda === 'No Ingrediente') {

          let getPorNoIngrediente = await GetRecetasPorNoIngredienteAPI(busqueda);
          setRecetasFiltradas(getPorNoIngrediente.data.recetas);
        } else {
          let getPorUsuario = await GetRecetasPorUsuarioAPI(busqueda);
          setRecetasFiltradas(getPorUsuario.data.recetas);
        }


      } catch (error) {

        alert("No se encontraron resultados")
        navigation.navigate('Buscar')
      }




    })()

  }, [busqueda])
  const fnRenderItem = ({ item }) => {
    return <RecetaItemBuscar item={item} onSelected={handleDetail} />
  }
  const handleDetail = (item) => {

    navigation.navigate('Detalle', {
      id: item._id,

      item: item
    })
  }
  const ordenar = () => {
    if (antigua === 'Recientes ▲') {
      setAntigua('Antiguas ▼');
      function SortArray(x, y) {
        return x.createdAt.localeCompare(y.createdAt);
      }
      recetasFiltradas.sort(SortArray);


      recetas
    } else {
      setAntigua('Recientes ▲');
      function SortArray(x, y) {
        return y.createdAt.localeCompare(x.createdAt);
      }
      recetasFiltradas.sort(SortArray);
    }
    setAntigua2('Usuario');

  }
  const ordenar2 = () => {


    if (antigua2 === 'A - Z ▲') {
      setAntigua2('Z - A ▼');
      function SortArray(x, y) {
        return y.nombreUsuario.localeCompare(x.nombreUsuario);
      }
      recetasFiltradas.sort(SortArray);

      recetas
    } else {
      setAntigua2('A - Z ▲');
      function SortArray(x, y) {
        return x.nombreUsuario.localeCompare(y.nombreUsuario);
      }
      recetasFiltradas.sort(SortArray);
    }
    setAntigua('Fecha');

  }
  return (
    <View style={Global.container}>
      <View style={{   flexDirection: "row" }}>
        <TouchableOpacity style={[styles.btn, Global.shadows,{margin:5}]} onPress={ordenar}>
          <Text style={styles.textBlack}>
            {antigua}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, Global.shadows]} onPress={ordenar2}>
          <Text style={styles.textBlack}>
            {antigua2}
          </Text>
        </TouchableOpacity>
      </View>

      {recetasFiltradas.length !== 0 ?
        <FlatList
          data={recetasFiltradas}
          renderItem={fnRenderItem}
          keyExtractor={item => item._id}

        />
        :
        <ActivityIndicator size={"large"} color={"blue"} />
      }

    </View>
  )
}

export default Buscar2;

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