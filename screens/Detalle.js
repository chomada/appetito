
import { View, Text, Image, FlatList, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import { useEffect, useState, useContext, useRef } from 'react';

import { VirtualizedList } from 'react-native-web';
import Global from '../styles/Global';
import IngredienteItem from '../components/IngredienteItem';
import { CreateFavourite as CreateFavouriteAPI } from '../controller/FavoriteController';
import { DeleteFavourite as DeleteFavouriteAPI } from '../controller/FavoriteController';
import { Menu } from '../context/MenuProvider';
import { GetRecetaPorId as GetRecetaPorIdAPI } from '../controller/RecetaController';
import DetalleItem from '../components/DetalleItem';
import { CreateReview as CreateReviewAPI } from '../controller/ReviewsController';
const Detalle = ({ navigation, route }) => {

  const { id } = route.params;
  const [item, setItem] = useState({ nombreReceta: '', descripcion: '', pasos: [], ingredientes: [] })

  const { usuario, setUsuario } = useContext(Menu);
  const [fav, setFav] = useState(false)

  const [letraElegida, setLetraElegida] = useState('Descripción');
  const [num, setNum] = useState(0);

  const personalizar = () => {
    navigation.navigate('Personalizar', {

      item: item
    })
  }
  const verDescripcion = () => {
    //aca iria item.descripcion o .ingredientes o .preparacion 
    setLetraElegida('Descripción')
    console.log("detalle receta: ", item)
  }
  const verIngredientes = () => {
    //aca iria item.descripcion o .ingredientes o .preparacion 
    setLetraElegida('Ingredientes')
  }
  const verPreparacion = () => {
    //aca iria item.descripcion o .ingredientes o .preparacion 
    setLetraElegida('Preparación')

  }
  const verMas = () => {
    navigation.navigate('Detalle2', {
      title: letraElegida,
      texto: item.descripcion
    })
  }
  const verMas2 = () => {
    navigation.navigate('Detalle2', {
      title: letraElegida,
      texto: item.ingredientes
    })
  }
  const verMas3 = () => {
    navigation.navigate('Detalle2', {
      title: letraElegida,
      texto: item.pasos
    })
  }
  const fnRenderItem = ({ item }) => {
    return <IngredienteItem item={item} />
  }
  //usuario.recetas.find(elemento => elemento.nameReceta === busqueda
  const agregarFav = async (event) => {


    try {
      let getFavourite = await CreateFavouriteAPI(usuario.email, item._id, item.nombreReceta, item.imagen, item.createdAt);
      if (getFavourite.rdo === 200) {
        //cambiar color
        setUsuario(getFavourite.user)
      }
      else {
        alert("Error al agregar favorito intente nuevamente")
      }

    } catch (error) {


    }

  }
  //  let agregoNum = () => {
  //   setNum(num)
  //   console.log("num: ",num)
    
  // }
  function agregoNum(leadTagNumber){
    setNum(Number(leadTagNumber))
    agregarReview();
 }

  const agregarReview = async (event) => {
    console.log("dentro de review",item._id,num)

    try {
      console.log("dentro de try")

      let createReview = await CreateReviewAPI(item._id, num);
      console.log("createReview")

      if (createReview.rdo === 200) {
        //cambiar color
        console.log("ok")
      }
      else {
        alert("Error al agregar la receña intente nuevamente")
      }

    } catch (error) {


    }

  }

  const sacarFav = async (event) => {
    try {
      let getFavourite = await DeleteFavouriteAPI(usuario.email, item._id);
      if (getFavourite.rdo === 200) {
        setUsuario(getFavourite.user)
      }
      else {
        alert("Error al borrar favorito intente nuevamente")
      }

    } catch (error) {


    }


  }
  const recetaId = async (event) => {

    let getRecetaId = await GetRecetaPorIdAPI(id);
    setItem(getRecetaId.data.receta)

  }
  useEffect(() => {
    recetaId();
    if (usuario.favorites.find(elemento => elemento.nameReceta === item.nombreReceta)) {
      setFav(true)
    } else {
      setFav(false)
    }
  }, [agregarFav, sacarFav])
  return (
    <View style={Global.container2} >
      <TouchableOpacity style={Global.btnPersonalizar} onPress={() => personalizar()}>
        <Text style={Global.titlePersonalizar}>Personalizar receta</Text>
      </TouchableOpacity>
      {item.nombreReceta != '' ? <View>

        <Image source={{ uri: item.imagen }}
          style={{
            height: 250,

            resizeMode: 'cover'
          }}
          resizeMode="cover" />
        <View style={styles.flexi}>
          {item.nombreReceta.length > 10 ? <Text style={Global.recetaTitleChico}>{item.nombreReceta.replace(/^\w/, (c) => c.toUpperCase())}</Text> :
            <Text style={Global.recetaTitle}>{item.nombreReceta.replace(/^\w/, (c) => c.toUpperCase())}</Text>}
          {fav ? <TouchableOpacity style={Global.like} onPress={sacarFav} >
            <Image source={require("./../assets/black.png")} style={{ width: 40, height: 40 }} />
          </TouchableOpacity> : <TouchableOpacity style={Global.like} onPress={agregarFav} >
            <Image source={require("./../assets/heart.png")} style={{ width: 40, height: 40 }} />
          </TouchableOpacity>}

        </View>

        <View style={styles.minPersonasDificultad} >
          <View >
            <View style={styles.vistaImagen}>

              <Image source={require("./../assets/time.png")} style={{ width: 40, height: 40 }}
                resizeMode="cover" />
            </View>
            <Text style={Global.textBlack}>{item.duracion} Min</Text>

          </View>

          <View >
            <View style={styles.vistaImagen}>

              <Image source={require("./../assets/community.png")} style={{ width: 65, height: 40 }}
                resizeMode="cover" />
            </View>
            <Text style={Global.textBlack}>{item.cantidadPersonas} personas</Text>

          </View>
          <View >
            <View style={styles.vistaImagen}>

              <Image source={require("./../assets/chef.png")} style={{ width: 40, height: 40 }}
                resizeMode="cover" />
            </View>
            <Text style={Global.textBlack}>{item.dificultad}</Text>

          </View>
        </View>

        <View style={styles.estrellas} >
          <View >

            <View style={styles.btn}>
              <Image source={require("./../assets/head.png")} style={{ width: 20, height: 20 }}
                resizeMode="cover" />
              <Text style={styles.text}>{' '}{item.nombreUsuario}</Text>
            </View>

            <View style={styles.btn}>
              <Image source={require("./../assets/calendar.png")} style={{ width: 20, height: 20 }}
                resizeMode="cover" />
              <Text >{' '}{item.createdAt.slice(0, 10)}</Text>
            </View>

          </View>




          <View style={styles.btnEstrellas}>
            <View style={styles.vistaImagen2} >
              {num==1|| num==2 || num==3 ||num==4 ||num==5?<TouchableOpacity onPress={()=>agregoNum(1)}>
                <Image source={require("./../assets/starBlack.png")} style={{ width: 30, height: 30 }}
                  resizeMode="cover" />
              </TouchableOpacity>: <TouchableOpacity onPress={()=>agregoNum(1)}>
                <Image source={require("./../assets/star.png")} style={{ width: 30, height: 30 }}
                  resizeMode="cover" />
              </TouchableOpacity>}
             {num==2 || num==3 ||num==4 ||num==5?    <TouchableOpacity onPress={()=>agregoNum(2)}>
                <Image source={require("./../assets/starBlack.png")} style={{ width: 30, height: 30 }}
                  resizeMode="cover" />
              </TouchableOpacity>:    <TouchableOpacity onPress={()=>agregoNum(2)}>
                <Image source={require("./../assets/star.png")} style={{ width: 30, height: 30 }}
                  resizeMode="cover" />
              </TouchableOpacity>}
          
              { num==3 ||num==4 ||num==5?    <TouchableOpacity onPress={()=>agregoNum(3)}>
                <Image source={require("./../assets/starBlack.png")} style={{ width: 30, height: 30 }}
                  resizeMode="cover" />
              </TouchableOpacity>:
              <TouchableOpacity onPress={()=>agregoNum(3)}>
                <Image source={require("./../assets/star.png")} style={{ width: 30, height: 30 }}
                  resizeMode="cover" />
              </TouchableOpacity>
              }
                   {  num==4 ||num==5? <TouchableOpacity onPress={()=>agregoNum(4)}>
                <Image source={require("./../assets/starBlack.png")} style={{ width: 30, height: 30 }}
                  resizeMode="cover" />
              </TouchableOpacity>:
              <TouchableOpacity onPress={()=>agregoNum(4)}>
                <Image source={require("./../assets/star.png")} style={{ width: 30, height: 30 }}
                  resizeMode="cover" />
              </TouchableOpacity>}
              {num==5?  <TouchableOpacity onPress={()=>agregoNum(5)}>
                <Image source={require("./../assets/starBlack.png")} style={{ width: 30, height: 30 }}
                  resizeMode="cover" />
              </TouchableOpacity>:  <TouchableOpacity onPress={()=>agregoNum(5)}>
                <Image source={require("./../assets/star.png")} style={{ width: 30, height: 30 }}
                  resizeMode="cover" />
              </TouchableOpacity>}
            
            </View>
            {item.puntuacion == 1 ? <Text style={Global.textBlack}> {item.puntuacion} estrella</Text> : <Text style={Global.textBlack}> {item.puntuacion} estrellas</Text>}

          </View>

        </View>

        <View style={styles.DescIngrePre} >
          <TouchableOpacity style={Global.btn2} onPress={verDescripcion}


          ><Text style={Global.textBlack}>Descripción</Text>

          </TouchableOpacity>


          <TouchableOpacity style={Global.btn2} onPress={verIngredientes}


          ><Text style={Global.textBlack}>Ingredientes</Text>

          </TouchableOpacity>

          <TouchableOpacity style={Global.btn2} onPress={verPreparacion}


          ><Text style={Global.textBlack}>Preparación</Text>

          </TouchableOpacity>
        </View>
        {letraElegida == 'Descripción' ? <View style={styles.textArea}>
          {item.descripcion.length > 100 ? <Text >{item.descripcion.slice(0, 99).replace(/^\w/, (c) => c.toUpperCase())}...</Text> : <Text >{item.descripcion.replace(/^\w/, (c) => c.toUpperCase())}</Text>}
          {item.descripcion.length > 100 ? <TouchableOpacity onPress={verMas}


          ><Text style={Global.textBlack}>Ver mas</Text>

          </TouchableOpacity> : null}
        </View> : null}

        {letraElegida == 'Ingredientes' ? <View style={styles.textArea}>
          {item.ingredientes.length > 2 ? <FlatList
            data={item.ingredientes.slice(0, 2)}
            renderItem={fnRenderItem}
            keyExtractor={item => item.ingrediente}

          /> : <FlatList
            data={item.ingredientes}
            renderItem={fnRenderItem}
            keyExtractor={item => item.ingrediente}

          />}
          {item.ingredientes.length > 2 ? <TouchableOpacity onPress={verMas2}


          ><Text style={Global.textBlack}>Ver mas</Text>

          </TouchableOpacity> : null}
        </View> : null}
        {letraElegida == 'Preparación' ? <View style={styles.textArea}>

          {item.pasos.length > 0 ? <TouchableOpacity onPress={verMas3}


          ><Text style={Global.textBlack}>Ver pasos</Text>

          </TouchableOpacity> : null}
        </View> : null}
      </View> : <ActivityIndicator style={styles.espera} size={"large"} color={"blue"} />}
    </View>
  )
}

export default Detalle

const styles = StyleSheet.create({
  espera: {
    flex: 1
  },
  btnEstrellas: {

    padding: 5,
    margin: 'auto',

    backgroundColor: 'white',
    borderRadius: 15,
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold'
  },
  btn: {
    flexDirection: "row",
    textAlign: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',


    padding: 10,

    marginBottom: 5,

    backgroundColor: 'white',
    borderRadius: 15,


  },
  carousel: {
    maxHeight: 300,
  },
  flexi: {

    flexDirection: "row"
  },
  text: {
    justifyContent: 'center',
    alignItems: 'center',

    textAlign: 'center'

  },
  minPersonasDificultad: {
    padding: 5,
    marginLeft: 75,
    marginRight: 75,
    backgroundColor: 'white',
    margin: 5,
    flexDirection: "row",
    textAlign: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 5,
  },
  textArea: {
    padding: 5,

    backgroundColor: 'white',
    marginRight: 5,
    marginLeft: 5,
    textAlign: 'center',
    alignItems: 'center',
  },
  DescIngrePre: {
    padding: 5,
    marginLeft: 5,
    marginRight: 5,
    backgroundColor: 'white',

    flexDirection: "row",
    textAlign: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopEndRadius: 5,
    borderTopStartRadius: 5
  },
  estrellas: {
    margin: 5,
    flexDirection: "row",
    textAlign: 'center',
    justifyContent: 'space-between',
    alignItems: 'center'


  },

  vistaImagen: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10
  },
  vistaImagen2: {
    flexDirection: "row",
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10
  }
})
