import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getDatabase } from 'firebase/database'; 

const firebaseConfig = {
  apiKey: "AIzaSyAZycSBKttYX4LG1BsVJGINnR_atzFqVmk",
  authDomain: "recipe-genration.firebaseapp.com",
  databaseURL: "https://recipe-genration-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "recipe-genration",
  storageBucket: "recipe-genration.appspot.com",
  messagingSenderId: "1032893667557",
  appId: "1:1032893667557:web:9a033df2bd51635cb2dc0c",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const database = getDatabase(app); 
