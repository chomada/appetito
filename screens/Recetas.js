import { useState, useContext, useRef, useEffect } from 'react';
import {
  View, Text, ActivityIndicator, FlatList, TouchableOpacity, Image, StyleSheet,

} from 'react-native'
import RecetaItem from '../components/RecetaItem';
import { Menu } from '../context/MenuProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Global from '../styles/Global';

import Collapsible from 'react-native-collapsible';
import ModalUnico from '../components/ModalUnico';


const Recetas = ({ navigation, route }) => {


  const { setEnabled, recetas, usuario,recetasPersonalizadas,setRecetasPersonalizadas } = useContext(Menu);
  const [antigua, setAntigua] = useState('Ordenar');
  const [modal, setModal] = useState(false);

  const handleSignOut = () => {
    setEnabled(false);
  }
  const irPerfil = () => {
    navigation.navigate('Perfil', {
      user: usuario


    })
  }

  const irRecetasPersonalizadas = () => {
    navigation.navigate('PersonalizadasList')
  }
  const cargarReceta = () => {
    navigation.navigate('Carga')
  }
  let flatListRef = useRef();

  const fnRenderItem = ({ item }) => {
    return <RecetaItem item={item} onSelected={handleDetail} />
  }

  const handleDetail = (item) => {

    navigation.navigate('Detalle', {
      id: item._id,

      item: item
    })
  }
  const [collapsed, setCollapsed] = useState(true);



  const toggleExpanded = () => {

    setCollapsed(!collapsed);
  };

  const ordenar = () => {
    if (antigua === 'Recientes ▲') {
      setAntigua('Antiguas ▼');
      function SortArray(x, y) {
        return x.createdAt.localeCompare(y.createdAt);
      }
      recetas.sort(SortArray);



      recetas
    } else {
      setAntigua('Recientes ▲');
      function SortArray(x, y) {
        return y.createdAt.localeCompare(x.createdAt);
      }
      recetas.sort(SortArray);
    }
  }
  
  const guardarEnDispo = async () => {

   
      await AsyncStorage.setItem('recetasPersonalizadas', JSON.stringify(recetasPersonalizadas));
     
    
  }

  useEffect(()=> {
    guardarEnDispo();
    
  }, [])

  return (

    <View style={Global.container}>
      <View style={styles.flexi2}>
        <Text style={Global.menuTitle}>Destacadas</Text>
        <View>
         

          <TouchableOpacity onPress={toggleExpanded}>
            <View style={Global.menuDesplegable}>
              <Text ><Image source={require("./../assets/menu.png")} style={{
                height: 40,
                width: 30,

              }}
                resizeMode="cover" /></Text>

              {/*Heading of Single Collapsible*/}
            </View>
          </TouchableOpacity>
          {/*Content of Single Collapsible*/}
          <Collapsible collapsed={collapsed} align="center">
            <View style={styles.content}>
              <TouchableOpacity onPress={irPerfil}>
                <Text style={Global.btnMenu}>
                  Ir a Perfil
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={irRecetasPersonalizadas}>
                <Text style={Global.btnMenu}>
                  Recetas Personalizadas
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSignOut}>
                <Text style={Global.btnMenu}>
                  Cerrar Sesión
                </Text>
              </TouchableOpacity>
            </View>
          </Collapsible>
        </View>

      </View>
      <View style={styles.flexi}>
        <TouchableOpacity style={[styles.btn, Global.shadows]} onPress={ordenar}>
          <Text style={styles.textBlack}>
            {antigua}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.marginer]}>




        {recetas.length !== 0 ?

          <FlatList
            data={recetas}
            renderItem={fnRenderItem}
            keyExtractor={item => item._id}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            ref={(ref) => {
              flatListRef.current = ref;
            }}
            style={styles.carousel}


          />


          :
          <ActivityIndicator size={"large"} color={"blue"} />
        }

      </View>

      <Image source={require("./../assets/upload.png")} style={{
        height: 40,
        width: 30,

      }}
        resizeMode="cover" />
      <TouchableOpacity style={[Global.btn, Global.shadows]} onPress={cargarReceta} >
        <Text style={Global.textBlack}>Subir Receta</Text>


      </TouchableOpacity>
      <ModalUnico modalVisible={modal} setModalVisible={setModal} titulo={'Carga exitosa, sera publicada una vez la apruebe un admin'} texto1='Aceptar' funcion1={() => setModal(false)} />

    </View>
  )
}

export default Recetas;

const styles = StyleSheet.create({
  marginer: {
    marginBottom: 50
  },
  carousel: {
    maxHeight: 300,
  },
  flexi: {
    margin: 'auto',
    flexDirection: "row"
  },
  flexi2: {
    margin: 'auto',
    flexDirection: "row",
    height: 150
  },
  content: {
    backgroundColor: '#ebb174',
    borderRadius: 10,
    padding: 10

  },
  btn: {
    padding:10,
    marginBottom: 20,
    backgroundColor: '#FB9906',
    borderRadius: 15,
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    width: 120
  },

  textBlack: {
    color: 'black',
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  },
})