import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCcFuuWeC7GG1YuIFNnV1r9VFRqvDOdjJ4",
  authDomain: "netflix-clone-f31e5.firebaseapp.com",
  projectId: "netflix-clone-f31e5",
  storageBucket: "netflix-clone-f31e5.appspot.com",
  messagingSenderId: "1020618447346",
  appId: "1:1020618447346:web:2444040a8f2413a8bb736b",
  measurementId: "G-6TC54XX51R"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);