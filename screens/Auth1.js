import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View,Image } from 'react-native';
import Checkbox from 'expo-checkbox';


import { signInWithEmailAndPassword  } from 'firebase/auth';
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

const Auth1 = ({navigation,route}) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSelected, setSelection] = useState(false);

    

    const recuperarUsuario = () => {

        navigation.navigate('Auth3')
    }
    const handleLogin = () => {
        if (email !== "" && password != ""){
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    (errorCode, errorMessage);
                    setEmail("");
                    setPassword("");
                    alert('Usuario o contraseña incorrecta')
                })
                .finally(()=> {
                    
                })
        }
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
        resizeMode="cover"/>
        <Text style={Global.textBlack} >Ingrese:</Text>
        <TextInput style={Global.btnPlaceHolder}
                    
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Correo Electronico"
                    placeholderTextColor='#c7c6c6'
                ></TextInput>
                 <TextInput style={Global.btnPlaceHolder}
                    
                    secureTextEntry={true}
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Contraseña"
                    placeholderTextColor='#c7c6c6'
                ></TextInput>
                <View style={Global.checkboxContainer}>
                 <Checkbox
          value={isSelected}
          onValueChange={(newValue) => setSelection(newValue)}
          style={Global.checkbox}
        />
                 <Text style={Global.textRecordar}
                     > Recordar Correo Electronico</Text></View>
               <TouchableOpacity style={Global.btn} onPress={handleLogin}>
                    <Text style={Global.textBlack}>Iniciar</Text>
                </TouchableOpacity>
                <TouchableOpacity >
                <Text style={Global.textBlack} onPress={() => recuperarUsuario()}>¿Recuperar Usuario?</Text>
            </TouchableOpacity>
               
           

        </View>
    
    </View>
  )
}

export default Auth1

