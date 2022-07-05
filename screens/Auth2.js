import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image, KeyboardAvoidingView } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/Config';
import Global, { colors } from '../styles/Global';
import { CreateUser as CreateUserAPI } from '../controller/UsersController';

const EstiloDePrueba = StyleSheet.create({
  prueba: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'violet'
  }

});

const Auth2 = ({ navigation, route }) => {

  const [alias, setAlias] = useState("");
  const [email, setEmail] = useState("");
  const [aliasError, setAliasError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [iniciarError, setIniciarError] = useState('');

  const handleSignUp = async (event) => {
    if (email === "" && alias === "") {
      setIniciarError('Debe completar los campos')
    }
    else if (emailError === '' && aliasError === '') {

      try {
        let getCreate = await CreateUserAPI(email, alias);
        console.log("alias disponibles:", getCreate.alias);
        console.log("que trae:", getCreate);
        if (getCreate.mensaje === "ya existe") {
          let opciones = `Ej: ${getCreate.alias.aliasOptions1.slice(0,-2)} - ${getCreate.alias.aliasOptions2.slice(0,-2)}`

          setAliasError(opciones);
          alert('Alias ya existente. Elija otro...')
        } else if (getCreate.mensaje === "recuperar contraseña") {
          alert("Correo electrónico ya existente. Intente recuperar su contraseña");
          navigation.navigate('Recupero');
          setEmail('');
          setAlias('');

        } else if (getCreate.mensaje === "no se puede usar ese email") {
          alert("Registración incompleta. Comuníquese con soporte");
          setEmail('');
          setAlias('');

        } else {
          alert("Registro iniciado correctamete. Revise su casilla de correo electrónico");
          navigation.navigate('Auth1');
          setEmail('');
          setAlias('');
        }


      } catch (error) {


      }

    }



  }
  const emailValidator = () => {
    setIniciarError('')
    if (email.length < 6 || !email.includes('@') || !email.includes('.')) {
      setEmailError('Correo electrónico inválido')
    } else {
      setEmailError('')

    }

  }
  const aliasValidator = () => {
    setIniciarError('')
    if (alias.length < 5) {
      setAliasError('Alias inválido')
    } else {
      setAliasError('')

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
          onBlur={() => aliasValidator()}

          value={alias}
          onChangeText={setAlias}
          placeholder="Alias"
          placeholderTextColor='#c7c6c6'            ></TextInput>
        <Text style={Global.errores}>{aliasError}</Text>

        <TextInput
          style={[Global.btnPlaceHolder,Global.shadows]}
          onBlur={() => emailValidator()}

          value={email}
          onChangeText={setEmail}
          placeholder="Correo Electrónico"
          placeholderTextColor='#c7c6c6'            ></TextInput>
        <Text style={Global.errores}>{emailError}</Text>
        <Text style={Global.errores}>{iniciarError}</Text>

        <TouchableOpacity style={[Global.btn,Global.shadows]} onPress={handleSignUp}>
          <Text style={Global.textBlack}>Siguiente</Text>
        </TouchableOpacity>


        
      </View>
      </KeyboardAvoidingView> 
    </View>
  )
}

export default Auth2