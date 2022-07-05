import React, { useState, useContext, useEffect } from 'react'
import { SafeAreaView, ScrollView, Button, StyleSheet, Text, TextInput, FlatList, TouchableOpacity, View, Image } from 'react-native';
import IngredienteItem from '../components/IngredienteItem';
import { Menu } from '../context/MenuProvider';
import Global from '../styles/Global';
import * as ImagePicker from 'expo-image-picker';
import ModalOpciones from '../components/ModalOpciones';
import Axios from "axios";
import Prueba from '../assets/menu.png'
import { GetRecetaPorId as GetRecetaPorIdAPI } from '../controller/RecetaController';
import ModalUnico from '../components/ModalUnico';
import {

  DropdownList

} from 'react-native-ultimate-modal-picker';
import { set } from 'react-native-reanimated';
import ModalOpciones2 from '../components/ModalOpciones2';
import { CreateReceta as CreateRecetaAPI,
  ReplaceReceta as ReplaceRecetaAPI,
  UpdateReceta as UpdateRecetaAPI} from '../controller/RecetaController';
import { CreateRecipeInUser as CreateRecipeInUserAPI  } from '../controller/UsersController';


const Carga = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const listaMedidas = [
    { label: 'Gramos', value: 'Gramos' },
    { label: 'Kilos', value: 'Kilos' },
    { label: 'Litros', value: 'Litros' },

  ];
  const { usuario,recetaGuardada,setRecetaGuardada } = useContext(Menu);
  const [valida, setValida] = useState(false);
  const [tipo, setTipo] = useState('Postre');
  const [ingredientesLista, setIngredientesLista] = useState([]);
  const [nombre, setNombre] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [medida, setMedida] = useState('');
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [modal3, setModal3] = useState(false);
  const [reemplazar, setReemplazar] = useState(false);
  const [editar, setEditar] = useState(false);
  const [idReceta, setIdReceta] = useState(false);
  const [descripcion, setDescripcion] = useState('');
  const [person, setPerson] = useState('');
  const [tiempo, setTiempo] = useState('');
  const [dificultad, setDificultad] = useState('');
  const [titleModal2, setTitleModal2] = useState('');
  const [titleIngrediente, setTitleIngrediente] = useState('+ ingrediente');
  const [aux, setAux] = useState(null);
  const [active, setActive] = useState(false);
  const [pasos, setPasos] = useState([]);

  let inicial = {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 15,
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
    resizeMode: "cover",
    width: 100
  }
  let secundario = {
    width: 100,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 15,
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
    borderRadius: 20,
    borderColor: 'orange',
    borderWidth: 5,
    resizeMode: "cover"
  }
  const [colored1, setColored1] = useState(secundario)
  const [colored2, setColored2] = useState(inicial)
  const [colored3, setColored3] = useState(inicial)
  const [colored4, setColored4] = useState(inicial)
  const [colored5, setColored5] = useState(inicial)




  const [busqueda, setBusqueda] = useState("");


  const elegirTipo = (select) => {
    setTipo(select)
    if (select === 'Postre') {
      setColored1(secundario);
      setColored2(inicial)
      setColored3(inicial)
      setColored4(inicial)
      setColored5(inicial)

    } else if (select === 'Degustar') {
      setColored1(inicial);
      setColored2(secundario)
      setColored3(inicial)
      setColored4(inicial)
      setColored5(inicial)

    }
    else if (select === 'Principal') {
      setColored1(inicial);
      setColored2(inicial)
      setColored3(secundario)
      setColored4(inicial)
      setColored5(inicial)

    }
    else if (select === 'Entrada') {
      setColored1(inicial);
      setColored2(inicial)
      setColored3(inicial)
      setColored4(secundario)
      setColored5(inicial)

    }
    else if (select === 'Gourmet') {
      setColored1(inicial);
      setColored2(inicial)
      setColored3(inicial)
      setColored4(inicial)
      setColored5(secundario)

    }

  }
  const validarNombre = () => {
    if (!usuario.recetas.find(elemento => elemento.nameReceta === busqueda.toLowerCase())) {
      setValida(true)
    }
    else {


      const receta = usuario.recetas.find(elemento => elemento.nameReceta === busqueda.toLowerCase())
      setModal(true)

      setIdReceta(receta.idReceta)


      setValida(true)
    }
  }

  const carga2 = () => {
    if (image !== null && ingredientesLista.length !== 0) {
      navigation.navigate('Carga2', {
        ingredientes: ingredientesLista,
        nombreReceta: busqueda.toLowerCase(),
        tipo: tipo.toLowerCase(),
        imagen: image,
        reemplazar: reemplazar,
        idReceta: idReceta,
        editar: editar,
        descripcion: descripcion,
        tiempo: tiempo,
        dificultad: dificultad,
        person: person,
        pasos:pasos

      })

    } else {
      setTitleModal2('Debe completar todos los campos')
      setModal2(true)
    }


  }
  const agregarIngre = () => {
    if (nombre === '' || cantidad === '' || medida === '') {
      setTitleModal2('Ingrediente incompleto')
      setModal2(true)
      setTitleIngrediente('+ ingrediente')
      setNombre('');
      setCantidad('');
      

    } else {
      const existe = yata(nombre.toLowerCase());

      if (existe) {
        if(aux!==null){
          if(existe.ingrediente===aux.ingrediente){

            const filtrado = ingredientesLista.filter(elemento => elemento.ingrediente !== aux.ingrediente);
            filtrado.push({ "ingrediente": nombre.toLowerCase(), "cantidad": String(cantidad), "unidad": medida })
          setIngredientesLista(filtrado );
          setNombre('');
          setCantidad('');
          setTitleIngrediente('+ ingrediente')
          }else{
          setTitleModal2('Ingrediente existente')
          setModal2(true)
          setNombre('');
        setCantidad('');
        setTitleIngrediente('+ ingrediente')

          }

        }
      else{
          setTitleModal2('Ingrediente existente')
          setModal2(true)
          setNombre('');
        setCantidad('');
        setTitleIngrediente('+ ingrediente')

        }
      } else {
        if(active){
          const filtrado = ingredientesLista.filter(elemento => elemento.ingrediente !== aux.ingrediente);
          filtrado.push({ "ingrediente": nombre.toLowerCase(), "cantidad": String(cantidad), "unidad": medida })
        setIngredientesLista(filtrado );
        setNombre('');
        setCantidad('');
        setTitleIngrediente('+ ingrediente')
        }

        else{ setIngredientesLista([...ingredientesLista, { "ingrediente": nombre.toLowerCase(), "cantidad": String(cantidad), "unidad": medida }])
        setNombre('');
        setCantidad('');
        setTitleIngrediente('+ ingrediente')

        }

      }

    }
    setActive(false)
    setAux(null)

  }

  const yata = (nombre) => {
    return ingredientesLista.find(elemento => elemento.ingrediente === nombre);
  }
  const eliminar = (ingrediente) => {
    const auxi = ingredientesLista.filter(item => item.ingrediente !== ingrediente);
    setIngredientesLista(auxi);
  }
  const edicion = (ingrediente) => {
    setAux(ingrediente);
    setActive(true)

    setNombre(ingrediente.ingrediente)
    setCantidad(ingrediente.cantidad)
    setMedida(ingrediente.unidad)

    setTitleIngrediente('Aceptar')
  }
  const fnRenderItem = ({ item }) => {
    return <IngredienteItem item={item} valida={valida} eliminar={eliminar} edicion={edicion} />
  }



  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0,
      noData: true

    });
    const uri = result.uri
    const type = result.type || "file"
    const name = result.fileName || "image.jpg"
    const photo = { uri, type, name }

    if (!result.cancelled) {


      handleImage(photo)
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



  const funcionEditar = () => {
    setReemplazar(false)
    setEditar(true)
    setModal(false)
    recetaId(idReceta)

  }
  const funcionReemplazar = () => {
    setEditar(false)
    setReemplazar(true)
    setModal(false)


  }
  const recetaId = async (id) => {

    let getRecetaId = await GetRecetaPorIdAPI(id);
    setIngredientesLista(getRecetaId.data.receta.ingredientes)
    elegirTipo(getRecetaId.data.receta.tipo)
    setDescripcion(getRecetaId.data.receta.descripcion)
    setTiempo(String(getRecetaId.data.receta.duracion))
    setDificultad(getRecetaId.data.receta.dificultad)
    setPerson(String(getRecetaId.data.receta.cantidadPersonas))
    setImage(getRecetaId.data.receta.imagen)
    setPasos(getRecetaId.data.receta.pasos)
  }
  const subirReceta= async()=>{
    let createReceta = await CreateRecetaAPI(recetaGuardada.usuarioId,recetaGuardada.usuario,recetaGuardada.nombreReceta,recetaGuardada.descripcion,recetaGuardada.imagen,recetaGuardada.personas,recetaGuardada.minutos, recetaGuardada.esfuerzo,recetaGuardada.tipo,recetaGuardada.pasos,recetaGuardada.ingredientes);
    if (createReceta.rdo === 200) {
      console.log("creado: ",createReceta.json);

      let createRecipeInUserAPI = await CreateRecipeInUserAPI(usuario.email, createReceta.json.receta._id, createReceta.json.receta.nombreReceta, createReceta.json.receta.imagen, createReceta.json.receta.createdAt);
    }
    setRecetaGuardada({"id":''})
    navigation.navigate('Recetas')

}
  useEffect(()=> {

    if(recetaGuardada.id!==''){
      setModal3(true)

    }
  }, [])
  return (
    <View style={Global.container2}>



      {valida ? <View style={{ height: 120, alignItems: 'center', justifyContent: 'center' }}>
        <Button title="Sube una foto de portada" onPress={pickImage} />
        {image && <Image source={{ uri: image }} style={{ width: 80, height: 80 }} />}
      </View> : <View style={styles.barraBusqueda} >
        <TextInput style={Global.btnPlaceHolderBuscar}
          value={busqueda}
          onChangeText={setBusqueda}
          placeholder="Ingrese nombre de receta aqui"
          placeholderTextColor='black'
        ></TextInput>



      </View>}

      {valida ? null : <View  >
        {busqueda.length > 2 ? <TouchableOpacity style={[styles.botonBusqueda, Global.shadows]} onPress={validarNombre}><Text style={Global.textBlack}>Validar</Text></TouchableOpacity> : <TouchableOpacity style={[styles.botonBusqueda, Global.shadows]} disabled><Text style={Global.textOpacity}>Validar</Text></TouchableOpacity>}
      </View>}
      {valida ? <View style={styles.DescIngrePre} >
        <TouchableOpacity style={[colored1, Global.shadows]} onPress={() => elegirTipo('Postre')}


        ><Text style={Global.textBlack}>Postre</Text>

        </TouchableOpacity>


        <TouchableOpacity style={[colored2, Global.shadows]} onPress={() => elegirTipo('Degustar')}


        ><Text style={Global.textBlack}>Degustar</Text>

        </TouchableOpacity>

        <TouchableOpacity style={[colored3, Global.shadows]} onPress={() => elegirTipo('Principal')}


        ><Text style={Global.textBlack}>Principal</Text>

        </TouchableOpacity>
      </View> : <View style={styles.DescIngrePre} >
        <TouchableOpacity style={[styles.btn, Global.shadows]} disabled onPress={() => elegirTipo('Postre')}


        ><Text style={Global.textOpacity}>Postre</Text>

        </TouchableOpacity>


        <TouchableOpacity style={[styles.btn, Global.shadows]} disabled onPress={() => elegirTipo('Degustar')}


        ><Text style={Global.textOpacity}>Degustar</Text>

        </TouchableOpacity>

        <TouchableOpacity style={[styles.btn, Global.shadows]} disabled onPress={() => elegirTipo('Principal')}


        ><Text style={Global.textOpacity}>Principal</Text>

        </TouchableOpacity>
      </View>}
      {valida ? <View style={styles.DescIngrePre2} >
        <TouchableOpacity style={[colored4, Global.shadows]} onPress={() => elegirTipo('Entrada')}


        ><Text style={Global.textBlack}>Entrada</Text>

        </TouchableOpacity>


        <TouchableOpacity style={[colored5, Global.shadows]} onPress={() => elegirTipo('Gourmet')}


        ><Text style={Global.textBlack}>Gourmet</Text>

        </TouchableOpacity>


      </View> : <View style={styles.DescIngrePre2} >
        <TouchableOpacity style={[styles.btn, Global.shadows]} disabled onPress={() => elegirTipo('Entrada')}


        ><Text style={Global.textOpacity}>Entrada</Text>

        </TouchableOpacity>


        <TouchableOpacity style={[styles.btn, Global.shadows]} disabled onPress={() => elegirTipo('Gourmet')}


        ><Text style={Global.textOpacity}>Gourmet</Text>

        </TouchableOpacity>


      </View>}


      <View style={styles.ingreMedidas} >
        <View>
          <Text style={Global.textBlack}>INGREDIENTES</Text>
          <TextInput style={[styles.btnPlaceHolder, Global.shadows]}
            editable={valida}
            maxLength={20}

            value={nombre}
            onChangeText={setNombre}
            placeholder="Ej chocolate"
            placeholderTextColor='#c7c6c6'            ></TextInput>
        </View>

        <View >
          <Text style={Global.textBlack}>CANTIDAD</Text>
          <TextInput style={[styles.btnPlaceHolder, Global.shadows]}
            editable={valida}
            keyboardType='numeric'
            maxLength={5}

            value={cantidad}
            onChangeText={setCantidad}
            placeholder="Ej 2"
            placeholderTextColor='#c7c6c6'            ></TextInput>
        </View>
        {/* <TextInput style={[styles.btnPlaceHolder, Global.shadows]}
          editable={valida}
          value={medida}
          onChangeText={setMedida}
          placeholder="medidas"
          placeholderTextColor='#c7c6c6'            ></TextInput> */}
        <SafeAreaView style={{ height: 65, width: 120, marginTop: 10, flexDirection: "row" }}>
          <DropdownList
            title='Unidad'
            items={listaMedidas}
            selectItem='Kilos'
            onChange={(value) => setMedida(value)}
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

      <View style={styles.marginer}>
        {valida ? <TouchableOpacity
          style={[styles.btn, Global.shadows]} onPress={agregarIngre}


        ><Text style={Global.textBlack}>{titleIngrediente}</Text>

        </TouchableOpacity> : <TouchableOpacity disabled
          style={[styles.btn, Global.shadows]} onPress={agregarIngre}


        ><Text style={Global.textOpacity}>+ ingrediente</Text>

        </TouchableOpacity>}
      </View >
      <View style={styles.ingredientesList}>
        {ingredientesLista.length > 0 ? <FlatList
          data={ingredientesLista}
          renderItem={fnRenderItem}
          keyExtractor={item => item.ingrediente}

        /> : null}

      </View>


      <View style={styles.marginer}>
        {valida ? <TouchableOpacity style={[styles.btn, Global.shadows]} onPress={carga2}


        ><Text style={Global.textBlack}>Siguiente</Text>

        </TouchableOpacity> : null}
      </View >

      <ModalOpciones modalVisible={modal} setModalVisible={setModal} titulo='Receta existente...'
        texto1='Editar' texto2='Reemplazar' funcion1={funcionEditar} funcion2={funcionReemplazar} />

        <ModalOpciones2 modalVisible={modal3} setModalVisible={setModal3} titulo='Tiene una receta guardada desea subirla ahora?'
        texto1='Cancelar' texto2='Subir ahora' funcion1={() => setModal3(false)} funcion2={subirReceta} />
      <ModalUnico modalVisible={modal2} setModalVisible={setModal2} titulo={titleModal2}
        texto1='Aceptar' funcion1={() => setModal2(false)} />

    </View >
  )
}

export default Carga;

const styles = StyleSheet.create({
  marginImage: {
    height: 250
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
    height: 120,
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
    height: 50,
    marginTop: 20,
    marginLeft: 40,
    marginRight: 40,
    flexDirection: "row",
    textAlign: 'center',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  DescIngrePre2: {
    height: 50,
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
    margin: 5,
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

  text2: {

    padding: 10,
    backgroundColor: 'white',
    borderRadius: 15,
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold'

  },
  ingredientesList: {
    height: 200,
    marginTop: 10
  }
})