import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Quotes from "../components/Quotes/Quotes";
import Colors from "../utils/Colors";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const RealTimeQuotes = createStackNavigator();

function RealTimeQuotesScreen() {
  return (
    <RealTimeQuotes.Navigator>
      <RealTimeQuotes.Screen name="RealTimeQuotes" component={Quotes} options={stackOptions.RTQ}/>
    </RealTimeQuotes.Navigator>
  );
}

const defaultNavigationOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'ios' ? 'white' : Colors.headerTitle,
  },
  headerTintColor: Platform.OS === 'ios' ? Colors.headerTitle : 'white',
};

const stackOptions = {
  RTQ: {
    headerTitle: 'Real Time Quotes',
    ...defaultNavigationOptions,
  }
};
const Tab = createBottomTabNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      {Platform.OS === 'ios' && <StatusBar barStyle="default"/>}
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size = 30}) => {
            if (route.name === 'Quotes') {
              return (
                <MaterialCommunityIcons
                  name={focused ? 'currency-btc' : 'currency-btc'}
                  size={30}
                  color={color}
                />
              );
            } else if (route.name === 'Dashboard') {
              return (
                <MaterialCommunityIcons
                  name={focused ? 'view-dashboard' : 'view-dashboard-outline'} size={30} color={color}/>
              );
            }
          },
        })}
        tabBarOptions={{
          activeTintColor: Platform.OS === 'ios' ? Colors.tabIconSelected : 'white',
          inactiveTintColor: Colors.tabIconDefault,
          style: {
            backgroundColor: Platform.OS === 'ios' ? 'white' : Colors.headerTitle,
            shadowColor: 'rgba(0, 0, 0, 0.24)',
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowRadius: 6,
            shadowOpacity: 1,
          },
        }}
      >
        <Tab.Screen name="Quotes" component={RealTimeQuotesScreen}/>
        {/*<Tab.Screen name="Add Deck" component={AddDeckStackScreen} />*/}
      </Tab.Navigator>
    </NavigationContainer>
  )
};

Navigation.propTypes = {};

export default Navigation;