import { initializeApp, getApps, getApp } from "firebase/app";
import {
    initializeAuth,
    getReactNativePersistence,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
    } from "firebase/auth";
import { getDatabase, ref, push, onValue, off } from "firebase/database";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    doc,
    updateDoc,
    deleteDoc
    } from 'firebase/firestore'

import { getStorage, ref as storageRef,
    uploadBytes, getDownloadURL } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyDMXUSyIG6LPl9z4POWPEXPAVM4IDtUGYw",
  authDomain: "movielogapp-aee83.firebaseapp.com",
  projectId: "movielogapp-aee83",
  storageBucket: "movielogapp-aee83.firebasestorage.app",
  messagingSenderId: "73390983726",
  appId: "1:73390983726:web:e8fe2db1e2c6ccb248edbf",
  measurementId: "G-90KQ3BBPNC"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const realtimeDB = getDatabase(app);

export const chatDB = {
  sendMessage: (roomId, data) =>
    push(ref(realtimeDB, `chatRooms/${roomId}`), data),

  subscribe: (roomId, callback) => {
    const roomRef = ref(realtimeDB, `chatRooms/${roomId}`);
    onValue(roomRef, (snapshot) => {
      const val = snapshot.val();
      if (!val) {
        callback([]);
        return;
      }
      const arr = Object.entries(val).map(([id, v]) => ({
        _id: id,
        ...v,
      }));
      callback(arr);
    });
    return () => off(roomRef);
  },
};

export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)}
    );

export const db = getFirestore(app);
export const storage = getStorage(app);

export const firestoreDB = {
    addUser: (data) => addDoc(collection(db, "users"), {...data}),

    updateReservCount: (docId, data)=>
        updateDoc(doc(db, "movies", docId), data),

    addSeats: (data) => addDoc(collection(db, "seats"), {...data}),

    updateUserPoint: (uid, data) =>
        updateDoc(doc(db, "users", uid), data),

    uploadImage: async (uri: string, path: string) => {
      const response = await fetch(uri);
      const blob = await response.blob();

      const fileRef = storageRef(storage, path);
      await uploadBytes(fileRef, blob);

      const url = await getDownloadURL(fileRef);
      return url;
    },
    // (선택) 프로필만 업데이트용 헬퍼 추가해도 됨 (최소 변경 원하면 없어도 OK)
    updateUserProfile: (docId, profilePath: string, profileUrl: string) =>
    updateDoc(doc(db, "users", docId), { profilePath, profileUrl }),



    addUserData: (uid, data) => addDoc(collection(db, "users"), {uid, ...data}),
    getAllUsers: ()=> getDocs(collection(db, "users")),
    updateUserData: (docId, data) => updateDoc(doc(db,"users", docId), data),
    deleteUserData: (docId) => deleteDoc(doc(db, "users", docId)),
    addCard: (data) => addDoc(collection(db,"user_cards"),{...data}),
    deleteCard: (docId) => deleteDoc(doc(db, "user_cards", docId)),
    updatePw: (docId, data) => updateDoc(doc(db,"users", docId),data),
    updateName : (docId, data) => updateDoc(doc(db, "users", docId),data)
    };
