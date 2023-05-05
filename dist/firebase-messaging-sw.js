importScripts("https://www.gstatic.com/firebasejs/7.24.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/7.24.0/firebase-messaging.js");
firebase.initializeApp(
  {
  apiKey: "AIzaSyA6QYuZc2ZzyO9dcpZ_Ih3R3ZFbyIfjnfs",
  authDomain: "osprey-app-50cb1.firebaseapp.com",
  projectId: "osprey-app-50cb1",
  storageBucket: "osprey-app-50cb1.appspot.com",
  messagingSenderId: "807688577194",
  appId: "1:807688577194:web:06f0f5fd2aa081feca30d3",
  measurementId: "G-0M4R654JMG"
}

);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  // console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = payload.data.title;
  const notificationOptions = {
    image: payload.data.image
  };

  // payload.notification.title="this is tempred";

  self.registration.showNotification(notificationTitle,
    notificationOptions);

    self.addEventListener('notificationclick', function (event) {
      event.notification.close();
      // console.log(event, "00000000000000000000",payload);

      event.waitUntil(
        clients.openWindow(`${payload?.data?.link}`)
      );
    })
});
