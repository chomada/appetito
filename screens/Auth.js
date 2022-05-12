import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { createUserWithEmailAndPassword,signInWithEmailAndPassword  } from 'firebase/auth';
import { auth } from '../firebase/Config';
import Global,{ colors } from '../styles/Global';

const EstiloDePrueba= StyleSheet.create({
    prueba:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'violet'
    }

});

const Auth = ({navigation,route}) => {

    const handleIniciar = () => {

        navigation.navigate('Auth1')
    }
    const handleRegistrate = () => {

        navigation.navigate('Auth2')
    }
  return (
    <View style={Global.container}>
        <View>
            <Text style={Global.titulo} onPress={() => handleIniciar()}>Iniciar Sesión</Text>
            <Text >Primera vez que ingresas?</Text>
            <Text style={Global.titulo} onPress={() => handleRegistrate()}>Registrate</Text>

        </View>
    
    </View>
  )
}

export default Auth

