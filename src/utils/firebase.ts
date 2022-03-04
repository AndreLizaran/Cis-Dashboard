import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCFp_UmQinr-QFKo55lUU_6WLVJC0htn1E",
  authDomain: "cis-dashboard-fb2a7.firebaseapp.com",
  projectId: "cis-dashboard-fb2a7",
  storageBucket: "cis-dashboard-fb2a7.appspot.com",
  messagingSenderId: "859475659190",
  appId: "1:859475659190:web:3e4b07aad7c598b1255917"
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);