import {  View,Text , TouchableOpacity,Image } from 'react-native'


const RecetaItem = ({item,onSelected}) => {

  return (
    <TouchableOpacity
              onPress={() => onSelected(item)}
            >
                <View>
                    <Text>
                        {item.nombre}
                    </Text>
                </View>
             
            </TouchableOpacity>
  )
}

export default RecetaItem;