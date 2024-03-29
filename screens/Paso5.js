import React, { useState, useContext } from 'react'
import { StyleSheet, Text, TextInput, ScrollView, TouchableOpacity, View, Image, Button } from 'react-native';
import { Menu } from '../context/MenuProvider';
import Global from '../styles/Global';
import * as ImagePicker from 'expo-image-picker';
import ModalOpciones from '../components/ModalOpciones';
import { CreateReceta as CreateRecetaAPI,
  ReplaceReceta as ReplaceRecetaAPI,
  UpdateReceta as UpdateRecetaAPI} from '../controller/RecetaController';
  import { CreateRecipeInUser as CreateRecipeInUserAPI  } from '../controller/UsersController';import { useEffect } from 'react';
  import ModalUnico from '../components/ModalUnico';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import { useNetInfo } from "@react-native-community/netinfo";

  
const Paso5 = ({ navigation, route }) => {
  const netInfo = useNetInfo();

  const { tipo, nombreReceta, imagen, ingredientes, descripcion, personas, minutos, esfuerzo,
    reemplazar,idReceta,editar,pasos,paso1,paso2,paso3,paso4 } = route.params;
  const { usuario,setRecetaGuardada } = useContext(Menu);
  const [modal, setModal] = useState(false)
  const [modal2, setModal2] = useState(false)

  const [pasoDesc, setPasoDesc] = useState('');
  const [videoImage, setVideoImage] = useState(null);
  const [image, setImage] = useState(null);
  const [modalTitle, setModalTitle] = useState('')

  const [modalTitle2, setModalTitle2] = useState('')



  const wifi = () => {
    if (netInfo.type === "wifi") {
      setModalTitle('Desea finalizar la carga?')
      setModal(true)
    } else {
      setModalTitle('No esta conectado a una Red WIFI, desea continuar?')
      setModal(true)
    }
  }

  const finalizar = () => {
    if (pasoDesc === '') {
      alert("Debe completar la descripcion")
    } else {
      wifi();

    }

  }
  const irMenu = () => {
    navigation.navigate('Recetas')
    setModal2(false)
  }
  const subirMastarde = async () => {

    if (pasoDesc === '') {
      alert("Debe completar la descripcion")
    } else {

      await AsyncStorage.setItem('recetaGuardada', JSON.stringify({ "usuarioId": usuario._id, "usuario": usuario.name, "nombreReceta": nombreReceta, "descripcion": descripcion, "imagen": imagen, "personas": personas, "minutos": minutos, "esfuerzo": esfuerzo, "tipo": tipo, "pasos": [paso1, paso2, paso3,paso4,{ "paso": 5, "descripcion": pasoDesc, "image": image, "videoImage": videoImage }], "ingredientes": ingredientes }));

      setRecetaGuardada({ "usuarioId": usuario._id, "usuario": usuario.name, "nombreReceta": nombreReceta, "descripcion": descripcion, "imagen": imagen, "personas": personas, "minutos": minutos, "esfuerzo": esfuerzo, "tipo": tipo, "pasos": [paso1, paso2, paso3,paso4,{ "paso": 5, "descripcion": pasoDesc, "image": image, "videoImage": videoImage }], "ingredientes": ingredientes })
      setModalTitle2("Receta guardada exitosamente")
      setModal2(true)
    }

  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    const uri = result.uri
    const type = result.type || "file"
    const name = result.fileName || "image.jpg"
    const photo = { uri, type, name }
    
    if (!result.cancelled) {


      handleImage(photo)
    } 
  };
  const pickVideo = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    const uri = result.uri
    const type = result.type || "file"
    const name = result.fileName || "image.jpg"
    const photo = { uri, type, name }

    if (!result.cancelled) {


      handleVideo(photo)
    }
  };
  const handleImage = (photo) => {
    const formData = new FormData();
    formData.append("file", photo);
    formData.append("upload_preset", "appetito");

    fetch("https://api.cloudinary.com/v1_1/chomada/image/upload", {
      method: 'POST',
      body: formData
    }).then(res => res.json())
      .then(res => setImage(res.secure_url))
      .catch(err => console.log({ err }))

  }
  const handleVideo = (photo) => {
    const formData = new FormData();
    formData.append("file", photo);
    formData.append("upload_preset", "appetito");

    fetch("https://api.cloudinary.com/v1_1/chomada/video/upload", {
      method: 'POST',
      body: formData
    }).then(res => res.json())
      .then(res => setVideoImage(res.secure_url))
      .catch(err => console.log({ err }))

  }
  const finalizarCarga = async (event) => {


    try {
      if (reemplazar) {
        let replaceReceta = await ReplaceRecetaAPI(idReceta, usuario._id, usuario.name, nombreReceta, descripcion, imagen, personas, minutos, esfuerzo, tipo, [paso1,paso2,paso3,paso4,{ "paso": 5, "descripcion": pasoDesc, "image": image, "videoImage": videoImage }], ingredientes);
        if (replaceReceta.rdo === 200) {
        }
        else {
          alert("Error al crear receta intente nuevamente")
        }
      }
      if (editar) {

        let updateReceta = await UpdateRecetaAPI(idReceta, usuario._id, usuario.name, nombreReceta, descripcion, imagen, personas, minutos, esfuerzo, tipo, [paso1,paso2,paso3,paso4,{ "paso": 5, "descripcion": pasoDesc, "image": image, "videoImage": videoImage }], ingredientes);
        if (updateReceta.rdo === 200) {
        } else {
        }
      }
      if ((editar == false) && (editar == false)) {

        let createReceta = await CreateRecetaAPI(usuario._id, usuario.name, nombreReceta, descripcion, imagen, personas, minutos, esfuerzo, tipo, [paso1,paso2, paso3,paso4,{ "paso": 5, "descripcion": pasoDesc, "image": image, "videoImage": videoImage }], ingredientes);
        if (createReceta.rdo === 200) {

          let createRecipeInUserAPI = await CreateRecipeInUserAPI(usuario.email, createReceta.json.receta._id, createReceta.json.receta.nombreReceta, createReceta.json.receta.imagen, createReceta.json.receta.createdAt);
          if (createRecipeInUserAPI.rdo === 200) {
          } else {
            alert("Error al actualizar intente nuevamente")

          }
        }
        else {
          alert("Error al crear receta intente nuevamente")
        }
      }
    } catch (error) {
      console.log("adentro de catch",error)


    }
    navigation.navigate('Recetas')
  }

  useEffect(() => {
    (async ()=>{
 
      if(pasos.length>4){
        setPasoDesc(pasos[4].descripcion);
      setImage(pasos[4].image);
      setVideoImage(pasos[4].videoImage);
      }
      
  })()

  }, [])
  
  return (
    <ScrollView style={Global.container2}>
      <Text style={styles.textBlack} >Escriba la preparacion:</Text>
      <TextInput style={[styles.textArea, Global.shadows]}


multiline={true}
numberOfLines={40}
maxLength={900}
        value={pasoDesc}
        onChangeText={setPasoDesc}
        placeholder="Maximo 200 caracteres"
        placeholderTextColor='#c7c6c6'            ></TextInput>
      <View style={styles.ingreMedidas} >

        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Button title="Foto opcional" onPress={pickImage} />
          {image && <Image source={{ uri: image }} style={{ width: 80, height: 80 }} />}
        </View>


        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Button title="Video opcional" onPress={pickVideo} />
          {videoImage && <Image source={require("./../assets/video.png")}  style={{ width: 80, height: 80 }} />}
        </View>



      </View>


      <View style={styles.ingreMedidas} >

      <TouchableOpacity style={[styles.btn, Global.shadows]} onPress={subirMastarde}


><Text style={Global.textBlack}>Guardar </Text>

</TouchableOpacity>
        <TouchableOpacity style={[styles.btn, Global.shadows]} onPress={finalizar}


        ><Text style={Global.textBlack}>Finalizar</Text>

        </TouchableOpacity>


      </View>
      <ModalOpciones modalVisible={modal} setModalVisible={setModal} titulo={modalTitle} texto1='Cancelar' texto2='Finalizar' funcion1={() => setModal(false)} funcion2={finalizarCarga} />
      <ModalUnico modalVisible={modal2} setModalVisible={setModal2} titulo={modalTitle2} texto1='Aceptar' funcion1={irMenu} />

    </ScrollView >
  )
}
export default Paso5;

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
    height: 100,
    marginTop: 40,
    marginLeft: 10,
    marginRight: 10,
    flexDirection: "row",
    textAlign: 'center',
    justifyContent: 'space-around',

    alignItems: 'center'
  },
  btn: {
    width: 150,

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
    marginTop: 10,
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
    height: 200
  }
})