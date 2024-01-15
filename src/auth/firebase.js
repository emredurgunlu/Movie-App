import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
//* https://firebase.google.com/docs/auth/web/start
//* https://console.firebase.google.com/ => project settings
//! firebase console settings bölümünden firebaseconfig ayarlarını al
const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
};

// const firebaseConfig = {
//   apiKey: "AIzaSyB8CLihxbLd6Gld2XhvCure6-2eVK3YlCQ",
//   authDomain: "movie-app-emre.firebaseapp.com",
//   projectId: "movie-app-emre",
//   storageBucket: "movie-app-emre.appspot.com",
//   messagingSenderId: "510697274644",
//   appId: "1:510697274644:web:b723255de1f29a7f851601"
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);


// https://firebase.google.com/
// Get started
// create project
// proje adını gir kutuları tikle. devam et de.
// google analitics devre dışı yap. devam et de. dolmasını bekle. devam et tıkla.
// web uygulamasını seç
// uygulamana isim ver. verdiğin proje adı ile aynı olabilir.
// lso set up Firebase Hosting for this app seçmene gerek yok
// register app'a tıkla.
// consola gitmek için devam et'e tıkla
// authentication hizmetine tıkla.
// get started tıkla.
// email/password tıkl, sadece yukardakini enabled yap, save de.
// add new provider
// google enable, not configured kırmızı yazıda mailini seç, save.
// https://firebase.google.com/docs/auth/web/start bu siteye git
// web modular API kodlarını auth klasörü içinde, firebase.js içine kopyala
// sol üst firebase ikonuna tıklyıp ana sayfaya git.
// projeni seç
// project overview --> settings aşağıda config ayarları apikey vs var.
// config ayarlarını kopyala ve firebase.js içinde config bölümüne yapıştır