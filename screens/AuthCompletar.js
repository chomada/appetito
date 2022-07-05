import React, { useState, useContext } from 'react'
import {SafeAreaView, ScrollView, StyleSheet, Text, Button, StatusBar, TextInput, TouchableOpacity, View, Image, KeyboardAvoidingView } from 'react-native';
import Checkbox from 'expo-checkbox';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/Config';
import Global, { colors } from '../styles/Global';
import { Menu } from '../context/MenuProvider';
import { UpdateUser as UpdateUserAPI } from '../controller/UsersController';
import * as ImagePicker from 'expo-image-picker';

import {
    // Pickers
    PickerTime,
    PickerDate,
    PickerDateTime,
    PickerDateRange,
    // Dropdowns
    DropdownList,
    DropdownMeasurements,
    DropdownNumber,
    DropdownState,
    // TypeScript Types
    PickerItem,
  } from 'react-native-ultimate-modal-picker';
  

const EstiloDePrueba = StyleSheet.create({
    prueba: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'violet'
    }

});

const AuthCompletar = ({ navigation, route }) => {

    const { alias } = route.params;
    const [nombre, setNombre] = useState("");
    const [fecha, setFecha] = useState("");
    const [genero, setGenero] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [isSelected, setSelection] = useState(false);
    const [nombreError, setNombreError] = useState('');
    const [fechaError, setFechaError] = useState('');
    const [generoError, setGeneroError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [password2Error, setPassword2Error] = useState('');
   
    const [gender, setGender] = useState('');
    const [iniciarError, setIniciarError] = useState('');





    const items = [
        { label: 'Femenino', value: 'Femenino' },
        { label: 'Masculino', value: 'Masculino' }
       
      ];



    const endRegister = async (event) => {
        if (nombre === "" && fecha === "" && password === "" && password2 === "" && genero === "") {
            setIniciarError('Debe completar los campos')
        }
        else if (nombreError === '' && fechaError === '' && generoError === '' && passwordError === '' && password2Error === '') {
            try {


                let getCreate = await UpdateUserAPI(alias, nombre.toLowerCase(), password, genero, fecha);
                alert("Usuario registrado satisfactoriamente")
                navigation.navigate('Auth1')


            } catch (error) {
                console.log(error)
            }
        }


    }

    const nombreValidator = () => {
        setIniciarError('')

        if (nombre.length < 6 || !nombre.includes(' ')) {
            setNombreError('Campo requerido')
        } else {
            setNombreError('')

        }

    }
    const fechaValidator = () => {
        setIniciarError('')

        if (fecha.length < 2) {
            setFechaError('Campo requerido')
        } else {
            setFechaError('')

        }

    }
   

    const generoValidator = () => {
        setIniciarError('')

        if (genero.length < 5) {
            setGeneroError('Campo requerido')
        } else {
            setGeneroError('')

        }

    }
    const passwordValidator = () => {
        setIniciarError('')

        if (password.length < 6) {
            setPasswordError('Clave incorrecta. Debe contener al menos 6 digitos')
        } else {
            setPasswordError('')

        }

    }
    const password2Validator = () => {
        setIniciarError('')

        if (password !== password2) {
            setPassword2Error('Clave incorrecta. Deben coincidir con la anterior')
        } else {
            setPassword2Error('')

        }

    }

    const [image, setImage] = useState(null);

    const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      console.log(result);
  
      if (!result.cancelled) {
        setImage(result.uri);
      }
    };
    return (
        <View style={Global.container}>
                            <KeyboardAvoidingView behavior='position'>

            <View>
                    <Image source={require("./../assets/appetitologo.png")} style={{
                        height: 220,
                        width: 220,
                        borderRadius: 15,

                    }}
                        resizeMode="cover" />

                    <Text style={Global.textBlack} >Complete los campos:</Text>

                    <TextInput style={[Global.btnPlaceHolder, Global.shadows]}
                        onBlur={() => nombreValidator()}

                        value={nombre}
                        onChangeText={setNombre}
                        placeholder="Nombre y Apellido"
                        placeholderTextColor='#c7c6c6'
                    ></TextInput>
                    <Text style={Global.errores}>{nombreError}</Text>

                    <TextInput style={[Global.btnPlaceHolder, Global.shadows]}

                        onBlur={() => fechaValidator()}
                        keyboardType='numeric'

                        value={fecha}
                        onChangeText={setFecha}
                        placeholder="Edad"
                        placeholderTextColor='#c7c6c6'
                    ></TextInput>
                    <Text style={Global.errores}>{fechaError}</Text>

                    <TextInput style={[Global.btnPlaceHolder, Global.shadows]}
                        onBlur={() => generoValidator()}

                        value={genero}
                        onChangeText={setGenero}
                        placeholder="Género "
                        placeholderTextColor='#c7c6c6'
                    ></TextInput>
                    <Text style={Global.errores}>{generoError}</Text>

                    <TextInput style={[Global.btnPlaceHolder, Global.shadows]}
                        onBlur={() => passwordValidator()}

                        secureTextEntry={true}
                        value={password}
                        onChangeText={setPassword}
                        placeholder="Contraseña"
                        placeholderTextColor='#c7c6c6'
                    ></TextInput>
                    <Text style={Global.errores}>{passwordError}</Text>

                    <TextInput style={[Global.btnPlaceHolder, Global.shadows]}
                        onBlur={() => password2Validator()}

                        secureTextEntry={true}
                        value={password2}
                        onChangeText={setPassword2}
                        placeholder="Reingrese Contraseña"
                        placeholderTextColor='#c7c6c6'
                    ></TextInput>
                    <Text style={Global.errores}>{password2Error}</Text>

                    <SafeAreaView style={{  alignItems: 'center', justifyContent: 'center' }}>
                    
        <Button title="Sube una foto de portada" onPress={pickImage} />
        {image && <Image source={{ uri: image }} style={{ width: 80, height: 80 }} />}
     
                    </SafeAreaView>
                  
                    <Text style={Global.errores}>{iniciarError}</Text>

                    <TouchableOpacity style={[Global.btn, Global.shadows]} onPress={endRegister}>
                        <Text style={Global.textBlack}>Finalizar Registro</Text>
                    </TouchableOpacity>



            </View>
            </KeyboardAvoidingView>


        </View>
    )


}

export default AuthCompletar;

