import { View, Text, ActivityIndicator, StyleSheet, Dimensions } from "react-native";
import { VictoryChart, VictoryAxis, VictoryArea, VictoryTheme } from "victory-native";
import { useEffect, useState } from "react";

type ChartPoint = {
  x: number; //gün sayısı
  y: number; //kur degeri
};


const API_KEY = "7f21ac1777aa14cd010d02a1";

export default function UsdTryChart() {
    //usestate, when data changes it update itself
  const [chartData, setChartData] = useState<ChartPoint[]>([]);
  const [currentRate, setCurrentRate] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState("");
  const screenWidth = Dimensions.get("window").width;

  const fetchCurrentRate = async () => {
    try {
      const res = await fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`);
      const json = await res.json();
      if (json.result === "success") {
        setCurrentRate(json.conversion_rates.TRY);
        setLastUpdated(new Date().toLocaleTimeString("tr-TR"));
      }
    } catch (err) {
      console.log("Anlık kur hata:", err);
    }
  };

  const fetchHistoricalRates = async () => {
    try {
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 30);
      const start = startDate.toISOString().split("T")[0];
      const end = endDate.toISOString().split("T")[0];

      const res = await fetch(`https://api.frankfurter.app/${start}..${end}?from=USD&to=TRY`);
      const json = await res.json();

      if (!json.rates) return;

      const entries = Object.entries(json.rates) as [string, { TRY: number }][];
      entries.sort((a, b) => a[0].localeCompare(b[0]));

      const points: ChartPoint[] = entries.map(([_, val], index) => ({
        x: index,
        y: Number(val.TRY),
      }));

      setChartData(points);
    } catch (err) {
      console.log("Geçmiş grafik hata:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentRate();
    fetchHistoricalRates();
    const interval = setInterval(fetchCurrentRate, 60000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#1e3a8a" />
        <Text style={{ marginTop: 10, color: "#1e3a8a" }}>Grafik yükleniyor...</Text>
      </View>
    );
  }

  const minY = chartData.length > 0 ? Math.min(...chartData.map(d => d.y)) - 0.5 : 0;
  const maxY = chartData.length > 0 ? Math.max(...chartData.map(d => d.y)) + 0.5 : 100;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📈 USD / TRY</Text>
      {currentRate && (
        <Text style={styles.rate}>₺ {currentRate.toFixed(4)}</Text>
      )}
      <Text style={styles.updated}>Son güncelleme: {lastUpdated}</Text>

      {chartData.length > 0 ? (
        <VictoryChart
          width={screenWidth - 40}
          height={200}
          theme={VictoryTheme.material}
          padding={{ left: 65, bottom: 30, right: 15, top: 10 }}
          domain={{
            y: [minY, maxY]
          }}
        >
          <VictoryAxis
            tickValues={[0, 7, 14, 21, chartData.length - 1]}
            tickFormat={(t: number) => `${t + 1}.gün`}
            style={{
              tickLabels: { fontSize: 8, fill: "#888" },
              axis: { stroke: "#1e3a8a" },
            }}
          />
          <VictoryAxis
            dependentAxis
            tickFormat={(t: number) => `₺${t.toFixed(1)}`}
            style={{
              tickLabels: { fontSize: 8, fill: "#888" },
              axis: { stroke: "#1e3a8a" },
            }}
          />
          <VictoryArea
            data={chartData}
            style={{
              data: {
                stroke: "#1e3a8a",
                strokeWidth: 2,
                fill: "rgba(30, 58, 138, 0.12)",
              },
            }}
            interpolation="monotoneX"
          />
        </VictoryChart>
      ) : (
        <View style={styles.noData}>
          <Text style={{ color: "#888" }}>Grafik verisi yüklenemedi</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    margin: 10,
    borderRadius: 16,
    padding: 16,
    elevation: 4,
    borderWidth: 2,
    borderColor: "#1e3a8a",
  },
  title: { fontSize: 18, fontWeight: "bold", color: "#1e3a8a" },
  rate: { fontSize: 32, fontWeight: "800", color: "#1e3a8a", marginTop: 2 },
  updated: { fontSize: 11, color: "#9ca3af", marginTop: 2, marginBottom: 4 },
  center: { height: 250, justifyContent: "center", alignItems: "center" },
  noData: { height: 150, justifyContent: "center", alignItems: "center" },
});