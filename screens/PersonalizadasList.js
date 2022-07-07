import React, { useContext, useState, useEffect } from 'react'
import { StyleSheet, ActivityIndicator, FlatList, View, Text, TouchableOpacity } from 'react-native';
import Global from '../styles/Global';
import { Menu } from '../context/MenuProvider';

import AsyncStorage from '@react-native-async-storage/async-storage';
import RecetaItemPersonalizada from '../components/RecetaItemPersonalizada';

const PersonalizadasList = ({ navigation, route }) => {

  const { recetasPersonalizadas,borrado ,setRecetasPersonalizadas} = useContext(Menu);

 
  const handleDetail = (item) => {

    navigation.navigate('DetallePersonalizado', {
      id: item._id,

      item: item
    })
  }
   const fnRenderItem = ({ item }) => {
    return <RecetaItemPersonalizada borrado={borrado}item={item} onSelected={handleDetail} />
  }

  const traerRece=async()=>{
    const rece = await AsyncStorage.getItem('recetasPersonalizadas');
    const nuevasRecetas = JSON.parse(rece)
    console.log("esto trae del local:",nuevasRecetas)

     if(nuevasRecetas!==null){
       setRecetasPersonalizadas(nuevasRecetas);


     }


  }
  useEffect(() => {
    (async ()=>{
 
      traerRece()
      
  })()

    

  }, [])
  return (
    <View style={Global.container}>
     

      {recetasPersonalizadas.length !== 0 ?
        <FlatList
          data={recetasPersonalizadas}
          renderItem={fnRenderItem}
          keyExtractor={item => item._id}

        />
        :
        <Text styles={Global.textBlack}>No tiene recetas personalizadas</Text>
      }

    </View>
  )
}

export default PersonalizadasList;

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