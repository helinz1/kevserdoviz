import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "react-native";

export default function TabLayout() {
  return (
    
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarActiveTintColor: "#1e3a8a",
        tabBarInactiveTintColor: "#fff",
        
        tabBarLabel: ({ color}) => {
          let label: string = "";
          if (route.name === "index") label = "Anasayfa";
          else if (route.name === "calculate") label = "Hesapla";
          else if (route.name === "chart") label = "Grafik";
          else if (route.name === "profile") label = "Profil";

          return <Text style={{color}}>{label}</Text>;
        },
       
        tabBarIcon: ({ color, size }) => {
          
          let iconName: any;
          if (route.name === "index") iconName = "home";
          else if (route.name === "calculate") iconName = "calculator";
          else if (route.name === "chart") iconName = "stats-chart";
          else if (route.name === "profile") iconName = "person";

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        
      })}
    />
  );
}