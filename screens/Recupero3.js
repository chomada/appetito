import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView,Image } from 'react-native';
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

const Recupero3 = ({ navigation, route }) => {
  const { email, codigo } = route.params;
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [passwordError, setPasswordError] = useState('')
  const [password2Error, setPassword2Error] = useState('')
  const [iniciarError, setIniciarError] = useState('');
  

  const enviarCodigoRecupero = async () => {

    if (password === "" && password2==="") {
      setIniciarError('Debe completar los campos')
    }
    else if(passwordError === ''){

    try {
      if(password2Error==='' && passwordError ===''){
        let recover = await RecoverUserAPI(email, password, codigo);
        if (recover.rdo == 200) {
          alert("Contraseña cambiada satisfactoriamente")
          navigation.navigate('Auth1');
        } else if (recover.rdo == 400){
          alert("Error inesperado. Vuelva a intentarlo")
          navigation.navigate('Auth1');
        }
        else {
          alert ("Error inesperado. Vuelva a intentarlo")
        }
      }
    } catch (error) {

    }
    }

  }
  const passwordValidator = () => {
    if (password.length < 6) {
      setPasswordError('Contraseña inválida')
    } else {
      setPasswordError('')

    }

  }
  const password2Validator = () => {
    if (password2.length < 6 || password !== password2) {
      setPassword2Error('Contraseña inválida')

    } else {
      setPassword2Error('')

    }

  }

  return (
    <View style={Global.container}>
      <View>
      <KeyboardAvoidingView behavior='position'>
        <Image source={require("./../assets/appetitologo.png")} style={{
          height: 200,
          width: 250,
          borderRadius: 15,
          marginBottom: 100

        }}
          resizeMode="cover" />
        <Text style={Global.textBlack} >Ingrese contraseña:</Text>
        <TextInput style={[Global.btnPlaceHolder,Global.shadows]}
          secureTextEntry={true}
          onBlur={() => passwordValidator()}

          value={password}
          onChangeText={setPassword}
          placeholder="Nueva contraseña"
          placeholderTextColor='#c7c6c6'            ></TextInput>
        <Text style={Global.errores}>{passwordError}</Text>

        <TextInput style={[Global.btnPlaceHolder,Global.shadows]}
          secureTextEntry={true}
          onBlur={() => password2Validator()}

          value={password2}
          onChangeText={setPassword2}
          placeholder="Reingrese contraseña"
          placeholderTextColor='#c7c6c6'            ></TextInput>
        <Text style={Global.errores}>{password2Error}</Text>
        <Text style={Global.errores}>{iniciarError}</Text>
        <TouchableOpacity style={[Global.btn,Global.shadows]} onPress={enviarCodigoRecupero}>

          <Text style={Global.textBlack}>Finalizar</Text>
        </TouchableOpacity>

        </KeyboardAvoidingView>

      </View>

    </View>
  )
}

export default Recupero3;

