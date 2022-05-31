import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import BuscarStack from '../stacks/BuscarStack';
import FavoritosStack from '../stacks/FavoritosStack';
import MenuStack from '../stacks/MenuStack';
import {  Image } from 'react-native';

const MainTab = () => {
    const Tab = createBottomTabNavigator();
  return (
    
        <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "white",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: {
            height: 100,
            backgroundColor:'#ebb174'
          },
          

        }}
        >
            <Tab.Screen name="Home" component={MenuStack} 
 options={{tabBarShowLabel:false,
                    tabBarIcon: () => (<Image source={require("./../../assets/restaurant.png")} style={{width: 40, height: 40,marginTop:20 }} />)
                }} />
            <Tab.Screen name="Search"component={BuscarStack} options={{tabBarShowLabel:false,
                    tabBarIcon: () => (<Image source={require("./../../assets/search.png")} style={{width: 40, height: 40, marginTop:20}} />)
                }} />
            <Tab.Screen name="Fav" component={FavoritosStack} options={{tabBarShowLabel:false,
                    tabBarIcon: () => (<Image source={require("./../../assets/heart.png")} style={{width: 40, height: 40,marginTop:20 }} />)
                }} />

        </Tab.Navigator>

  )
}

export default MainTab