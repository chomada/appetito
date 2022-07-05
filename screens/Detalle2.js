
import { View, Text, FlatList, StyleSheet,Li } from 'react-native';
import IngredienteItem from '../components/IngredienteItem';
import PasosItem from '../components/PasosItem';

import Global from '../styles/Global';
const Detalle2 = ({ route }) => {

  const { title, texto } = route.params;
  const fnRenderItem = ({ item }) => {
    return <IngredienteItem item={item} keyExtractor={item.ingrediente}/>
  }
  const fnRenderItem2 = ({ item }) => {
    return <PasosItem item={item} keyExtractor={item.paso}/>
  }
  return (
    <View style={styles.container} >
      <View style={styles.marginer}>
      
      {title == 'Descripción' ? <Text style={styles.textArea}>{texto.replace(/^\w/, (c) => c.toUpperCase())}</Text> : null}
      
      {title == 'Ingredientes' ? <FlatList
          data={texto}
          renderItem={fnRenderItem}
          keyExtractor={item => item.ingrediente}

        />
 : null}
  {title == 'Preparación' ? <FlatList
          data={texto}
          renderItem={fnRenderItem2}
          keyExtractor={item => item.paso}

        />
: null}
    
    </View>
    </View>
  )
}

export default Detalle2;

const styles = StyleSheet.create({
  marginer:{
    margin:20
  },
  container: {
    
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    textAlign: 'center'

  },
  textBlackTitle: {
    

    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 40,
    marginTop: -400,
    padding: 10,
    width: '95%',
    backgroundColor: 'white',
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold'

  },
  textArea: {
    padding: 20,
    backgroundColor: 'white',
    fontSize:20,

    textAlign: 'center',

    alignItems: 'center',
  },
  vista: {
    paddingTop:10,
    flexDirection: "row",
    textAlign: 'left',
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: 10
  }
})
