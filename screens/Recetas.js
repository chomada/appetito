import { useEffect, useState,useContext, useRef } from 'react';
import { View, Text, ActivityIndicator, FlatList, TouchableOpacity,Image,StyleSheet,SafeAreaView,
  Switch,
  ScrollView
 } from 'react-native'
import RecetaItem from '../components/RecetaItem';
import {Menu} from '../context/MenuProvider';
import { auth } from '../firebase/Config';
import { signOut } from 'firebase/auth';
import Global from '../styles/Global';

//import for the collapsible/Expandable view
import Collapsible from 'react-native-collapsible';





const Recetas = ({ navigation, route }) => {

   const {recetas} = useContext(Menu);


   const handleSignOut = () => {
    signOut(auth).then(() => {
        // Sign-out successful.
    }).catch((error) => {
        // An error happened.
    });
}
let flatListRef =useRef();

  const fnRenderItem = ({ item }) => {
    return <RecetaItem item={item} onSelected={handleDetail} />
  }

  const handleDetail = (item) => {


    navigation.navigate('Detalle', {
      id: item.id,
      
      item: item
    })
  }
  const [collapsed, setCollapsed] = useState(true);
  // MultipleSelect is for the Multiple Expand allowed
  // True: Expand multiple at a time
  // False: One can be expand at a time
  

  const toggleExpanded = () => {
    //Toggling the state of single Collapsible
    setCollapsed(!collapsed);
  };
  return (

    <View style={Global.container}>
      <View style={styles.flexi}>
      <Text style={Global.menuTitle}>Menu</Text>
      <View>
        <TouchableOpacity onPress={toggleExpanded}>
            <View style={Global.menuDesplegable}>
              <Text ><Image source={require("./../assets/menu.png")} style={{
          height: 40,
          width: 30,

        }}
        resizeMode="cover"/></Text>
        
              {/*Heading of Single Collapsible*/}
            </View>
          </TouchableOpacity>
          {/*Content of Single Collapsible*/}
          <Collapsible  collapsed={collapsed} align="center">
            <View style={styles.content}>
              <Text style={Global.btnMenu}>
                Ir a Perfil
              </Text>
              <Text style={Global.btnMenu}>
                Recetas Personalizadas
              </Text>
              <TouchableOpacity onPress={handleSignOut}>
                <Text style={Global.btnMenu}>
                    Sign out
                </Text>
            </TouchableOpacity>
            </View>
          </Collapsible>
          </View>

          </View>
      <Text style={Global.textBlackTitle}>Destacadas</Text>
      {recetas.length !== 0 ?
      
        <FlatList
          data={recetas}
          renderItem={fnRenderItem}
          keyExtractor={item => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          ref={(ref) =>{
            flatListRef.current=ref;
          }}
          style={styles.carousel}

        />
        :
        <ActivityIndicator size={"large"} color={"blue"} />
      }
        <Image source={require("./../assets/upload.png")} style={{
          height: 40,
          width: 30,

        }}
        resizeMode="cover"/>
        <TouchableOpacity style={Global.btn} >
                <Text style={Global.textBlack}>Subir Receta</Text>
            </TouchableOpacity>

    </View>
  )
}

export default Recetas;

const styles= StyleSheet.create({
  carousel:{
    maxHeight:300,
  },
  flexi:{
    margin:'auto',
    flexDirection: "row"
  },
  content:{
    backgroundColor:'#ebb174',
    borderRadius: 10,
    padding:10

  }
})