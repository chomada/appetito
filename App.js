import 'react-native-gesture-handler';
import 'react-native-reanimated';
import MainNavigation from './navigation/MainNavigation';
import { LogBox } from 'react-native';
import MenuProvider from './context/MenuProvider';
import Global from './styles/Global';


export default function App() {
  
  LogBox.ignoreLogs((['timer']));
  return (
    <MenuProvider >
      <MainNavigation />
    </MenuProvider>
  );
}


