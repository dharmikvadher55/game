self.addEventListener("push", event => {
    // Extract JSON payload
    const data = event.data.json();
    console.log('Push event received:', data);

    // Extract notification data
    const notificationData = data.notification || {};
    const options = {
        body: notificationData.body || '',
        icon: notificationData.icon || 'https://w7.pngwing.com/pngs/448/230/png-transparent-bell-notification-communication-icon-announcement-information-thumbnail.png',
        image: notificationData.image || 'https://www.pushengage.com/wp-content/uploads/2023/06/In-App-Notification-Examples.png',
        badge: notificationData.badge || 'https://example.com/default-badge.png', // Ensure this is a valid image URL
        sound: notificationData.sound || '', // Optional sound
        vibrate: notificationData.vibrate || [], // Optional vibration pattern
        data: {
            url: data.data?.url || 'https://www.pushengage.com/wp-content/uploads/2023/06/In-App-Notification-Examples.png', // URL to open on click
            action: data.data?.action || '' // Custom action data
        }
    };

    event.waitUntil(
        self.registration.showNotification(notificationData.title || 'No Title', options)
    );
});

self.addEventListener("notificationclick", event => {
    event.notification.close();

    const urlToOpen = event.notification.data?.url || '/'; // Fallback URL

    if (urlToOpen) {
        event.waitUntil(
            clients.openWindow(urlToOpen)
        );
    } else if (event.notification.data?.action === 'custom_action') {
        // Handle custom action
        console.log('Custom action triggered');  
        // Add any specific handling for custom actions if required
    }
});
