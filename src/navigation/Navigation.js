import React from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Quotes from "../components/Quotes/Quotes";
import Colors from "../utils/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Dashboard from "../components/Dashboard/Dashboard";
import PairInfo from "../components/Dashboard/PairInfo";

const RealTimeQuotes = createStackNavigator();

function RealTimeQuotesScreen() {
  return (
    <RealTimeQuotes.Navigator>
      <RealTimeQuotes.Screen
        name="RealTimeQuotes"
        component={Quotes}
        options={stackOptions.RTQ}
      />
    </RealTimeQuotes.Navigator>
  );
}

const DashboardQuotes = createStackNavigator();

function DashboardQuotesScreen() {
  return (
    <DashboardQuotes.Navigator>
      <DashboardQuotes.Screen
        name="DashboardQuotes"
        component={Dashboard}
        options={stackOptions.DB}
      />
      <DashboardQuotes.Screen
        name="PairInfoQuotes"
        component={PairInfo}
        options={({ route }) => ({
          ...stackOptions.DB,
          title: route.params.title,
        })}
      />
    </DashboardQuotes.Navigator>
  );
}

const defaultNavigationOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "ios" ? "white" : Colors.headerTitle,
  },
  headerTintColor: Platform.OS === "ios" ? Colors.headerTitle : "white",
};

const stackOptions = {
  RTQ: {
    headerTitle: "Real Time Quotes",
    ...defaultNavigationOptions,
  },
  DB: {
    headerTitle: "Insta Forex Quotes",
    ...defaultNavigationOptions,
  },
};

const Tab = createBottomTabNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      {Platform.OS === "ios" && <StatusBar barStyle="default" />}
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size = 30 }) => {
            if (route.name === "Quotes") {
              return (
                <MaterialCommunityIcons
                  name={focused ? "trending-up" : "trending-up"}
                  size={30}
                  color={color}
                />
              );
            } else if (route.name === "Dashboard") {
              return (
                <MaterialCommunityIcons
                  name={focused ? "view-dashboard" : "view-dashboard-outline"}
                  size={30}
                  color={color}
                />
              );
            }
          },
        })}
        tabBarOptions={{
          activeTintColor:
            Platform.OS === "ios" ? Colors.tabIconSelected : "white",
          inactiveTintColor: Colors.tabIconDefault,
          labelStyle: {
            fontSize: 15,
          },
          style: {
            backgroundColor:
              Platform.OS === "ios" ? "white" : Colors.headerTitle,
            shadowColor: "rgba(0, 0, 0, 0.24)",
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowRadius: 6,
            shadowOpacity: 1,
          },
        }}
      >
        <Tab.Screen name="Dashboard" component={DashboardQuotesScreen} />
        <Tab.Screen name="Quotes" component={RealTimeQuotesScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
