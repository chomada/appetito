import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack"
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
       
      </Stack.Navigator>
    
  )
}

export default FavoritosStack