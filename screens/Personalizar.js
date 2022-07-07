import React, { useContext, useState, useEffect } from 'react'
import { StyleSheet, ScrollView, FlatList, View, Text, TouchableOpacity, TextInput } from 'react-native';
import Global from '../styles/Global';
import { Menu } from '../context/MenuProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';

import IngredienteItem from '../components/IngredienteItem';
import ModalUnico from '../components/ModalUnico';

const Personalizar = ({ navigation, route }) => {
  const { item } = route.params;
  const { guardarRecetaPersonalizada, recetasPersonalizadas } = useContext(Menu);

  const [personalizo, setPersonalizo] = useState('ingredientes')
  const [cantidad, setCantidad] = useState('')
  const [ingredientesLista, setIngredientesLista] = useState([])
  const [aux, setAux] = useState({})
  const [editable, setEditable] = useState(false)
  const [porciones, setPorciones] = useState(false)
  const [comen, setComen] = useState('')
  const [modal, setModal] = useState(false)
  const [modalTitle, setModalTitle] = useState(false)
  


  const ingredientes = () => {
    setPersonalizo('ingredientes')

  }
  const comensales = () => {
    setPersonalizo('comensales')


  }
  const agregarIngre = () => {
    

    if (cantidad === '') {

    } else {
      setIngredientesLista(item.ingredientes)


      const suma = cantidad / aux.cantidad
      const pri = ingredientesLista.filter(elemento => elemento.cantidad = elemento.cantidad * suma);
      const filtrado = pri.filter(elemento => elemento.ingrediente !== aux.ingrediente);
      filtrado.push({ "ingrediente": aux.ingrediente.toLowerCase(), "cantidad": String(cantidad), "unidad": aux.unidad })
      setIngredientesLista(filtrado);

      setCantidad('');
      setAux({});
      setEditable(false)
      setPorciones(porciones * suma)

    }


  }
  const guardarReceta = async() => {

    if (recetasPersonalizadas.length > 4) {
      setModalTitle('Ya llego al maximo de 5 recetas personalizadas')
      setModal(true)
    } else {
      item.ingredientes = ingredientesLista;
      item.cantidadPersonas = porciones;
     
       await AsyncStorage.setItem('recetasPersonalizadas', JSON.stringify([...recetasPersonalizadas,item]));
      setModalTitle('Receta guardada correctamente')

      setModal(true)

    }

  }
  const eliminar = (ingrediente) => {
    const auxi = ingredientesLista.filter(item => item.ingrediente !== ingrediente);
    setIngredientesLista(auxi);
  }
  const edicion = (ingrediente) => {
    setAux(ingrediente);
    setCantidad(ingrediente.cantidad)
    setEditable(true)

  }
  const actCantidad = () => {
    if (comen === '') {

    } else {

    setPorciones(comen)
    const suma = comen / porciones
    const pri = ingredientesLista.filter(elemento => elemento.cantidad = elemento.cantidad * suma);
    setIngredientesLista(pri);


    setComen('')
  }
}
  const multiplicar = () => {

    setPorciones(porciones * 2)   
    const pri = ingredientesLista.filter(elemento => elemento.cantidad = String(elemento.cantidad * 2));
    setIngredientesLista(pri);

    setComen('')
  }
  const dividir = () => {

    setPorciones(porciones / 2)
    const pri = ingredientesLista.filter(elemento => elemento.cantidad = String(elemento.cantidad / 2));
    setIngredientesLista(pri);

    setComen('')
  }
  const cerrarModal = () => {
    () => setModal(false)
    navigation.navigate('Recetas')
  }
  const fnRenderItem = ({ item }) => {
    return <IngredienteItem item={item} valida={true} eliminar={eliminar} edicion={edicion} />
  }
  useEffect(() => {
    (async ()=>{
 
      setIngredientesLista(item.ingredientes);
      setPorciones(item.cantidadPersonas);
      
  })()
 
    


  }, [])

  return (
    <View style={Global.container}>

      <View style={{ marginTop: 150, marginBot: 10, flexDirection: "row" }}>
        <TouchableOpacity style={[styles.btn, Global.shadows]} onPress={ingredientes}>
          <Text style={styles.textBlack2}>
            Por Ingredientes
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, Global.shadows]} onPress={comensales}>
          <Text style={styles.textBlack2}>
            Por Comensales
          </Text>
        </TouchableOpacity>
      </View>


      <View style={{ marginTop: 10 }}>

        {personalizo === 'ingredientes' ? <Text style={Global.textBlackTitle}>
          INGREDIENTES
        </Text> : <Text style={Global.textBlackTitle}>
          COMENSALES
        </Text>}

      </View>


      {personalizo === 'ingredientes' ?
        <View>
          <View style={{ marginTop: 10, marginLeft: 70, marginBot: 10, flexDirection: "row" }} >
            <ScrollView><Text style={Global.textBlack}>CANTIDAD</Text>
              <TextInput style={[styles.btnPlaceHolder, Global.shadows]}
                editable={editable}
                keyboardType='numeric'
                maxLength={5}

                value={cantidad}
                onChangeText={setCantidad}
                placeholder="Ej 2"
                placeholderTextColor='#c7c6c6'            ></TextInput>
            </ScrollView>
            <TouchableOpacity
              style={[styles.btn2, Global.shadows]} onPress={agregarIngre}


            ><Text style={Global.textBlack}>Aceptar</Text>

            </TouchableOpacity>
          </View>
          <FlatList
            data={ingredientesLista}
            renderItem={fnRenderItem}
            keyExtractor={item => item.ingrediente}

          />

          <View style={{ marginLeft: 40, marginBottom: 200, flexDirection: "row" }}>
            <Text style={{
              marginTop: 10,
              width: 200,
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 25
            }}>Porciones: {porciones}</Text>
            <TouchableOpacity
              style={[styles.btn4, Global.shadows]} onPress={guardarReceta}


            ><Text style={Global.textBlack}>Guardar</Text>

            </TouchableOpacity>
          </View>
        </View>
        :
        <View>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity style={[styles.btn3, Global.shadows]} onPress={multiplicar}>
              <Text style={styles.textBlack}>
                Multiplicar
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btn3, Global.shadows]} onPress={dividir}>
              <Text style={styles.textBlack}>
                Dividir
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 10, marginLeft: 25, marginBot: 10, flexDirection: "row" }} >
            <View><Text style={Global.textBlack}>CANTIDAD</Text>
              <TextInput style={[styles.btnPlaceHolder, Global.shadows]}
                keyboardType='numeric'
                maxLength={5}

                value={comen}
                onChangeText={setComen}
                placeholder="Ej 2"
                placeholderTextColor='#c7c6c6'            ></TextInput>
            </View>
            <TouchableOpacity
              style={[styles.btn2, Global.shadows]} onPress={actCantidad}


            ><Text style={Global.textBlack}>Aceptar</Text>

            </TouchableOpacity>
          </View>
          <View style={{ marginBottom: 200, marginTop: 324, flexDirection: "row" }}>
            <Text style={{
              width: 200,
              marginTop: 10,
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 25
            }}>Porciones: {porciones}</Text>
            <TouchableOpacity
              style={[styles.btn4, Global.shadows]} onPress={guardarReceta}


            ><Text style={Global.textBlack}>Guardar</Text>

            </TouchableOpacity>
          </View>
        </View>}
      <ModalUnico modalVisible={modal} setModalVisible={setModal} titulo={modalTitle} texto1='Aceptar' funcion1={cerrarModal} />
    </View>
  )
}

export default Personalizar;

const styles = StyleSheet.create({
  btnPlaceHolder: {
    width: 120,
    padding: 10,
    margin: 'auto',
    backgroundColor: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 10
  },

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
    marginLeft: 5,
    marginRight: 5,
    backgroundColor: '#FB9906',
    borderRadius: 15,
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    width: 160,
    padding: 10
  },
  btn2: {
    marginTop: 10,
    height: 50,
    marginLeft: 10,
    backgroundColor: 'white',
    borderRadius: 15,
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
  },
  btn3: {
    marginBottom: 20,
    marginLeft: 5,
    marginRight: 5,
    backgroundColor: 'pink',
    borderRadius: 15,
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    width: 140,
    padding: 10
  },
  btn4: {
    height: 50,
    marginLeft: 10,
    backgroundColor: 'white',
    borderRadius: 15,
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
  },
  textBlack: {
    color: 'black',
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  },
  textBlack2: {
    color: 'black',
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 17
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ead5b4',
    textAlign: 'center'

  },

})