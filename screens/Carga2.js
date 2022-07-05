import React, { useState, useContext, useEffect } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, FlatList, TouchableOpacity, View, Image, Button } from 'react-native';
import ModalUnico from '../components/ModalUnico';
import { Menu } from '../context/MenuProvider';
import Global from '../styles/Global';
import {
  // Pickers
  PickerTime,
  PickerDate,
  PickerDateTime,
  PickerDateRange,
  // Dropdowns
  DropdownList,
  DropdownMeasurements,
  DropdownNumber,
  DropdownState,
  // TypeScript Types
  PickerItem,
} from 'react-native-ultimate-modal-picker';






const Carga = ({ navigation, route }) => {
  const listaDificultad = [
    { label: 'Fácil', value: 'Fácil' },
    { label: 'Media', value: 'Media' },
    { label: 'Dificil', value: 'Dificil' }
  ]
  const { ingredientes, tipo, nombreReceta, imagen, reemplazar, idReceta, editar, descripcion, person, tiempo, dificultad,pasos } = route.params;
  const { usuario } = useContext(Menu);
  const [desc, setDesc] = useState('');
  const [personas, setPersonas] = useState('');
  const [minutos, setMinutos] = useState('');
  const [esfuerzo, setEsfuerzo] = useState('');
  const [modal2, setModal2] = useState(false);
  const [titleModal2, setTitleModal2] = useState('');


  const [habilitado, setHabilitado] = useState(false);
  const [busqueda, setBusqueda] = useState("");


  const carga3 = () => {

    if (desc === '' || personas === '' || minutos === '' || esfuerzo === '') {
      setTitleModal2('Debe completar todos los campos')

      setModal2(true)
    } else {
      navigation.navigate('Paso1', {
        tipo: tipo,
        nombreReceta: nombreReceta,
        imagen: imagen,
        ingredientes: ingredientes,
        descripcion: desc,
        personas: String(personas),
        minutos: String(minutos),
        esfuerzo: esfuerzo.toLowerCase(),
        reemplazar: reemplazar,
        idReceta: idReceta,
        editar: editar,
        pasos:pasos

      })
    }

  }
  useEffect(() => {
    setDesc(descripcion);
    setMinutos(tiempo);
    setEsfuerzo(dificultad);
    setPersonas(person);

  }, [])

  return (
    <View style={Global.container2}>
      <Text style={styles.textBlack} >Escriba la descripcion:</Text>
      <TextInput style={[styles.textArea, Global.shadows]}

        maxLength={200}
        value={desc}
        onChangeText={setDesc}
        placeholder="Maximo 200 caracteres"
        placeholderTextColor='#c7c6c6'            ></TextInput>

      <View style={styles.ingreMedidas} >
        <View >
          <Text style={Global.textBlack}>PERSONAS</Text>
          <TextInput style={[styles.btnPlaceHolder, Global.shadows]}
            maxLength={3}

            keyboardType='numeric'
            value={personas}
            onChangeText={setPersonas}
            placeholder="Ej 4"
            placeholderTextColor='#c7c6c6'            ></TextInput>
        </View >

        <View >
          <Text style={Global.textBlack}>MINUTOS</Text>
          <TextInput style={[styles.btnPlaceHolder, Global.shadows]}
            maxLength={3}

            keyboardType='numeric'
            value={minutos}
            onChangeText={setMinutos}
            placeholder="Ej 20"
            placeholderTextColor='#c7c6c6'            ></TextInput>
        </View >
        {/* <TextInput style={[styles.btnPlaceHolder, Global.shadows]}
          value={esfuerzo}
          onChangeText={setEsfuerzo}
          placeholder="esfuerzo"
          placeholderTextColor='#c7c6c6'            ></TextInput> */}
        <SafeAreaView style={{ height: 65, width: 120, marginTop: 10, flexDirection: "row" }}>
            <DropdownList
              title='Dificultad'
              items={listaDificultad}
              onChange={(value) => setEsfuerzo(value)}
              customStyleContainer={{
                containerLight: {

                },

              }}
              customStyleLabelText={{
                labelTextLight: {
                  textAlign: 'center',
                  color: 'black',
                  fontWeight: '700',
                  fontSize: 14,


                },

              }}

              customStyleFieldText={{
                fieldTextLight: {

                  fontSize: 15,
                  fontWeight: '500',
                  textTransform: 'lowercase',
                  color: 'black',
                },

              }}
              customStyleModalHeaderContainer={{
                modalHeaderContainerLight: {
                  height: 55,
                  backgroundColor: 'white',
                  borderColor: '#000000',
                  borderBottomWidth: 2,
                },

              }}
              customStyleCancelText={{
                cancelTextLight: {
                  fontSize: 15,
                  fontWeight: '500',
                  color: 'blue',
                },

              }}
              customStyleDoneText={{
                doneTextLight: {
                  color: 'orange',
                },

              }}
              customStyleModalContentContainer={{
                modalContentContainerLight: {
                  height: 200,
                  backgroundColor: 'white',
                },

              }}
              customStylePickerItemText={{
                pickerItemTextLight: {
                  color: 'orange',
                },

              }}


            />

        </SafeAreaView>


      </View>

      <View style={styles.ingredientesList}>

      </View>
      <View style={styles.marginer}>
        <TouchableOpacity style={[styles.btn, Global.shadows]} onPress={carga3}


        ><Text style={Global.textBlack}>Siguiente</Text>

        </TouchableOpacity>
      </View >
      <ModalUnico modalVisible={modal2} setModalVisible={setModal2} titulo={titleModal2}
        texto1='Aceptar' funcion1={() => setModal2(false)} />
    </View >
  )
}

export default Carga;

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
    marginTop: 5,
    padding: 5,

    textAlign: 'center',

    justifyContent: 'center',
  },
  botonBusqueda: {
    marginTop: 5,
    padding: 5,
    backgroundColor: 'orange',
    borderRadius: 15,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    justifyContent: 'center',
    width: 100,
    marginLeft: 150,
    marginRight: 150,
  },
  botonBusquedaDisabled: {
    marginLeft: 150,
    marginRight: 150,
    width: 100,
    marginTop: 5,
    padding: 5,
    backgroundColor: 'gray',
    borderRadius: 15,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center'

  },
  DescIngrePre: {
    marginTop: 20,
    marginLeft: 40,
    marginRight: 40,
    flexDirection: "row",
    textAlign: 'center',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  DescIngrePre2: {
    marginTop: 10,
    marginLeft: 70,
    marginRight: 70,
    flexDirection: "row",
    textAlign: 'center',
    justifyContent: 'space-around',

    alignItems: 'center'
  },
  ingreMedidas: {
    marginTop: 40,
    marginLeft: 10,
    marginRight: 10,
    flexDirection: "row",
    textAlign: 'center',
    justifyContent: 'space-around',

    alignItems: 'center'
  },
  btn: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 15,
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold'

  },
  btnPlaceHolder: {
    width: 120,
    padding: 10,
    margin: 'auto',
    backgroundColor: 'white',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  marginer: {
    marginLeft: 132,
    marginRight: 132,
    width: 150,
    textAlign: 'center',
    justifyContent: 'center',

    alignItems: 'center'
  },
  textArea: {
    width: 380,
    height: 300,
    padding: 10,
    margin: 16,
    backgroundColor: 'white',
    textAlign: 'center',
    justifyContent: 'center',
    borderRadius: 15,

    alignItems: 'center',
    fontWeight: 'bold'

  },
  textBlack: {
    marginTop: 10,
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
  ingredientesList: {
    height: 150
  }
})