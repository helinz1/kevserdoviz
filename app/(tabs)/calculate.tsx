import { View, Text, TextInput, Pressable, Keyboard, StyleSheet, ScrollView, TouchableWithoutFeedback } from "react-native";
import { useState, useEffect, useTransition } from "react";
import { Ionicons } from "@expo/vector-icons";
import "../i18n";
import { useTranslation } from "react-i18next";

interface Currency {
  id: string;
  fullName: string;
  alis: string;
  satis: string;
  name: string;
}

export default function Calculate() {
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState("");
  const [rates, setRates] = useState<Currency[]>([]);
  const [selectedFrom, setSelectedFrom] = useState<Currency | null>(null);
  const [selectedTo, setSelectedTo] = useState<Currency | null>(null);
  const [acikFrom, setAcikFrom] = useState(false);
  const [acikTo, setAcikTo] = useState(false);
  const { t } = useTranslation()

  useEffect(() => {
    fetch("https://kevser.netosfer.net/api/v1/doviz?token=$g0RFN0QHiXYBVIe5ZogHiXY")
      .then(res => res.json())
      .then(json => {
        const tryParasi = {
          id: "try",
          fullName: "Türk Lirası",
          name: "TRY",
          alis: "1",
          satis: "1",
          item: "",
        };

  setRates([tryParasi, ...json.data]);
  setSelectedFrom(json.data[0]);
  setSelectedTo(tryParasi);
      })
      .catch(err => console.log("Hata:", err));
  }, []);

  const hesapla = (text: string, from: Currency | null, to: Currency | null) => {
    if (from && to && text) {
      const kurFrom = parseFloat(from.alis);
      const kurTo = parseFloat(to.alis);
      const tryDeger = parseFloat(text) * kurFrom;
      const sonuc = tryDeger / kurTo;
      setResult(sonuc.toFixed(2));
    } else {
      setResult("");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.container}>
      {/* Navbar */}
      <View style={styles.nav}>
        <Text style={styles.navtext}>{t("dovizhesapla")}</Text>
      </View>

      <View style={{ margin: 20, gap: 2 }}>

        {/* ÜST KUTU */}
        <View style={styles.box}>
          <Text style={styles.text}>{t("cevrilecek")}</Text>
          <View style={styles.row}>
            <TextInput
              style={[styles.secici, { flex: 1 }]}
              keyboardType="numeric"
              placeholder="0.00"
              returnKeyType="done"
              onSubmitEditing={Keyboard.dismiss}
              value={amount}
              onChangeText={(text) => {
                setAmount(text);
                hesapla(text, selectedFrom, selectedTo);
              }}
            />
            <Pressable
              style={styles.secici}
              onPress={() => {
                setAcikFrom(!acikFrom);
                setAcikTo(false); // diğerini kapat
              }}
            >
              <Text style={styles.seciciYazi}>
                {selectedFrom ? selectedFrom.name : "Seçiniz"} ▼
              </Text>
            </Pressable>
          </View>

          {/* Üst liste */}
          {acikFrom && (
            <ScrollView style={styles.liste}>
              {rates.map((item) => (
                <Pressable
                  key={item.id}
                  style={styles.listeItem}
                  onPress={() => {
                    setSelectedFrom(item);
                    setAcikFrom(false);
                    hesapla(amount, item, selectedTo);
                  }}
                >
                  <Text style={styles.listeYazi}>{item.name}</Text>
                </Pressable>
              ))}
            </ScrollView>
          )}
        </View>

        {/* SWAP BUTONU */}
        <View style={styles.swapKap}>
          <Pressable
            style={styles.swapButon}
            onPress={() => {
              // İki dövizi yer değiştir
              setSelectedFrom(selectedTo);
              setSelectedTo(selectedFrom);
              hesapla(amount, selectedTo, selectedFrom);
            }}
          >
            <Ionicons name="swap-vertical" size={24} color="white" />
          </Pressable>
        </View>

        {/* ALT KUTU */}
        <View style={styles.box}>
          <Text style={styles.text}>{t("alınacak")}</Text>
          <View style={styles.row}>
            <TextInput
              style={[styles.secici, { flex: 1 }]}
              placeholder="0.00"
              editable={false}
              value={result}
            />
            <Pressable
              style={styles.secici}
              onPress={() => {
                setAcikTo(!acikTo);
                setAcikFrom(false); // diğerini kapat
              }}
            >
              <Text style={styles.seciciYazi}>
                {selectedTo ? selectedTo.name : "Seçiniz"} ▼
              </Text>
            </Pressable>
          </View>

          {/* Alt liste */}
          {acikTo && (
            <ScrollView style={styles.liste}>
              {rates.map((item) => (
                <Pressable
                  key={item.id}
                  style={styles.listeItem}
                  onPress={() => {
                    setSelectedTo(item);
                    setAcikTo(false);
                    hesapla(amount, selectedFrom, item);
                  }}
                >
                  <Text style={styles.listeYazi}>{item.name}</Text>
                </Pressable>
              ))}
            </ScrollView>
          )}
        </View>

      </View>
    </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  nav: {
    backgroundColor: "#1e3a8a",
    borderRadius: 20,
    padding: 30,
    elevation: 4,
    overflow: "hidden",
  },
  navtext: {
    color: "#fff",
    paddingTop: 30,
    fontSize: 22,
    textAlign: "center",
    fontWeight: "500",
  },
  box: {
    gap: 15,
    padding: 20,
    margin: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    backgroundColor: "#f2f2f2",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
    zIndex: 0,
  },
  text: {
    fontSize: 18,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  secici: {
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  seciciYazi: {
    fontSize: 16,
    color: "#333",
  },
  liste: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 10,
    backgroundColor: "white",
    elevation: 5,
    maxHeight: 200,
  },
  listeItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  listeYazi: {
    fontSize: 15,
    color: "#333",
  },
  swapKap: {
    alignItems: "center",
    zIndex: 10,
    marginVertical: -25,
  },
  swapButon: {
    backgroundColor: "#c9a84c",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
});