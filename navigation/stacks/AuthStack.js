
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import Auth from "../../screens/Auth";
import Auth1 from "../../screens/Auth1";
import Auth2 from "../../screens/Auth2";
import Recupero from "../../screens/Recupero";
import AuthCompletar from "../../screens/AuthCompletar";
import Recetas from "../../screens/Recetas";
import Recupero2 from "../../screens/Recupero2";
import Recupero3 from "../../screens/Recupero3";


const AuthStack = () => {

  const Stack = createNativeStackNavigator();

  return (
    

    <Stack.Navigator
      initialRouteName="Auth"
    >

      <Stack.Screen name='Auth' component={Auth} options={{ title: 'Appetito',header: () => null }} />
      <Stack.Screen name='Auth1' component={Auth1}options={{ title: 'Login' }}  />
      <Stack.Screen name='Auth2' component={Auth2} options={{ title: 'Register' }} />
      <Stack.Screen name='Recupero' component={Recupero} options={{ title: 'Paso 1' }} />
      <Stack.Screen name='AuthCompletar' component={AuthCompletar} options={{ title: 'Completar datos' }} />
      <Stack.Screen name='Recupero2' component={Recupero2} options={{ title: 'Paso 2' }} />
      <Stack.Screen name='Recupero3' component={Recupero3} options={{ title: 'Paso 3' }} />
      
    </Stack.Navigator>

  )
}

export default AuthStack;