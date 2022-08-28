// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCHMqWYZJDUD4XMEzL1K6vT4xTGM4JMyzw',
  authDomain: 'authorization-73547.firebaseapp.com',
  projectId: 'authorization-73547',
  storageBucket: 'authorization-73547.appspot.com',
  messagingSenderId: '630452531100',
  appId: '1:630452531100:web:bcd76046015b75fa892259',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
