import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Button } from 'react-native';
import Global from '../styles/Global';

const Buscar = ({navigation}) => {
  const [habilitado, setHabilitado] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const [opcionBusqueda, setOpcionBusqueda] = useState("");
  let inicial={height: 150,width: 150, borderRadius: 20, opacity: 0.7}
  const [colored1,setColored1]=useState(inicial)
  const [colored2,setColored2]=useState(inicial)
  const [colored3,setColored3]=useState(inicial)
  const [colored4,setColored4]=useState(inicial)
  const [colored5,setColored5]=useState(inicial)

let secundario={
  height: 150,
  width: 150, borderRadius: 20,
  borderColor: 'red',
  borderWidth: 5,
}
const colorear1 =()=>{
  setHabilitado(true)
  setColored1(secundario)
  setColored2(inicial)
  setColored3(inicial)
  setColored4(inicial)
  setColored5(inicial)
  setOpcionBusqueda('tipo')

}
const colorear2 =()=>{
  setHabilitado(true)

  setColored2(secundario)
  setColored1(inicial)
  setColored3(inicial)
  setColored4(inicial)
  setColored5(inicial)
  setOpcionBusqueda('ingrediente')

}
const colorear3 =()=>{
  setHabilitado(true)

  setColored3(secundario)
  setColored1(inicial)
  setColored2(inicial)
  setColored4(inicial)
  setColored5(inicial)
  setOpcionBusqueda('usuario')

}
const colorear4 =()=>{
  setHabilitado(true)

  setColored4(secundario)
  setColored1(inicial)
  setColored2(inicial)
  setColored3(inicial)
  setColored5(inicial)
  setOpcionBusqueda('receta')

}
const colorear5 =()=>{
  setHabilitado(true)

  setColored5(secundario)
  setColored1(inicial)
  setColored2(inicial)
  setColored3(inicial)
  setColored4(inicial)
  setOpcionBusqueda('noingrediente')

}
const buscarReceta=()=>{
  


    navigation.navigate('Buscar2', {
      opcionBusqueda: opcionBusqueda,
      busqueda: busqueda.toLowerCase()
    })
  
  
}

  return (
    <View style={Global.container}>
      <View style={styles.barraBusqueda} >
        <TextInput style={Global.btnPlaceHolderBuscar}
          editable={habilitado}
          value={busqueda}
          onChangeText={setBusqueda}
          placeholder="Busca por tipo, ingrediente, usuario o nombre de receta"
          placeholderTextColor='#c7c6c6'
        ></TextInput>
        {busqueda!==''?<TouchableOpacity style={styles.botonBusqueda} onPress={buscarReceta}><Text style={Global.textBlack}>Buscar</Text></TouchableOpacity>:null}


      </View>
      <View style={styles.busquedaItem} >
        <View style={styles.itemTextImageIzq}>
          <Text style={Global.textBlack}>Por Tipo</Text>
          <TouchableOpacity onPress={colorear1}
            activeOpacity={1}

          >
            <View>

              <Image source={require("./../assets/tipo.jpg")} style={colored1}
                resizeMode="cover" />
            </View>

          </TouchableOpacity>
        </View>

        <View style={styles.itemTextImageDer}>
          <Text style={Global.textBlack}>Por Ingrediente</Text>
          <TouchableOpacity onPress={colorear2}
            activeOpacity={1}

          >
            <View>

              <Image source={require("./../assets/ingre.png")} style={colored2}
                resizeMode="cover" />
            </View>



          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.busquedaItem} >
        <View style={styles.itemTextImageIzq}>
          <Text style={Global.textBlack}>Por Usuario</Text>
          <TouchableOpacity onPress={colorear3}
            activeOpacity={1}

          >
            <View>

              <Image source={require("./../assets/usuario.png")} style={colored3}
                resizeMode="cover" />
            </View>

          </TouchableOpacity>
        </View>
        <View style={styles.itemTextImageDer}>
          <Text style={Global.textBlack}>Por Nombre Receta</Text>
          <TouchableOpacity onPress={colorear4}
            activeOpacity={1}

          >
            <View>

              <Image source={require("./../assets/receta.jpg")} style={colored4}
                resizeMode="cover" />
            </View>

          </TouchableOpacity>
        </View >
      </View>
      <View style={styles.itemTextImage}>
        <Text style={Global.textBlack}>Por No Ingrediente</Text>
        <TouchableOpacity onPress={colorear5}
          activeOpacity={1}

        >
          <View>

            <Image source={require("./../assets/mila.jpg")} style={colored5}
              resizeMode="cover" />
          </View>

        </TouchableOpacity>
      </View>

    </View >
  )
}

export default Buscar;

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