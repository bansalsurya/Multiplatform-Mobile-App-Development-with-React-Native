import React, { Component } from 'react';
import Constants from 'expo-constants';
import {
  View,
  Platform,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerItemList,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import { Icon } from 'react-native-elements';

import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import Reservation from './ReservationComponent';
import Favorites from './FavoriteComponent';

import { connect } from 'react-redux';
import {
  fetchDishes,
  fetchComments,
  fetchPromos,
  fetchLeaders,
} from '../redux/ActionCreators';

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => ({
  fetchDishes: () => dispatch(fetchDishes()),
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => dispatch(fetchLeaders()),
});

const ReservationNavigator = createStackNavigator();
function RootReservationNavigator() {
  return (
    <ReservationNavigator.Navigator
      initialRouteName='Reservation'
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: '#512DA8',
        },
        headerTitleStyle: {
          color: '#fff',
        },
        headerTintColor: '#fff',
        headerLeft: (props) => (
          <Icon
            {...props}
            name='menu'
            size={24}
            iconStyle={{ color: 'white' }}
            onPress={() => navigation.toggleDrawer()}
          />
        ),
      })}
    >
      <ReservationNavigator.Screen name='Reservation' component={Reservation} />
    </ReservationNavigator.Navigator>
  );
}
const MenuNavigator = createStackNavigator();

function RootMenuNavigator() {
  return (
    <MenuNavigator.Navigator
      initialRouteName='Menu'
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: '#512DA8',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          color: '#fff',
        },
        headerLeft: (props) => (
          <Icon
            {...props}
            name='menu'
            size={24}
            color='white'
            onPress={() => navigation.toggleDrawer()}
          />
        ),
      })}
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
        headerLeft: (props) => (
          <Icon
            {...props}
            name='menu'
            size={24}
            color='white'
            onPress={() => navigation.toggleDrawer()}
          />
        ),
      })}
    >
      <HomeNavigator.Screen name='Home' component={Home} />
    </HomeNavigator.Navigator>
  );
}

const ContactNavigator = createStackNavigator();

function RootContactNavigator() {
  return (
    <ContactNavigator.Navigator
      initialRouteName='Contact'
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: '#512DA8',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          color: '#fff',
        },
        headerLeft: (props) => (
          <Icon
            {...props}
            name='menu'
            size={24}
            color='white'
            onPress={() => navigation.toggleDrawer()}
          />
        ),
      })}
    >
      <ContactNavigator.Screen name='Contact' component={Contact} />
    </ContactNavigator.Navigator>
  );
}
const AboutNavigator = createStackNavigator();

function RootAboutNavigator() {
  return (
    <AboutNavigator.Navigator
      initialRouteName='about'
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: '#512DA8',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          color: '#fff',
        },
        headerLeft: (props) => (
          <Icon
            {...props}
            name='menu'
            size={24}
            color='white'
            onPress={() => navigation.toggleDrawer()}
          />
        ),
      })}
    >
      <AboutNavigator.Screen name='About' component={About} />
    </AboutNavigator.Navigator>
  );
}

const FavoriteNavigator = createStackNavigator();

function RootFavoriteNavigator() {
  return (
    <FavoriteNavigator.Navigator
      initialRouteName='Favorite'
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: '#512DA8',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          color: '#fff',
        },
        headerLeft: (props) => (
          <Icon
            {...props}
            name='menu'
            size={24}
            color='white'
            onPress={() => navigation.toggleDrawer()}
          />
        ),
      })}
    >
      <FavoriteNavigator.Screen name='Favorite' component={Favorites} />
    </FavoriteNavigator.Navigator>
  );
}

function CustomDrawerContentComponent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <SafeAreaView
        style={styles.container}
        forceInset={{ top: 'always', horizontal: 'never' }}
      >
        <View style={styles.drawerHeader}>
          <View style={{ flex: 1 }}>
            <Image
              source={require('./images/logo.png')}
              style={styles.drawerImage}
            />
          </View>
          <View style={{ flex: 2 }}>
            <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
          </View>
        </View>
        <DrawerItemList {...props} />
      </SafeAreaView>
    </DrawerContentScrollView>
  );
}

const MainNavigator = createDrawerNavigator();

function RootMainNavigator() {
  return (
    <MainNavigator.Navigator
      drawerStyle={{
        backgroundColor: '#D1C4E9',
      }}
      drawerContent={CustomDrawerContentComponent}
    >
      <MainNavigator.Screen
        name='Home'
        component={RootHomeNavigator}
        options={{
          title: 'Home',
          drawerLabel: 'Home',
          drawerIcon: ({ tintColor, focused }) => (
            <Icon name='home' type='font-awesome' size={24} color={tintColor} />
          ),
        }}
      />
      <MainNavigator.Screen
        name='About'
        component={RootAboutNavigator}
        options={{
          title: 'About Us',
          drawerLabel: 'About Us',
          drawerIcon: ({ tintColor, focused }) => (
            <Icon
              name='info-circle'
              type='font-awesome'
              size={24}
              color={tintColor}
            />
          ),
        }}
      />
      <MainNavigator.Screen
        name='Menu'
        component={RootMenuNavigator}
        options={{
          title: 'Menu',
          drawerLabel: 'Menu',
          drawerIcon: ({ tintColor, focused }) => (
            <Icon name='list' type='font-awesome' size={24} color={tintColor} />
          ),
        }}
      />
      <MainNavigator.Screen
        name='Contact'
        component={RootContactNavigator}
        options={{
          title: 'Contact Us',
          drawerLabel: 'Contact Us',
          drawerIcon: ({ tintColor, focused }) => (
            <Icon
              name='address-card'
              type='font-awesome'
              size={22}
              color={tintColor}
            />
          ),
        }}
      />
      <MainNavigator.Screen
        name='Favorite'
        component={RootFavoriteNavigator}
        options={{
          title: 'My Favorites',
          drawerLabel: 'My Favorites',
          drawerIcon: ({ tintColor, focused }) => (
            <Icon
              name='heart'
              type='font-awesome'
              size={24}
              iconStyle={{ color: tintColor }}
            />
          ),
        }}
      />
      <MainNavigator.Screen
        name='Reservation'
        component={RootReservationNavigator}
        options={{
          title: 'Reserve Table',
          drawerLabel: 'Reserve Table',
          drawerIcon: ({ tintColor, focused }) => (
            <Icon
              name='cutlery'
              type='font-awesome'
              size={24}
              iconStyle={{ color: tintColor }}
            />
          ),
        }}
      />
    </MainNavigator.Navigator>
  );
}

class Main extends Component {
  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }
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
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerHeader: {
    backgroundColor: '#512DA8',
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
  },
  drawerHeaderText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  drawerImage: {
    margin: 10,
    width: 80,
    height: 60,
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Main);
