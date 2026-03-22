import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyA3JWbLzTLb5sRWtfSdqo0FSOHscsOvIwY",
  authDomain: "website-ab2ad.firebaseapp.com",
  projectId: "website-ab2ad",
  storageBucket: "website-ab2ad.firebasestorage.app",
  messagingSenderId: "17148045131",
  appId: "1:17148045131:web:4c6b70c7c429de9fc22ace",
  measurementId: "G-PJ8TDDSE6D"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
export default app;
