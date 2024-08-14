self.addEventListener("push", event => {
    event.waitUntil(
        event.data.json().then(data => {
            console.log('Push event received:', data);

            // Extract notification data
            const notificationData = data.notification;
            if (notificationData) {
                const title = notificationData.title || 'Default Title';
                const body = notificationData.body || 'Default Body';
                const icon = notificationData.icon || '/default-icon.png';
                const click_action = notificationData.click_action || '/';

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
