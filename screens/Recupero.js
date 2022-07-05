import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity,KeyboardAvoidingView, View, Image } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/Config';
import Global, { colors } from '../styles/Global';
import { RecoverUser as RecoverUserAPI } from '../controller/UsersController';


const EstiloDePrueba = StyleSheet.create({
  prueba: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'violet'
  }

});

const Recupero = ({ navigation }) => {

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState('');
  const [iniciarError, setIniciarError] = useState('');

  const enviarCodigoRecupero = async () => {
    if (email === "") {
      setIniciarError('Debe completar los campos')
    }
    else if(emailError === '')

    try {
      if (emailError === '') {
        let recover = await RecoverUserAPI(email);
        
        if(recover.rdo==200){
          alert ("Revise su casilla de correo electrónico")
          navigation.navigate('Recupero2', {
            email: email
  
          });
          
        } else if (recover.rdo==403){
          alert (recover.mensaje)
          
        }
        else if (recover.rdo==404){
          alert (recover.mensaje)
        }
        else {
          alert ("Error inesperado. Vuelva a intentarlo")
        }
        
      }



    } catch (error) {

    }
  


  }
  const emailValidator = () => {
    if (email.length < 6 || !email.includes('@') || !email.includes('.')) {
      setEmailError('Correo electrónico inválido')
    } else {
      setEmailError('')

    }

  }

  return (
    <View style={Global.container}>
            <KeyboardAvoidingView behavior='position'>

      <View>
        <Image source={require("./../assets/appetitologo.png")} style={{
          height: 200,
          width: 250,
          borderRadius: 15,
          marginBottom: 100

        }}
          resizeMode="cover" />
        <Text style={Global.textBlack} >Ingrese:</Text>
        <TextInput style={[Global.btnPlaceHolder,Global.shadows]}
          onBlur={() => emailValidator()}

          value={email}
          onChangeText={setEmail}
          placeholder="Correo Electrónico"
          placeholderTextColor='#c7c6c6'></TextInput>
        <Text style={Global.errores}>{emailError}</Text>
        <Text style={Global.errores}>{iniciarError}</Text>
        <TouchableOpacity style={[Global.btn,Global.shadows]} onPress={enviarCodigoRecupero}>
          
          <Text style={Global.textBlack}>Enviar</Text>
        </TouchableOpacity>


      </View>
      </KeyboardAvoidingView>

     
    </View>
  )
}

export default Recupero;

