import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import HomeScreen from '../../src/views/screens/HomeScreen';
import LoginScreen from '../../src/views/screens/LoginScreen';
import RegistrationScreen from '../../src/views/screens/RegistrationScreen';

const Stack = createNativeStackNavigator();

const AppContainer = () => {
    const [status, setStatus] = React.useState(false);
  const [initialRouteName, setInitialRouteName] = React.useState('');


    React.useEffect(() => {
          authUser();
      }, []);

   // Deine First Route
    
      const authUser = async () => {
        try {
          let userData = await AsyncStorage.getItem('userData');
          if (userData) {
            userData = JSON.parse(userData);
            if (userData.loggedIn) {
              setInitialRouteName('HomeScreen');
            } else {
              setInitialRouteName('LoginScreen');
            }
          } else {
            setInitialRouteName('LoginScreen');
          }
        } catch (error) {
          setInitialRouteName('LoginScreen');
        }
      };
    
      return (
        <NavigationContainer>
            <>
              <Stack.Navigator
                initialRouteName={initialRouteName}
                screenOptions={{headerShown: false}}>
                <Stack.Screen name="LoginScreen" component={LoginScreen} />
                <Stack.Screen
                  name="RegistrationScreen"
                  component={RegistrationScreen}
                />
                <Stack.Screen name="HomeScreen" component={HomeScreen} />
              </Stack.Navigator>
            </>
        </NavigationContainer>
      );
};

export default AppContainer;
