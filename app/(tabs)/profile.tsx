import { View, Text, Image, Pressable, StyleSheet} from "react-native";
import i18n from "../i18n";
import { Modal } from "react-native";
import { useState } from "react";
import "../i18n";
import { useTranslation } from "react-i18next";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  nav: {
    backgroundColor: "#1e3a8a",  
    borderRadius: 20,
    overflow: "hidden",           
    elevation: 4,                 
    paddingBottom: 60,
  },
  profilYazi: {
    color: "white",
    textAlign: "center",
    fontSize: 28,
    fontWeight: "700",
    paddingTop: 60,
    paddingBottom: 20,
  },
  image: {
    borderRadius: 200,
    width: 90,
    height: 90,
    position: "absolute",
    top: 120,
    alignSelf: "center",
    borderWidth: 3,
    borderColor: "white",      
  },
  isim: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#1e3a8a",
    marginTop: 60,             
    marginBottom: 20,
  },
  buttons: {
    paddingHorizontal: 20,
    gap: 15,
  },
  buton: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 12,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  butonYazi: {
    fontSize: 16,
    color: "#333",
  },
  cikisButon: {
    backgroundColor: "#fee2e2",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 70,
    borderWidth: 1,
    borderColor: "#fca5a5",
  },
  cikisYazi: {
    color: "#dc2626",
    fontSize: 16,
    fontWeight: "bold",
  },
})

export default function Profile() {

  const [dilModal, setDilModal] = useState(false);
  const { t }= useTranslation();

  return (
    <View style={styles.container}>

      {/* Navbar */}
      <View style={styles.nav}>
        <Text style={styles.profilYazi}>{t("profil")}</Text>
      </View>

      
      <Image 
        style={styles.image} 
        source={require("@/app/assets/images/user.webp")}
      />

     
      <Text style={styles.isim}>{t("welcome")} 👋</Text>

      {/* Butonlar */}
      <View style={styles.buttons}>
        <Pressable style={styles.buton}>
          <Text style={styles.butonYazi}>📋 {t("ayarlar")}</Text>
        </Pressable>
        <Pressable style={styles.buton}>
          <Text style={styles.butonYazi}>🔔 {t("bildirimler")}</Text>
        </Pressable>


        {/* dil */}
        <Pressable style={styles.buton} onPress={() => setDilModal(true)}>
          <Text style={styles.butonYazi}>🌐 {t("dil")}</Text>
        </Pressable>
        {/* dil */}


        <Pressable style={styles.buton}>
          <Text style={styles.butonYazi}>⏰ {t("döviz")}</Text>
        </Pressable>
        <Pressable style={styles.buton}>
          <Text style={styles.butonYazi}>ℹ️ {t("ulaşma")}</Text>
        </Pressable>
      </View>

      {/* Çıkış */}
      <Pressable style={styles.cikisButon}>
        <Text style={styles.cikisYazi}>🚪 {t("çıkıs")}</Text>
      </Pressable>

      <Modal
    visible={dilModal}
    transparent={true}
    animationType="fade"
  >
    <Pressable
      onPress={() => setDilModal(false)}
      style={{
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.4)",
        justifyContent: "center",
        alignItems: "center",
      }}
    >

      <View
        style={{
          backgroundColor: "white",
          padding: 20,
          borderRadius: 16,
          width: 250,
          gap: 15,
        }}
      >

      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          textAlign: "center",
          color: "#1e3a8a",
        }}
      >
        Dil Seç
      </Text>

      {/* Türkçe */}
      <Pressable
        onPress={() => {
          i18n.changeLanguage("tr");
          setDilModal(false);
        }}
        style={{
          backgroundColor: "#1e3a8a",
          padding: 14,
          borderRadius: 10,
        }}
      >
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontSize: 16,
          }}
        >
          🇹🇷 Türkçe
        </Text>
      </Pressable>

      {/* İngilizce */}
      <Pressable
        onPress={() => {
          i18n.changeLanguage("en");
          setDilModal(false);
        }}
        style={{
          backgroundColor: "#1e3a8a",
          padding: 14,
          borderRadius: 10,
        }}
      >
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontSize: 16,
          }}
        >
          🇬🇧 English
        </Text>
      </Pressable>

    </View>
  </Pressable>
</Modal>
    </View>
  );
}

