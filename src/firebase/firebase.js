import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCYOZhw0rBBUqyxI2bgdtYOm5Z2dsiDkYs",
  authDomain: "flipstore-b4612.firebaseapp.com",
  projectId: "flipstore-b4612",
  storageBucket: "flipstore-b4612.appspot.com",
  messagingSenderId: "362105276803",
  appId: "1:362105276803:web:7707b91c583caf1524ceb6",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
