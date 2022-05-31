import {  View,Text , TouchableOpacity,Image } from 'react-native'


const RecetaItem = ({item,onSelected}) => {

  return (
    <TouchableOpacity
              onPress={() => onSelected(item)}
            >
                <View>
                   
                    <Image source ={{uri: item.imagen}}
              style = {{
              height: 200,
              width: 300,
            }}
            resizeMode = "cover"/>
                </View>
             
            </TouchableOpacity>
  )
}

export default RecetaItem;