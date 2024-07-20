self.addEventListener("push", (event) => {
    const notif = event.data.json().notification;

    event.waitUntil(self.registration.showNotification(notif.title, {
        body: notif.body,
        icon: notif.image,
        data: {
            url: notif.click_action
        }
    }));
});

self.addEventListener("notificationclick", (event) => {
    event.waitUntilclients.openWindow(event.notification.data.url)
})