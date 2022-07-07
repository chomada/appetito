import React, { useEffect } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Button } from 'react-native';
import Global from '../styles/Global';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Perfil = ({ route }) => {

    const clearAllData=()=> {
        AsyncStorage.getAllKeys()
            .then(keys => AsyncStorage.multiRemove(keys))
            .then(() => alert('success'));
    }
    
    useEffect(() => {
        (async ()=>{
            clearAllData()
       
          
      })()
        
       
      }, [])
    const { user } = route.params;
    return (
        <View style={Global.container}>
            <Image style={styles.image} source={{ uri: user.image }}

                resizeMode="cover" />
            <Text style={styles.btn}>{user.name}</Text>


            <View style={styles.minPersonasDificultad} >


                <View >
                    {user.recetas.length == 0 ? <View >

                        <Text style={styles.textBlack} >0</Text>
                    </View> : <View >

                        <Text style={styles.textBlack} >{user.recetas.length}</Text>
                    </View>}

                    <TouchableOpacity disabled style={styles.marginR}>
                        <Text  >Publicaciones</Text>
                    </TouchableOpacity>

                </View>
                <View >
                    {user.favorites.length == 0 ? <View >

                        <Text style={styles.textBlack}>0</Text>
                    </View> : <View >

                        <Text style={styles.textBlack}>{user.favorites.length}</Text>
                    </View>}
                    
                    <TouchableOpacity disabled style={styles.marginIzq}>
                        <Text >Me gusta</Text>
                    </TouchableOpacity>

                </View>
            </View>
            <Text style={styles.btn}>Alias: {user.alias}</Text>
            <Text style={styles.btn}>Rol: {user.role}</Text>
            <Text style={styles.btn}>Edad: {user.birth}</Text>
            <Text style={styles.btn}>Género: {user.gender}</Text>


        </View >
    )
}

export default Perfil;

const styles = StyleSheet.create({
    image: {
        height: 250,
        width: 250,
        borderRadius: 15,
        resizeMode: 'cover',
        marginTop: -100
    },

    marginIzq: {
        marginLeft: 10,
        width: 150,
        padding: 10,
        margin: 'auto',
        marginBottom: 10,
        marginTop: 10,
        backgroundColor: 'white',
        borderRadius: 15,
        color: 'black',
        fontWeight: 'bold',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    },
    marginR: {
        marginRight: 10,
        width: 150,
        padding: 10,
        margin: 'auto',
        marginBottom: 10,
        marginTop: 10,
        backgroundColor: 'white',
        borderRadius: 15,
        color: 'black',
        fontWeight: 'bold',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    },
    btn: {
        width: '75%',
        padding: 10,
        margin: 'auto',
        marginBottom: 10,
        marginTop: 5,
        backgroundColor: 'white',
        borderRadius: 15,
        textAlign: 'center',
        color: 'black',
        fontWeight: 'bold'
    },
    textBlack: {
        color: 'black',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
    },
    minPersonasDificultad: {


        //opacity: 0.5,

        flexDirection: "row",
        textAlign: 'center',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 5,
    }
})