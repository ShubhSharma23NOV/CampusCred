import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";
import { getStorage } from "firebase/storage";
import { getMessaging, isSupported } from "firebase/messaging";
import { getAnalytics } from "firebase/analytics";

// Firebase Configuration
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAKT1NVUR28PMu70yhxNlFRhyv_ANefbKQ",
    authDomain: "campuscred-dcc8e.firebaseapp.com",
    projectId: "campuscred-dcc8e",
    storageBucket: "campuscred-dcc8e.firebasestorage.app",
    messagingSenderId: "278574170158",
    appId: "1:278574170158:web:a9ca7df41e9cb0bc46dfbf",
    measurementId: "G-W5BX6CENVQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const functions = getFunctions(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);

// Initialize Firebase Cloud Messaging (FCM) - only in supported browsers
let messaging = null;
isSupported().then(supported => {
    if (supported) {
        messaging = getMessaging(app);
    }
});
export { messaging };

// Helper function to check if Firebase is configured
export const isFirebaseConfigured = () => {
    return firebaseConfig.apiKey !== "YOUR_API_KEY" && 
           firebaseConfig.projectId !== "campuscred-demo";
};

export default app;


