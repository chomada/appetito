import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Buscar from "../../screens/Buscar";


const BuscarStack = () => {

  const Stack = createNativeStackNavigator();

  return (
   
      <Stack.Navigator
        
      >
        <Stack.Screen 
        name='Buscar Tab' 
        component={Buscar}
        options={{ title: 'Buscar' }} />
       
      </Stack.Navigator>
 
  )
}

export default BuscarStack