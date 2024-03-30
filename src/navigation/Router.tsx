/**
 * This navigation setup and added all screens in stack
 */
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ROUTES_SCREEN_NAME} from '../utils/RouterConstants';
import HomeScreen from '../screens/HomeScreen';
import CharaterDetailScreen from '../screens/CharaterDetailScreen';

const Stack = createNativeStackNavigator();

const Router = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={ROUTES_SCREEN_NAME.HOME}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name={ROUTES_SCREEN_NAME.HOME} component={HomeScreen} />
        <Stack.Screen
          name={ROUTES_SCREEN_NAME.CHARACTER_DETAIL}
          component={CharaterDetailScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
