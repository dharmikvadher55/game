self.addEventListener("push", event => {
    // Extract JSON payload
    const data = event.data.json();
    console.log('Push event received:', data);

    // Extract notification data
    const notificationData = data.notification;
    if (notificationData) {
        const { title, body, icon, click_action } = notificationData;

        const options = {
            body: body,
            icon: icon,
            data: {
                url: click_action
            }
        };

        event.waitUntil(
            self.registration.showNotification(title, options)
        );
    } else {
        console.error('Notification data not found in payload:', data);
    }
});

self.addEventListener("notificationclick", event => {
    event.notification.close();

    if (event.notification.data && event.notification.data.url) {
        event.waitUntil(
            clients.openWindow(event.notification.data.url)
        );
    }
});
