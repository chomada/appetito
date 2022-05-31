import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import { createUserWithEmailAndPassword  } from 'firebase/auth';
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

const Auth3 = () => {

    const [email, setEmail] = useState("");

    const enviarCodigoRecupero = ()=>{
        console.log("proximamente...")

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
                placeholderTextColor='#c7c6c6'            ></TextInput>
            
           <TouchableOpacity style={Global.btn} onPress={enviarCodigoRecupero}>
                <Text style={Global.textBlack}>Enviar</Text>
            </TouchableOpacity>
           
       

    </View>

</View>
  )
}

export default Auth3;

