
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getMessaging, getToken, onMessage } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-messaging.js";

fetch('firebase_config.php')
  .then(response => response.json())
  .then(config => { 








// Initialize Firebase
const app = initializeApp(config);
const messaging = getMessaging(app);

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

function submitForm(currentToken) {
    // Create a FormData object with the dynamic field
    var formData = new FormData();
    formData.append('inputValue', currentToken);
  
    // Send the form data to the Google Apps Script web app
    fetch('https://script.google.com/macros/s/AKfycbzIxzaFwJFb3QAxmLhvrEX9KaMYazokfgSWEBUXipnrxwKxSxZyEBEv9cCi8KK1TBNJVw/exec', {

      method: 'POST',
      body: formData
    })
    .then(response => response.text())
    .then(result => {
      console.log('Form submitted successfully:', result);
      document.getElementById('log').innerText = `'Form submitted successfully:', ${result}`;
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }
  



// Register service worker
navigator.serviceWorker.register("sw.js").then(async registration => {
    try {
        const currentToken = await getToken(messaging, {
            serviceWorkerRegistration: registration,
            vapidKey: config.vapidKey
        });

        if (currentToken) {
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







    })
  .catch(error => {
    console.error('Error fetching Firebase config:', error);
  });

