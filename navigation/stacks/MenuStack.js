
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import Recetas from "../../screens/Recetas";
import Detalle from "../../screens/Detalle";


const MenuStack = () => {

  const Stack = createNativeStackNavigator();

  return (
    

    <Stack.Navigator
      initialRouteName="Menu"
    >

      <Stack.Screen name='Recetas' component={Recetas} options={{
        
          title: '',
          header: () => null,
           headerStyle: {
            backgroundColor: '#ead5b4',
          },
          headerTintColor: 'black',
          headerTitleStyle: {
            fontWeight: 'bold'
          }
        }}  />
      <Stack.Screen name='Detalle' component={Detalle} options={({route})=>({ title: route.params.item.nombre })} />

    </Stack.Navigator>

  )
}

export default MenuStack;