import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {  useState,useContext } from 'react';
import { auth } from '../firebase/Config';
import { onAuthStateChanged } from 'firebase/auth';
import MainTab from './tabs/MainTab';
import AuthStack from './stacks/AuthStack';
import {Menu} from '../context/MenuProvider';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Button } from 'react-native';






const MainNavigation=()=> {
    const {enabled} = useContext(Menu);

    const [user,setUser]= useState(null);
    const Stack =createNativeStackNavigator();

  


  return (
     <NavigationContainer >
         {enabled?<MainTab></MainTab>: <AuthStack></AuthStack>}
        {/* <MainTab ></MainTab>  */}
         
     </NavigationContainer>

  )
}
export default MainNavigation;

