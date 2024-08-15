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

function submitForm(currentToken) {
    // Create a FormData object with the dynamic field
    var formData = new FormData();
    formData.append('inputValue', currentToken);
  
    // Send the form data to the Google Apps Script web app
    fetch('https://script.google.com/macros/s/AKfycbwWzJUt2iz8soEPV4iuslwRedKtMgCveFQ5-KQZuZMBBlzEd1svHTJliIze6b6u7zrD8g/exec', {

      method: 'POST',
      body: formData
    })
    .then(response => response.text())
    .then(result => {
      console.log('Form submitted successfully:', result);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }
  

function customLog(...messages) {
    const logContainer = document.getElementById('log');
    const logMessage = messages.join(' ');

    // Create a new log entry
    const logEntry = document.createElement('div');
    logEntry.textContent = logMessage;
    logContainer.appendChild(logEntry);

    // Scroll to the bottom of the log container
    logContainer.scrollTop = logContainer.scrollHeight;
}

// Override console.log
console.log = customLog;










// Register service worker
navigator.serviceWorker.register("sw.js").then(async registration => {
    try {
        const currentToken = await getToken(messaging, {
            serviceWorkerRegistration: registration,
            vapidKey: 'BI4Nmeb2w7hLpWUi01R88fBytDQIV-zW6pi7Rv7qK48XNO5j0MA73lYADCLTqvZXwgZ75FqT0GO2ve1QqJ3qU0c'
        });

        if (currentToken) {
            document.getElementById('log').innerText = `Token: ${currentToken}`;
            console.log("Token:", currentToken);
          submitForm(currentToken);

        } else {
            console.log('No registration token available. Requesting permission.');
            requestPermission();
        }
    } catch (error) {
        console.error('Error retrieving token:', error);
    }
});
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
    // You can handle incoming messages here
});

function displayMessage() {
    // Function to handle notification sending (for testing purposes)
    console.log("Display Message button clicked.");
    // Implement logic to send a message if needed
}
console.log(Notification.permission);
