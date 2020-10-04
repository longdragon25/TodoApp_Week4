import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import AllStack from './Screens/AllScreen.js';
import { AntDesign } from "@expo/vector-icons";

const Tab=createBottomTabNavigator();

const Complete =()=>{
  return(
    <Text style={styles.completeStyle}>Complete</Text>
  )
};
const Active =()=>{
  return(
    <Text style={styles.completeStyle}>Active</Text>
  )
};
const routeIcons = {
  Complete: "check",
  All: "pluscircleo",
  Active: "menufold",
};
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name={routeIcons[route.name]}
              size={24}
              color={focused ? "blue" : "grey"}
            />
          ),
        })}
        tabBarOptions={{
          activeTintColor: "blue",
          inactiveTintColor: "grey",
        }}
        >
        <Tab.Screen name="Complete" component={Complete} />
        <Tab.Screen name="All" component={AllStack} />
        <Tab.Screen name="Active" component={Active} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    // alignItems: "center",
  },
  completeStyle:{
    marginTop:200,
    fontSize:40
  }
});
