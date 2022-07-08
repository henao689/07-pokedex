import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Tab1 from "./Tab1";
import SearchScreen from "../screens/SearchScreen";
import  Icon  from "react-native-vector-icons/Ionicons";
import { Platform } from "react-native";
import { Tab2Screen } from "./Tab2";

const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
    <Tab.Navigator
        sceneContainerStyle={{
            backgroundColor: 'white'
        }}
        screenOptions={{ 
            headerShown: false,
            tabBarActiveTintColor: '#5856D5',
            tabBarStyle: { 
                position: 'absolute',
                backgroundColor: 'rgba(255,255,255,0.82)', 
                paddingBottom: 10, //( Platform.OS === 'ios') ? 0 : 10, 
                borderWidth: 0,
                elevation: 0,
                height: ( Platform.OS === 'ios') ? 70 : 60,
            },
        }}
    >
      <Tab.Screen 
        name="Home" 
        component={Tab1} 
        options={{
            tabBarLabel: "Listado",
            tabBarIcon: ({color})=>(
                <Icon
                    color={color}
                    size={20}
                    name="list-outline"
                />
            )
        }}
      />
      <Tab.Screen 
        name="Search" 
        component={Tab2Screen} 
        options={{
            tabBarLabel: "Busqueda",
            tabBarIcon: ({color})=>(
                <Icon
                    color={color}
                    size={20}
                    name="search-outline"
                />
            )
        }}
      />
    </Tab.Navigator>
  );
}
