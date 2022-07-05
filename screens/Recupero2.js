import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, KeyboardAvoidingView,View, Image } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
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

const Recupero2 = ({ navigation,route }) => {
  const { email } = route.params;
  const [codigo, setCodigo] = useState("");

  const enviarCodigoRecupero = () => {
    //validar codigo de verificacion
    navigation.navigate('Recupero3', {
      email:email,
      codigo: codigo
    });


  }

  return (
    <View style={Global.container}>
      <View><KeyboardAvoidingView behavior='position'> 

        <Image source={require("./../assets/appetitologo.png")} style={{
          height: 200,
          width: 250,
          borderRadius: 15,
          marginBottom: 100

        }}
          resizeMode="cover" />
        <Text style={Global.textBlack} >Ingrese el código:</Text>
        <TextInput style={[Global.btnPlaceHolder,Global.shadows]}

          value={codigo}
          onChangeText={setCodigo}
          placeholder="Código de verificación"
          placeholderTextColor='#c7c6c6'            ></TextInput>

        <TouchableOpacity style={[Global.btn,Global.shadows]} onPress={enviarCodigoRecupero}>
          <Text style={Global.textBlack}>Enviar</Text>
        </TouchableOpacity>


        </KeyboardAvoidingView>
      </View>

    </View>
  )
}

export default Recupero2;

