import { View, Text, Image, ScrollView, Pressable, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import UsdTryChart from "../UsdTryChart"; 
import { Modal, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import RSSParser from "react-native-rss-parser";
import "../i18n";
import { useTranslation } from "react-i18next";


const CurrencyImages = {
  "eur.webp": require("../assets/images/united-kingdom-country-round-flag_744381-5913.avif"),
  "usa-flag-round-circle-icon.webp": require("../assets/images/usa-flag.webp"),
  "european-union-flag-round-circle-icon.webp": require("../assets/images/eu.jpg"),
  "uk-flag-round-circle-icon.webp": require("../assets/images/united-kingdom-country-round-flag_744381-5913.avif"), 
  "switzerland-flag-round-circle-icon.webp": require("../assets/images/chf.jpg"),
  "saudi-arabia-flag-round-circle-icon.webp": require("../assets/images/sa-circle-01.png"),
  "canada-flag-round-circle-icon.webp": require("../assets/images/canada-flag-round-circle-icon.webp"),
  "australia-flag-round-circle-icon.webp": require("../assets/images/Australia_flag_icon_round.svg.png"),
  "japan-flag-round-circle-icon.webp": require("../assets/images/japan-flag-round-circle-icon.webp"),
  "money.webp": require("../assets/images/gold.jpg")
}
type CurrencyCardProps = {
  title: string;
  buy: string;
  sell: string;
  ikon: keyof typeof CurrencyImages;
};
const CurrencyCard = ({ title, buy, sell, ikon }: CurrencyCardProps) => {
  
  return (
    
    <View
      style={{
        marginTop:30,
        marginHorizontal:10,
        backgroundColor: "white",
        padding: 20,
        gap:5,
        borderRadius: 12,
        alignItems: "center",
        elevation: 4,
        borderWidth: 2,
        borderColor: "#1e3a8a",
        height:160
      }}
    >
      
      {/* yazılar */}
    
      <Image 
        source={CurrencyImages[ikon]} 
        style={{ width: 40, height: 40, marginBottom: 5 }} />
          
      <Text style={{ fontWeight: "bold" }}>{title}</Text>
      <Text>Alış: {buy}</Text>
      <Text>Satış: {sell}</Text>
    </View>
  );
};


interface CurrencyData {
  id: string;
  fullName: string;
  alis: string;
  satis: string;
  ikon: keyof typeof CurrencyImages;
}

const fetchHaberler = async () => {
  const res = await fetch("https://tr.investing.com/rss/news_1.rss");
  const text = await res.text();       // XML olarak al
  const parsed = await RSSParser.parse(text);  
  return parsed;
}
export default function MyApp() {

  const { t } = useTranslation();

  const [data, setData] = useState<CurrencyData[]>([]);
  const [menuAcik, setMenuAcik] = useState(false);
  const [haberler, setHaberler] = useState<any[]>([]);

  useEffect(() => {
    // Döviz verisi
    fetch("https://kevser.netosfer.net/api/v1/doviz?token=$g0RFN0QHiXYBVIe5ZogHiXY")
      .then((res) => res.json())
      .then((json) => setData(json.data))
      .catch((err) => console.log("❌ Fetch Error:", err));

    // Haberler
    fetch("https://tr.investing.com/rss/news_1.rss")
      .then((res) => res.text())
      .then((text) => RSSParser.parse(text))
      .then((parsed) => setHaberler(parsed.items))
      .catch((err) => console.log("❌ Haber Error:", err));
  }, []);
  return(
    
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}> 
    <View style={{flex: 1, backgroundColor:"#fff"}}>
      
      <View style={{
        backgroundColor: "#1e3a8a", 
        flexDirection: "row", 
        gap:20,
        paddingHorizontal: 30,
        paddingTop:50,
        paddingBottom:25,
        alignItems:"center",
        borderRadius:20,
      }}>
          <Image 
            source={require("../assets/images/logo.png")} 
            style={{width: 45, height: 45}} 
          />
          <Text style={{color: "white", fontSize:20, fontWeight:700}}>KEVSER DÖVİZ</Text>
          <Ionicons name="menu" size={28} color="white" paddingLeft="70" onPress={() => setMenuAcik(true)}/>
          <Modal
          visible={menuAcik}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setMenuAcik(false)}
        >
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: "rgba(0,0,0,0.4)",
              justifyContent: "flex-start",
              alignItems: "flex-end",
            }}
            onPress={() => setMenuAcik(false)}
          >
            <View style={{
              backgroundColor: "white",
              marginTop: 110,
              marginRight: 15,
              borderRadius: 12,
              padding: 10,
              width: 220,
              elevation: 10,
            }}>
              <Text style={{
                fontSize: 16,
                fontWeight: "bold",
                color: "#1e3a8a",
                padding: 14,
                borderBottomWidth: 1,
                borderBottomColor: "#f3f4f6",
              }}>
                📞 {t("iletisim")}
              </Text>
              <Text style={{ padding: 14, color: "#555", fontSize: 14 }}>
                📍 {t("adres")}: DEĞİRMİÇEM MAH. PRF. MUAMMER AKSOY BLV. KALYON İŞ MRK. BLOK NO:47E ŞEHİTKAMİL/GAZİANTEP
              </Text>
              <Text style={{ padding: 14, color: "#555", fontSize: 14 }}>
                📱 Tel: 0342 215 03 60-61
              </Text>
              <Text style={{ padding: 14, color: "#555", fontSize: 14 }}>
                ✉️ Mail: info@kevserdoviz.com
              </Text>
              <Text style={{ padding: 14, color: "#555", fontSize: 14 }}>⏰ {t("saatler")}: Pazartesi-Cuma: 09:00-18:00      Cumartesi:      09:00-13:00</Text>
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
      
       <ScrollView style={{ backgroundColor: "white", flex: 1 }}>
      <View style={{backgroundColor:"white" ,flex: 1 }} >

        <ScrollView horizontal={true} 
          showsHorizontalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          style={{ maxHeight: 220 }}>
          
          <View style={{flexDirection:"row", gap:10,}}>
            {data.map((item) => (
              <CurrencyCard 
                
                ikon={item.ikon}
                key={item.id}
                title={item.fullName} 
                buy={item.alis} 
                sell={item.satis}
                
              />
            ))}
          </View>
        </ScrollView>  

      <Pressable 
      style={{
        backgroundColor: "#1e3a8a",
        padding: 15,
        borderRadius: 12,
        alignItems: "center",
        marginHorizontal:10,
        marginVertical:30
      }}
        onPress={() => router.push("/calculate")}>
      
      <Text style={{ color: "white", fontSize: 18, fontWeight:800, letterSpacing:4 }}>{t("calculate")}</Text>
      </Pressable>
      <UsdTryChart />,

       <View style={{ padding: 10, marginTop: 10, gap:10 }}>

            <Text style={{
              fontSize: 28,
              fontWeight: "bold",
              color: "#1e3a8a",
              marginBottom: 20,
              paddingLeft: 5,
              }}>
              📰 {t("news")}
            </Text>

            {haberler.length === 0 ? (
              <Text style={{ color: "#888", padding: 10 }}>Haberler yükleniyor...</Text>
            ) : (
              haberler.slice(0, 10).map((haber, index) => (
                <Pressable key={index}
                onPress={() => router.push({
                pathname: "/haber-detay",
                params: { url: haber.link }})}
                 style={{
                  padding: 16,
                  borderBottomWidth: 1,
                  borderBottomColor: "#f3f4f6",
                  backgroundColor: "#f9fafb",
                  borderRadius: 8,
                  marginBottom: 8,
                }}>
                  <Text style={{ fontSize: 16, color: "#333", lineHeight: 20 }}>
                    {haber.title}
                  </Text>
                  <Text style={{ fontSize: 11, color: "#9ca3af", marginTop: 5 }}>
                    {haber.published}
                  </Text>
                </Pressable>
              ))
            )}
          </View>
      </View>

</ScrollView>
    </View>
    </TouchableWithoutFeedback>
  );

}