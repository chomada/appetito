import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { auth } from '../firebase/Config';
import { onAuthStateChanged } from 'firebase/auth';
import MainTab from './tabs/MainTab';
import AuthStack from './stacks/AuthStack';

const MainNavigation=()=> {
    const [user,setUser]= useState(null);
    const Stack =createNativeStackNavigator();

    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                const uid = user.uid;
                // ...
            } else {
                setUser(null)
                // User is signed out
                // ...
            }
        });
    }, [])


  return (
    <NavigationContainer>
        {user?<MainTab></MainTab>: <AuthStack></AuthStack>}
      
    </NavigationContainer>
  )
}
export default MainNavigation;