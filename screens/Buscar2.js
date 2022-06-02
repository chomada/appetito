import React, { useContext, useState,useEffect } from 'react'
import { StyleSheet, ActivityIndicator,FlatList, View } from 'react-native';
import Global from '../styles/Global';
import {Menu} from '../context/MenuProvider';
import RecetaItem from '../components/RecetaItem';

const Buscar2 = ({navigation, route}) => {
  const { opcionBusqueda,busqueda } = route.params;
  const {recetas} = useContext(Menu);
  const [recetasFiltradas, setRecetasFiltradas] = useState([])
//aca deberiamos llamar a la api que filtra por la opcion elegida, y pasarle la busqueda, por ejemplo opcionBusqueda=tipo y busqueda=desayuno
  useEffect(()=> {

    (async ()=>{
      if (opcionBusqueda=='tipo'){
        const recetaFilter = recetas.filter(recet => recet.tipo === busqueda)
        setRecetasFiltradas(recetaFilter);

      }
    
    })()

  }, [busqueda])
  const fnRenderItem = ({ item }) => {
    return <RecetaItem item={item}  onSelected={handleDetail}/>
  }
  const handleDetail = (item) => {


    navigation.navigate('Detalle', {
      id: item.id,
      
      item: item
    })
  }
  return (
    <View style ={Global.container}>
              

      {recetasFiltradas.length !== 0 ?
        <FlatList
          data={recetasFiltradas}
          renderItem={fnRenderItem}
          keyExtractor={item => item.id.toString()}
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
  barraBusqueda:{
    flexDirection:'row'
  },
  botonBusqueda:{
    padding: 10,   
    backgroundColor: 'orange',
    borderRadius: 15,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    justifyContent: 'center',
  }
})