import { useEffect, useState, useContext, useRef } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image, KeyboardAvoidingView } from 'react-native';
import Checkbox from 'expo-checkbox';
import { Login as LoginAPI } from '../controller/LoginController'
import { Menu } from '../context/MenuProvider';
import { signInWithEmailAndPassword } from 'firebase/auth';
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

const Auth1 = ({ navigation, route }) => {

    const { cargarUsuario, setEnabled } = useContext(Menu);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSelected, setSelection] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [iniciarError, setIniciarError] = useState('');

    // Validacion de usuario segun el rol del mismo.
    const handleSubmit = async (event) => {
        if (email === "" && password === "") {
            setIniciarError('Debe completar los campos')
        }
        else if (emailError === '' && passwordError === '') {

            try {
                let getLogin = await LoginAPI(email, password);
                if (getLogin.rdo == 0) {
                    cargarUsuario(getLogin.user.user)

                    setEnabled(true)


                } else if (getLogin.rdo == 2) {
                    navigation.navigate('AuthCompletar', {
                        alias: email,
                        email: email

                    })
                    setPassword('');
                    setEmail('')
                } else {
                    alert("Usuario o Contraseña incorrecta")
                    setPassword('');
                    setEmail('')


                }

            } catch (error) {


            }

        }




    }
    const recuperarUsuario = () => {

        navigation.navigate('Recupero');
    }
    const emailValidator = () => {
        setIniciarError('')
        if (email.length < 3 || !email.includes('')) {
            setEmailError('Correo electrónico o alias inválido')
        } else {
            setEmailError('')

        }

    }
    const passwordValidator = () => {
        setIniciarError('')
        if (password.length < 6) {
            setPasswordError('Contraseña inválida')
        } else {
            setPasswordError('')

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
                        placeholder="Correo electrónico o Alias"
                        placeholderTextColor='#c7c6c6'
                    ></TextInput>
                    <Text style={Global.errores}>{emailError}</Text>
                    <TextInput style={[Global.btnPlaceHolder,Global.shadows]}
                        onBlur={() => passwordValidator()}
                        secureTextEntry={true}
                        value={password}
                        onChangeText={setPassword}
                        placeholder="Contraseña"
                        placeholderTextColor='#c7c6c6'
                    ></TextInput>
                    <Text style={Global.errores}>{passwordError}</Text>

                    <View style={Global.checkboxContainer}>
                        <Checkbox
                            value={isSelected}
                            onValueChange={(newValue) => setSelection(newValue)}
                            style={Global.checkbox}
                        />
                        <Text style={Global.textRecordar}
                        > Recordar Correo Electronico</Text></View>
                    <Text style={Global.errores}>{iniciarError}</Text>
                    <TouchableOpacity style={[Global.btn,Global.shadows]} onPress={() => handleSubmit()}>
                        <Text style={Global.textBlack}>Iniciar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity >
                        <Text style={Global.textBlack} onPress={() => recuperarUsuario()}>¿Recuperar Usuario?</Text>
                    </TouchableOpacity>


                </View>
                </KeyboardAvoidingView> 

                
        </View>
        
    )
}

export default Auth1