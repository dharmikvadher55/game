self.addEventListener("push", event => {
    event.waitUntil(
        event.data.json().then(data => {
            console.log('Push event received:', data);

            // Extract notification data
            const notificationData = data.notification;
            if (notificationData) {
                const { title = 'Default Title', body = 'Default Body', icon = '/default-icon.png', click_action = '/' } = notificationData;

                const options = {
                    body: body,
                    icon: icon,
                    data: {
                        url: click_action
                    }
                };

                return self.registration.showNotification(title, options);
            } else {
                console.error('Notification data not found in payload:', data);
            }
        }).catch(error => {
            console.error('Failed to parse push event data:', error);
        })
    );
});

self.addEventListener("notificationclick", event => {
    event.notification.close();

    if (event.notification.data && event.notification.data.url) {
        event.waitUntil(
            clients.openWindow(event.notification.data.url)
        );
    }
});
