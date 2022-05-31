import React, { useState } from 'react'
import { StyleSheet, Text, Image, TouchableOpacity, View } from 'react-native';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/Config';
import Global, { colors } from '../styles/Global';

const EstiloDePrueba = StyleSheet.create({
    prueba: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'violet'
    }

});

const Auth = ({ navigation, route }) => {

    const handleIniciar = () => {

        navigation.navigate('Auth1')
    }
    const handleRegistrate = () => {

        navigation.navigate('Auth2')
    }
    return (
        <View style={Global.container}>
            <View>
                <Image source={require("./../assets/appetitologo.png")} style={{
                    height: 200,
                    width: 250,
                    borderRadius: 15,
                    marginBottom: 100

                }}
                    resizeMode="cover" />
                <TouchableOpacity style={Global.btn} onPress={() => handleIniciar()}>
                    <Text style={Global.textBlack} >Iniciar sesión</Text>
                </TouchableOpacity>

                <Text style={Global.textBlack} textBlack>¿Primera vez que ingresás?</Text>

                <TouchableOpacity style={Global.btn} onPress={() => handleRegistrate()}>
                    <Text style={Global.textBlack} >Registrate</Text>
                </TouchableOpacity>



            </View>

        </View>
    )
}

export default Auth

