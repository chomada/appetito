import React, { useState } from 'react'
import { StyleSheet, Text, Image, TouchableOpacity, View, KeyboardAvoidingView } from 'react-native';
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
            <KeyboardAvoidingView>
            <View>
                <Image source={require("./../assets/appetitologo.png")} style={{
                    height: 200,
                    width: 250,
                    borderRadius: 15,
                    marginBottom: 100

                }}
                    resizeMode="cover" />
                <TouchableOpacity style={[Global.btn,Global.shadows]} onPress={() => handleIniciar()}>
                    <Text style={Global.textBlack } >Iniciar sesión</Text>
                </TouchableOpacity>

                <Text style={Global.textBlack} textBlack>¿Primera vez que ingresás?</Text>

                <TouchableOpacity style={[Global.btn,Global.shadows]} onPress={() => handleRegistrate()}>
                    <Text style={[Global.textBlack]} >Registrate</Text>
                </TouchableOpacity>


            
            </View>
            </KeyboardAvoidingView>
        </View>
        
    )
}

export default Auth

