// const firebaseConfig = {
// 	apiKey: 'AIzaSyD9bJFLky9ux3mcgIGG8PXNhDtO_2djJJc',
// 	authDomain: 'profile-site-2c77f.firebaseapp.com',
// 	projectId: 'profile-site-2c77f',
// 	storageBucket: 'profile-site-2c77f.appspot.com',
// 	messagingSenderId: '530598318072',
// 	appId: '1:530598318072:web:e4b8ec8cc4feb442c9100d',
// };

// const app = initializeApp(firebaseConfig);

// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC37Zj2jtq7KeE4d2rUmmYuI-fJwRORIOc",
  authDomain: "gotour-27874.firebaseapp.com",
  projectId: "gotour-27874",
  storageBucket: "gotour-27874.appspot.com",
  messagingSenderId: "863768374618",
  appId: "1:863768374618:web:f89b84e281f3dea5359763",
};

let firebaseApp;
if (!getApps().length) {
  firebaseApp = initializeApp(firebaseConfig);
} else {
  firebaseApp = getApp();
}

export const app = firebaseApp;
