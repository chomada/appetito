import React, { useState, useContext, useEffect } from 'react'
import { StyleSheet, Modal, Text, TextInput, FlatList, TouchableOpacity, View, Image, Button } from 'react-native';
import { Menu } from '../context/MenuProvider';
import Global from '../styles/Global';
import * as ImagePicker from 'expo-image-picker';
import ModalOpciones from '../components/ModalOpciones';
import { CreateReceta as CreateRecetaAPI,
   ReplaceReceta as ReplaceRecetaAPI,
   UpdateReceta as UpdateRecetaAPI} from '../controller/RecetaController';
import { CreateRecipeInUser as CreateRecipeInUserAPI  } from '../controller/UsersController';
import {useNetInfo} from "@react-native-community/netinfo";
import ModalUnico from '../components/ModalUnico';


const Paso1 = ({ navigation, route }) => {

  const netInfo = useNetInfo();

  
  const { tipo, nombreReceta, imagen, ingredientes, descripcion, personas, minutos, esfuerzo,reemplazar,idReceta,editar,pasos } = route.params;
  const { usuario,setRecetaGuardada,recetaGuardada } = useContext(Menu);
  const [modal, setModal] = useState(false)

  const [pasoDesc, setPasoDesc] = useState('');
  const [videoImage, setVideoImage] = useState(null);
  const [image, setImage] = useState(null);
  const [modalTitle, setModalTitle] = useState('');
  const [modal2, setModal2] = useState(false)
  const [modalTitle2, setModalTitle2] = useState('')



  const wifi = () => {
    console.log("net info: ",netInfo)
    if(netInfo.type === "wifi"){
      setModalTitle('Desea finalizar la carga?')
      setModal(true)
    }else {
      setModalTitle('No esta conectado a una Red WIFI, desea continuar?')
      setModal(true)
    }
  }

  const finalizar = () => {
    wifi();
    
  
  }
  const irMenu =()=>{
    navigation.navigate('Recetas')
    setModal2(false)
  }
  const subirMastarde = () => {
    setRecetaGuardada({"usuarioId":usuario._id,"usuario":usuario.name,"nombreReceta":nombreReceta,"descripcion":descripcion,"imagen":imagen,"personas":personas,"minutos":minutos, "esfuerzo":esfuerzo,"tipo":tipo,"pasos":[{"paso":1, "descripcion":pasoDesc, "image":image, "videoImage":videoImage}],"ingredientes":ingredientes})
    console.log("la receta guardada: ",recetaGuardada)
    setModalTitle2("Receta guardada exitosamente")
    setModal2(true)
  
  }
  const paso2 = () => {
    console.log("id del paso 1: ",idReceta)
    navigation.navigate('Paso2', {
      tipo: tipo,
      nombreReceta: nombreReceta,
      imagen: imagen,
      ingredientes: ingredientes,
      descripcion: descripcion,
      personas: personas,
      minutos: minutos,
      esfuerzo: esfuerzo,
      paso1:{"paso":1, "descripcion":pasoDesc, "image":image, "videoImage":videoImage},
      pasos:pasos,
      idReceta:idReceta,
      editar:editar,
      reemplazar:reemplazar

    })
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
  const finalizarCarga= async (event)=>{

    try {
      if(reemplazar){
        console.log("idReceta: ",idReceta)
        let replaceReceta = await ReplaceRecetaAPI(idReceta,usuario._id,usuario.name,nombreReceta,descripcion,imagen,personas,minutos, esfuerzo,tipo,[{"paso":1, "descripcion":pasoDesc, "image":image, "videoImage":videoImage}],ingredientes);
        if (replaceReceta.rdo === 200) {
          console.log("reemplazada: ",replaceReceta.json)
        }
        else {
          alert("Error al crear receta intente nuevamente")
        }
      }
       if(editar){
        console.log("adentro de editar")
        
        let updateReceta = await UpdateRecetaAPI(idReceta,usuario._id,usuario.name,nombreReceta,descripcion,imagen,personas,minutos, esfuerzo,tipo,[{"paso":1, "descripcion":pasoDesc, "image":image, "videoImage":videoImage}],ingredientes);
        console.log("editar receta: ",updateReceta)
        if(updateReceta.rdo===200){
          console.log("edicion correcta")
        }else{
          console.log("Error al editar intente nuevamente")
        }
      }
      if((editar==false) && (editar==false)) {
      let createReceta = await CreateRecetaAPI(usuario._id,usuario.name,nombreReceta,descripcion,imagen,personas,minutos, esfuerzo,tipo,[{"paso":1, "descripcion":pasoDesc, "image":image, "videoImage":videoImage}],ingredientes);
      if (createReceta.rdo === 200) {
        console.log("creado: ",createReceta.json);

        let createRecipeInUserAPI = await CreateRecipeInUserAPI(usuario.email, createReceta.json.receta._id, createReceta.json.receta.nombreReceta, createReceta.json.receta.imagen, createReceta.json.receta.createdAt);
        console.log("parametros: ",createRecipeInUserAPI)
        if(createRecipeInUserAPI.rdo===200){
          console.log("usuario actualizado: ");
        }else{
          alert("Error al actualizar intente nuevamente")

        }
      }
      else {
        alert("Error al crear receta intente nuevamente")
      }
    }
    } catch (error) {


    }
    navigation.navigate('Recetas')
    
    
    }

    useEffect(() => {
      if(pasos.length>0){

   
      setPasoDesc(pasos[0].descripcion);
      setImage(pasos[0].image);
      setVideoImage(pasos[0].videoImage);
    }
    }, [])
  return (
    <View style={Global.container2}>
      <Text style={styles.textBlack} >Escriba la preparacion:</Text>
      <TextInput style={[styles.textArea, Global.shadows]}


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
          {videoImage && <Image source={require("./../assets/video.png")} style={{ width: 80, height: 80 }} />}
        </View>



      </View>


      <View style={styles.ingreMedidas} >

        <TouchableOpacity style={[styles.btn, Global.shadows]} onPress={paso2}


        ><Text style={Global.textBlack}>Agregar Paso</Text>

        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, Global.shadows]} onPress={subirMastarde}


><Text style={Global.textBlack}>Guardar </Text>

</TouchableOpacity>
        <TouchableOpacity style={[styles.btn, Global.shadows]} onPress={finalizar}


        ><Text style={Global.textBlack}>Finalizar</Text>

        </TouchableOpacity>


      </View>
      <ModalOpciones modalVisible={modal} setModalVisible={setModal} titulo={modalTitle} texto1='Cancelar'texto2 ='Finalizar' funcion1={() => setModal(false)} funcion2={finalizarCarga}/>
      <ModalUnico modalVisible={modal2} setModalVisible={setModal2} titulo={modalTitle2} texto1='Aceptar' funcion1={irMenu} />


    </View >
  )
}

export default Paso1;

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
    width: 120,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 15,
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold'

  },
  btnModal: {
    margin: 5,
    width: 100,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 15,
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold'

  },
  btnPlaceHolder: {
    width: 100,
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