import {  View,Text , TouchableOpacity,Image, StyleSheet, Dimensions } from 'react-native'
import {  useState } from 'react';

const {width,height}=Dimensions.get('window');

const RecetaItem = ({item,onSelected}) => {

  
  return (
    <View>{item.validada?
    <TouchableOpacity 
    activeOpacity={1}
              onPress={() => onSelected(item)}
            >
                <View>
                  
                    <Image style={styles.image} source ={{uri: item.imagen}}
              
            resizeMode = "cover"/>
                </View>
                <Text style={styles.textRecetaFlat}>  {item.nombreReceta.replace(/^\w/, (c) => c.toUpperCase())}</Text>
            </TouchableOpacity>:null}
            </View>
  )
}

export default RecetaItem;

const styles =StyleSheet.create({
  image:{
    height: 270,
              width,
              resizeMode:'cover',
  },
  textRecetaFlat: {
    width:300,
    color: 'black',
    textAlign: 'left',
    //fontWeight: 'bold',
    fontSize:22,
    margin:0,
    marginBottom:10
  }

})