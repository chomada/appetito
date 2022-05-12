
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import Auth from "../../screens/Auth";
import Auth1 from "../../screens/Auth1";
import Auth2 from "../../screens/Auth2";


const AuthStack = () => {

  const Stack = createNativeStackNavigator();

  return (
    

    <Stack.Navigator
      initialRouteName="Auth"
    >

      <Stack.Screen name='Auth' component={Auth} options={{ title: 'Appetito' }} />
      <Stack.Screen name='Auth1' component={Auth1}options={{ title: 'Login' }}  />
      <Stack.Screen name='Auth2' component={Auth2} options={{ title: 'Register' }} />

    </Stack.Navigator>

  )
}

export default AuthStack;