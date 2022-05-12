import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import BuscarStack from '../stacks/BuscarStack';
import FavoritosStack from '../stacks/FavoritosStack';
import MenuStack from '../stacks/MenuStack';

const MainTab = () => {
    const Tab = createBottomTabNavigator();
  return (
    
        <Tab.Navigator
        screenOptions={{headerShown:false}}
        >
            <Tab.Screen name="Menu" component={MenuStack}/>
            <Tab.Screen name="Buscar" component={BuscarStack}/>
            <Tab.Screen name="Favoritos" component={FavoritosStack}/>

        </Tab.Navigator>

  )
}

export default MainTab