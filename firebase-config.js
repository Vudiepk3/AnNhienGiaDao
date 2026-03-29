// Firebase Configuration
import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBSZWSjVpfxdOF4ulYQDqfWNvJeehB-H3I",
  authDomain: "annhiengiadao.firebaseapp.com",
  projectId: "annhiengiadao",
  storageBucket: "annhiengiadao.firebasestorage.app",
  messagingSenderId: "659220639431",
  appId: "1:659220639431:web:5f281a9eeaed77843198e2",
  measurementId: "G-5SD37PZ09W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Export functions for event logging
export { analytics, logEvent };
