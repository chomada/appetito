import MainNavigation from './navigation/MainNavigation';
import { LogBox } from 'react-native';
import MenuProvider from './context/MenuProvider';
export default function App() {
  
  LogBox.ignoreLogs((['timer']));
  return (
    <MenuProvider>
      <MainNavigation />
    </MenuProvider>
  );
}


