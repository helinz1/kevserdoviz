import { View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { WebView } from "react-native-webview";

export default function HaberDetay() {
  const { url } = useLocalSearchParams();
console.log("URL:", url); 
  return (
    <View style={{ flex: 1 }}>
      <WebView source={{ uri: url as string }} />
        
    </View>
  );
}