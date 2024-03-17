import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";

import ChatScreen from "../screens/ChatScreen";
import FriendListScreen from "../screens/FriendListScreen";
import SettingScreen from "../screens/SettingScreen";

const Tab = createMaterialBottomTabNavigator();
export default function ChatNavigator() {
  const nav = useNavigation();
  useLayoutEffect(() => {
    nav.setOptions({
      headerShown: false,
    });
  }, []);
  return (
    <Tab.Navigator
      initialRouteName="ChatScreen"
      activeColor="white"
      shifting
      barStyle={{
        position: "absolute",
        backgroundColor: "#1E2B6F",
        margin: 10,
        paddingVertical: 10,
        paddingHorizontal: 30,
        marginHorizontal: 50,
        borderRadius: 48,
      }}
    >
      <Tab.Screen
        options={{
          tabBarLabel: "Messages",

          tabBarIcon: ({ color }) => (
            <Ionicons name="chatbubble-ellipses" size={24} color={color} />
          ),
        }}
        name="ChatScreen"
        component={ChatScreen}
      />
      <Tab.Screen
        options={{
          tabBarLabel: "Friend List",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="users" size={18} color={color} />
          ),
        }}
        name="FriendListScreen"
        component={FriendListScreen}
      />
      <Tab.Screen
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: ({ color }) => (
            <Ionicons name="settings-sharp" size={24} color={color} />
          ),
        }}
        name="SettingScreen"
        component={SettingScreen}
      />
    </Tab.Navigator>
  );
}
