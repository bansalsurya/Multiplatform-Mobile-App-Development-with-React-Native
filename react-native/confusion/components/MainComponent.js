import React, { Component } from 'react';
import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';
import { DISHES } from '../shared/dishes';
import Constants from 'expo-constants';

import { View, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const MenuNavigator = createStackNavigator();

function RootMenuNavigator() {
  return (
    <MenuNavigator.Navigator
      initialRouteName='Menu'
      screenOptions={{
        headerStyle: {
          backgroundColor: '#512DA8',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          color: '#fff',
        },
      }}
    >
      <MenuNavigator.Screen name='Menu' component={Menu} />
      <MenuNavigator.Screen name='Dishdetail' component={Dishdetail} />
    </MenuNavigator.Navigator>
  );
}

export class MainComponent extends Component {
  render() {
    return (
      <NavigationContainer
        style={{
          flex: 1,
          paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight,
        }}
      >
        <RootMenuNavigator />
      </NavigationContainer>
    );
  }
}

export default MainComponent;
