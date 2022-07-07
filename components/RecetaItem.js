import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native'
import { useState } from 'react';

const { width, height } = Dimensions.get('window');

const RecetaItem = ({ item, onSelected }) => {


  return (
    <View>{item.validada ?
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => onSelected(item)}
      >
        <View style={{ flexDirection: "row" }}>
          <View style={{ width:250 }}> 
          <Text style={styles.textRecetaFlat2}>  {item.nombreReceta.replace(/^\w/, (c) => c.toUpperCase())}</Text>
          </View>
          <View style={{
             flexDirection: "row"
             }}>
          
            <Text style={styles.textRecetaFlat}> {item.puntuacion} estrellas</Text>
            <TouchableOpacity style={{ marginBottom:5 }}>
              <Image source={require("./../assets/starBlack.png")} style={{ width: 30, height: 30 }}
                resizeMode="cover" />
            </TouchableOpacity>
          </View>
        </View>


        <View>

          <Image style={styles.image} source={{ uri: item.imagen }}

            resizeMode="cover" />
        </View>
      </TouchableOpacity> : null}
    </View>
  )
}

export default RecetaItem;

const styles = StyleSheet.create({
  image: {
    height: 270,
    width,
    resizeMode: 'cover',
  },
  textRecetaFlat: {
    color: 'black',
    textAlign: 'left',
    //fontWeight: 'bold',
    fontSize: 22,
    marginTop:3
           
  },
  textRecetaFlat2: {
    color: 'black',
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: 22,
    marginTop:3
           
  }

})