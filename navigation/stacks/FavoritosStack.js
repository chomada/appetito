import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Detalle from "../../screens/Detalle";
import Detalle2 from "../../screens/Detalle2";
import Favoritos from "../../screens/Favoritos";


const FavoritosStack = () => {

  const Stack = createNativeStackNavigator();

  return (
    
      <Stack.Navigator
        
      >
        <Stack.Screen 
        name='Favoritos Tab' 
        component={Favoritos}
        options={{
          title: 'Favoritos',
           headerStyle: {
            backgroundColor: '#ebb174',
          },
          headerTintColor: 'black',
          headerTitleStyle: {
            fontWeight: 'bold'
          }
        }} />
         <Stack.Screen name='Detalle' component={Detalle} options={{
        title: 'Receta', headerStyle: {
          backgroundColor: '#ebb174'
        }
      }} />
      <Stack.Screen name='Detalle2' component={Detalle2} options={({ route }) => ({
        title: route.params.title, headerStyle: {
          backgroundColor: '#ebb174',
        }
      })} />
       
      </Stack.Navigator>
    
  )
}

export default FavoritosStack