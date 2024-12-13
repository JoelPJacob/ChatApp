// src/routes/Route.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ChatScreen from '../pages/ChatScreen';

const Stack = createNativeStackNavigator();

const Route = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Chat">
      <Stack.Screen name="Chat" component={ChatScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default Route;
