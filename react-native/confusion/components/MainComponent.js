import React, { Component } from 'react';
import Constants from 'expo-constants';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';
import Home from './HomeComponent';

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
      drawerStyle={{
        backgroundColor: '#D1C4E9',
      }}
    >
      <MenuNavigator.Screen name='Menu' component={Menu} />
      <MenuNavigator.Screen name='Dishdetail' component={Dishdetail} />
    </MenuNavigator.Navigator>
  );
}
const HomeNavigator = createStackNavigator();

function RootHomeNavigator() {
  return (
    <HomeNavigator.Navigator
      initialRouteName='Home'
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: '#512DA8',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          color: '#fff',
        },
      })}
    >
      <HomeNavigator.Screen name='Home' component={Home} />
    </HomeNavigator.Navigator>
  );
}

const MainNavigator = createDrawerNavigator();

function RootMainNavigator() {
  return (
    <MainNavigator.Navigator>
      <MainNavigator.Screen
        name='Home'
        component={RootHomeNavigator}
        options={{ title: 'Home', drawerLabel: 'Home' }}
      />
      <MainNavigator.Screen
        name='Menu'
        component={RootMenuNavigator}
        options={{ title: 'Menu', drawerLabel: 'Menu' }}
      />
    </MainNavigator.Navigator>
  );
}

class MainComponent extends Component {
  render() {
    return (
      <NavigationContainer
        style={{
          flex: 1,
          paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight,
        }}
      >
        <RootMainNavigator />
      </NavigationContainer>
    );
  }
}

export default MainComponent;
