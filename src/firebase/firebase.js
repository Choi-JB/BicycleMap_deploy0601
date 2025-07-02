import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';

// Initialize Firebase
const firebaseConfig = {
    apiKey: "---",    //비공개처리
    authDomain: "bicyclemap-12f8a.firebaseapp.com",
    databaseURL: "https://bicyclemap-12f8a-default-rtdb.firebaseio.com",
    projectId: "bicyclemap-12f8a",
    storageBucket: "bicyclemap-12f8a.appspot.com",
    messagingSenderId: "714642382180",
    appId: "1:714642382180:web:7669787fd4e613cfa46e71",
    measurementId: "G-KJB9MMRBC1"
};
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();
const database = firebase.firestore();

export {
    storage, database, firebase as default
}
