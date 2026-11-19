import "../i18n";
import { useTranslation } from "react-i18next";
import UsdTryChart from "../UsdTryChart";
import { View, Text, StyleSheet } from "react-native";


export default function Grafik() {

  const { t } = useTranslation();

  return (
    <View style={styles.container}>
        <View style={styles.nav}>
                <Text style={styles.navtext}>{t("anlık")}</Text>
              </View>
      <UsdTryChart />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    gap:40
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
  }})