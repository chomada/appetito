import {  View,Text , TouchableOpacity,Image, StyleSheet, Dimensions } from 'react-native'

const {width,height}=Dimensions.get('window');

const RecetaItem = ({item,onSelected}) => {

  
  return (
    <TouchableOpacity
    activeOpacity={1}
              onPress={() => onSelected(item)}
            >
                <View>
                   
                    <Image style={styles.image} source ={{uri: item.imagen}}
              
            resizeMode = "cover"/>
                </View>
             
            </TouchableOpacity>
  )
}

export default RecetaItem;

const styles =StyleSheet.create({
  image:{
    height: 250,
              width,
              resizeMode:'cover'
  }
})