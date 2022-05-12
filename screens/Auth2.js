import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
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

const Auth2 = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignUp = ()=>{
        if (email !== "" && password != ""){
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setEmail("");
                    setPassword("");
                    // ..
                })
                .finally(()=> {
                    
                })
        }

    }
    
  return (
    <View style={Global.container}>
    <View>
    <Text style={Global.titulo} >Ingrese:</Text>
    <TextInput
                
                value={email}
                onChangeText={setEmail}
                placeholder="Ingrese email"
            ></TextInput>
             <TextInput
                
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
                placeholder="Ingrese password"
            ></TextInput>
           <TouchableOpacity onPress={handleSignUp}>
                <Text>Siguiente</Text>
            </TouchableOpacity>
           
       

    </View>

</View>
  )
}

export default Auth2

