
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyD7nRyqsqojm0dd9r_ZERNcXyutF8_2VjY",
  authDomain: "fitu-c653b.firebaseapp.com",
  projectId: "fitu-c653b",
  storageBucket: "fitu-c653b.appspot.com",
  messagingSenderId: "808507403785",
  appId: "1:808507403785:web:f6f451b70e67c4852952d8",
  measurementId: "G-LSEZMV4BEP"
};
const app = initializeApp(firebaseConfig);
export default getFirestore();