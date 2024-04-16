import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAByRyFE2VWacYgl-HYzsAIVf4jHgMBQzs",
  authDomain: "movies-75864.firebaseapp.com",
  databaseURL: "https://movies-75864-default-rtdb.firebaseio.com",
  projectId: "movies-75864",
  storageBucket: "movies-75864.appspot.com",
  messagingSenderId: "297395054866",
  appId: "1:297395054866:web:5ba62310b11a98ee112bcb",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
