import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Buscar from "../../screens/Buscar";
import Buscar2 from "../../screens/Buscar2";


const BuscarStack = () => {

  const Stack = createNativeStackNavigator();

  return (
   
      <Stack.Navigator
        
      >
        <Stack.Screen 
        name='Buscar Tab' 
        component={Buscar}
        options={{
          title: 'Buscar',
           headerStyle: {
            backgroundColor: '#ebb174',
          },
          headerTintColor: 'black',
          headerTitleStyle: {
            fontWeight: 'bold'
          }
        }} />
         <Stack.Screen 
        name='Buscar2' 
        component={Buscar2}
        options={({route})=>({ title: 'Busqueda por '+route.params.opcionBusqueda, headerStyle: {
          backgroundColor: '#ebb174',
        },
        headerTintColor: 'black',
        headerTitleStyle: {
          fontWeight: 'bold'
        } })}
        
         />
       
      </Stack.Navigator>
 
  )
}

export default BuscarStack