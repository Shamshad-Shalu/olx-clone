import { initializeApp } from "firebase/app";
import {getAuth ,GoogleAuthProvider} from "firebase/auth";
import {getStorage} from "firebase/storage";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCu9MxSHYy3qGGltqwt1GWCSCRoiQahGik",
  authDomain: "olx-clone-1bd0d.firebaseapp.com",
  projectId: "olx-clone-1bd0d",
  storageBucket: "olx-clone-1bd0d.firebasestorage.app",
  messagingSenderId: "337614297880",
  appId: "1:337614297880:web:03f45959ee19a46af49c6d"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();
const fireStore = getFirestore();
const storage = getStorage(app);

export { 
    auth,
    db, 
    provider, 
    fireStore, 
    storage 
};