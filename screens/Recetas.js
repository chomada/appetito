import { useEffect, useState,useContext } from 'react';
import { View, Text, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native'
import RecetaItem from '../components/RecetaItem';
import {Menu} from '../context/MenuProvider';
import { auth } from '../firebase/Config';
import { signOut } from 'firebase/auth';



const Recetas = ({ navigation, route }) => {

   const {recetas} = useContext(Menu);


   const handleSignOut = () => {
    signOut(auth).then(() => {
        // Sign-out successful.
    }).catch((error) => {
        // An error happened.
    });
}

  const fnRenderItem = ({ item }) => {
    return <RecetaItem item={item} onSelected={handleDetail} />
  }

  const handleDetail = (item) => {


    navigation.navigate('Detalle', {
      id: item.id,
      
      item: item
    })
  }
  return (
    <View>
      <TouchableOpacity onPress={handleSignOut}>
                <Text>
                    Sign out
                </Text>
            </TouchableOpacity>
      <Text>Recetas</Text>
      {recetas.length !== 0 ?
        <FlatList
          data={recetas}
          renderItem={fnRenderItem}
          keyExtractor={item => item.id.toString()}
        />
        :
        <ActivityIndicator size={"large"} color={"blue"} />
      }

    </View>
  )
}

export default Recetas