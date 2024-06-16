import { Tabs } from "expo-router";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaProvider>
      <Tabs
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
          headerShown: false,
          tabBarStyle: {
            display: route.name === "plant" ? "none" : "flex",
          },
        })}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Plants",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "list" : "list-outline"}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="add"
          options={{
            title: "Add pot",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "add-circle" : "add-circle-outline"}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="options"
          options={{
            title: "Options",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "options" : "options-outline"}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="plant"
          options={{
            href: null,
          }}
        />
      </Tabs>
    </SafeAreaProvider>
  );
}
