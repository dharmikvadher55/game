import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getMessaging, getToken, onMessage } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-messaging.js";

// Import Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCCQ0xSFS_IAILVT7CXIS_Ls-cbrXNJ2HE",
  authDomain: "dataverse-24803.firebaseapp.com",
  projectId: "dataverse-24803",
  storageBucket: "dataverse-24803.appspot.com",
  messagingSenderId: "945940897964",
  appId: "1:945940897964:web:c53d4d5e171f4560fc7f09"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// Custom logging function to display logs on the page
function customLog(...messages) {
    const logContainer = document.getElementById('log');
    if (logContainer) {
        const logMessage = messages.join(' ');
        // Create a new log entry
        const logEntry = document.createElement('div');
        logEntry.textContent = logMessage;
        logContainer.appendChild(logEntry);
        // Scroll to the bottom of the log container
        logContainer.scrollTop = logContainer.scrollHeight;
    } else {
        console.error('Log container not found.');
    }
}

// Override console.log to use customLog
console.log = customLog;

// Register service worker and get token
navigator.serviceWorker.register("sw.js").then(async registration => {
    try {
        const currentToken = await getToken(messaging, {
            serviceWorkerRegistration: registration,
            vapidKey: 'BI4Nmeb2w7hLpWUi01R88fBytDQIV-zW6pi7Rv7qK48XNO5j0MA73lYADCLTqvZXwgZ75FqT0GO2ve1QqJ3qU0c'
        });

        if (currentToken) {
            document.getElementById('log').innerText = `Token: ${currentToken}`;
            console.log("Token:", currentToken);
        } else {
            console.log('No registration token available. Requesting permission.');
            await requestPermission();
        }
    } catch (error) {
        console.error('Error retrieving token:', error);
    }
}).catch(error => {
    console.error('Service worker registration failed:', error);
});

// Function to request notification permissions
async function requestPermission() {
    try {
        // Check if Notifications are supported
        if (!("Notification" in window)) {
            console.error("This browser does not support notifications.");
            return;
        }

        // Check current permission status
        if (Notification.permission === "granted") {
            console.log("Notification permission already granted.");
            return;
        } else if (Notification.permission === "denied") {
            console.error("Notification permission already denied.");
            return;
        }

        // Request permission
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
            console.log("Notification permission granted.");
        } else {
            console.error("Notification permission denied.");
        }
    } catch (error) {
        console.error("Failed to request notification permission:", error);
    }
}

// Handle incoming messages
onMessage(messaging, payload => {
    console.log('Message received:', payload);
    // Implement logic to display the message as a notification or in the UI
});

// Function to handle display message (for testing purposes)
function displayMessage() {
    console.log("Display Message button clicked.");
    // Implement logic to send a message if needed
}

// Log current notification permission status
console.log('Current Notification permission:', Notification.permission);
