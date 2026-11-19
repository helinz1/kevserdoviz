import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  

  lng: "tr", // başlangıç dili
  fallbackLng: "tr",

  resources: {
    tr: {
      translation: {
        welcome: "Hoş Geldin",
        calculate: "Hesapla",
        news: "Son Haberler",
        anlık: "Anlık Grafik",
        iletisim: "İletişim",
        adres:"Adres",
        tel: "Tel",
        saatler: "Çalışma Saatleri",
        ayarlar: "Bilgilerimi Düzenle",
        bildirimler: "Bildirimler",
        dil: "Dil Seçimi",
        döviz: "Döviz Alarmı Kur",
        ulaşma: "Bize Ulaşın",
        çıkıs: "Çıkış Yap",
        cevrilecek: "Çevirilecek Miktar",
        alınacak: "Alınacak Miktar",
        dovizhesapla: "Döviz Hesapla",
        profil: "Profilim",
        
      },
    },

    en: {
      translation: {
        welcome: "Welcome",
        calculate: "Calculate",
        news: "Latest News",
        anlık: "Current Chart",
        iletisim: "Contact",
        adres: "Address",
        tel: "Phone",
        saatler: "Working Hours",
        ayarlar: "Edit My Information",
        bildirimler: "Notifications",
        dil: "Language Selection",
        döviz: "Set Currency Alert",
        ulaşma: "Contact Us",
        çıkıs: "Log Out",
        cevrilecek: "Amount to Convert",
        alınacak: "Amount to Receive",
        dovizhesapla: "Currency Converter",
        profil:"My Profile"
      },
    },
  },

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;