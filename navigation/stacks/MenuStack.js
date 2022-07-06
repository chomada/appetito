
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import Recetas from "../../screens/Recetas";
import Detalle from "../../screens/Detalle";
import Detalle2 from "../../screens/Detalle2";
import Perfil from "../../screens/Perfil";
import Carga from "../../screens/Carga";
import Carga2 from "../../screens/Carga2";
import Paso1 from "../../screens/Paso1";
import Paso2 from "../../screens/Paso2";
import Paso3 from "../../screens/Paso3";
import Paso4 from "../../screens/Paso4";
import Paso5 from "../../screens/Paso5";
import Personalizar from "../../screens/Personalizar";
import DetallePersonalizado from "../../screens/DetallePersonalizado";
import PersonalizadasList from "../../screens/PersonalizadasList";


const MenuStack = () => {

  const Stack = createNativeStackNavigator();

  return (


    <Stack.Navigator
      initialRouteName="Menu"
    >

      <Stack.Screen name='Recetas' component={Recetas} options={{

        title: 'Menu',
        header: () => null,
        headerStyle: {
          backgroundColor: '#ead5b4',
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
      <Stack.Screen name='Perfil' component={Perfil} options={{
        title: 'Perfil', headerStyle: {
          backgroundColor: '#ebb174'
        }
      }} />
      <Stack.Screen name='Carga' component={Carga} options={{
        title: '', headerStyle: {
          backgroundColor: '#ebb174'
        }
      }} />
         <Stack.Screen name='Carga2' component={Carga2} options={{
        title: '', headerStyle: {
          backgroundColor: '#ebb174'
        }
      }} />
          
       <Stack.Screen name='Personalizar' component={Personalizar} options={{
        title: 'Personalizar', headerStyle: {
          backgroundColor: '#ebb174'
        }
      }} />
        <Stack.Screen name='DetallePersonalizado' component={DetallePersonalizado} options={{
        title: 'Personalizada', headerStyle: {
          backgroundColor: '#ebb174'
        }
      }} />
          <Stack.Screen name='PersonalizadasList' component={PersonalizadasList} options={{
        title: 'Lista', headerStyle: {
          backgroundColor: '#ebb174'
        }
      }} />
       <Stack.Screen name='Paso1' component={Paso1} options={{
        title: 'Paso 1', headerStyle: {
          backgroundColor: '#ebb174'
        }
      }} />
       <Stack.Screen name='Paso2' component={Paso2} options={{
        title: 'Paso 2', headerStyle: {
          backgroundColor: '#ebb174'
        }
      }} />
       <Stack.Screen name='Paso3' component={Paso3} options={{
        title: 'Paso 3', headerStyle: {
          backgroundColor: '#ebb174'
        }
      }} />
       <Stack.Screen name='Paso4' component={Paso4} options={{
        title: 'Paso 4', headerStyle: {
          backgroundColor: '#ebb174'
        }
      }} />
       <Stack.Screen name='Paso5' component={Paso5} options={{
        title: 'Paso 5', headerStyle: {
          backgroundColor: '#ebb174'
        }
      }} />

    </Stack.Navigator>

  )
}

export default MenuStack;