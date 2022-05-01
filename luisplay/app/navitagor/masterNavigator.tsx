import React from 'react';
import { Image, StyleSheet, useColorScheme, Appearance } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';


// SCREENS/VIEWS/COMPONENTS
import Login from '../views/login';
import Explore from '../views/explore';
import Details from '../views/details';

const Stack = createStackNavigator();

export default() => {
    return(
        <NavigationContainer >
            <Stack.Navigator >
                <Stack.Screen name='loginScreen' component={Login} options={{header: () => null}} />
                <Stack.Screen name='exploreScreen' component={Explore} options={{header: () => null}} />
                <Stack.Screen name='detailsScreen' component={Details} options={{header: () => null}} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}